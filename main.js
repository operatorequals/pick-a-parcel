let GAMEPHASE = 0;

class NetPlayJSGame extends netplayjs.Game {

  // In the constructor, we initialize the state of our game.
  constructor(canvas, players) {
    super();

    this.G = {
      "players": {
        0: {
          "hand": [],
          "turnStrategy": [],
          "phase" : GAMEPHASES.SETUP,
          "message": "",
          "hasParcel": false,
          "score": 0,
        },
        1: {
          "hand": [],
          "turnStrategy": [],
          "phase" : GAMEPHASES.SETUP,
          "message": "",
          "hasParcel": false,
          "score": 0,
        },
      },
      "positions": {
        "parcel": {"x":-1, "y":-1}, //they all need to be -1
        "goal": {"x":-1, "y":-1},
        0: {"x":-1, "y":-1},
        1: {"x":-1, "y":-1},
      },
      "decks": {
        "action": [],
        "direction": [],
        "trunk": [],
      },
      "ctx": {
        "currentPlayer": 0,
        "turn": 0,
      },
    }

    this.players = players;
  }

  _getOwnPlayerID(){
    for(let i = 0; i < this.players.length; i++){
      let player = this.players[i]
      if (player['isLocal']) return i;
    }
    return null;
  }

  _isHost(){
    //if I'm not a Client - I'm HOST
    return !this.players[this._getOwnPlayerID()].isClient()
  }

  pickRandomPosition() {
    let nonColliding = 0;
    let x = -1;
    let y = -1;
    const positions = Object.values(this.G.positions);
    while (nonColliding < positions.length){
      nonColliding = 0;
      x = Math.floor(Math.random() * CONSTANTS.BOARDSIZE) + 1;
      y = Math.floor(Math.random() * CONSTANTS.BOARDSIZE) + 1;
      for (let i = 0; i < positions.length; i++){
          const pos = positions[i]
          const collision = (pos.x == x && y == pos.y);
          if (!collision) nonColliding++;
          else break;
      }
    }
    return {'x':x, 'y':y};
  }

  _gameSetupHostOnly() {
    console.log("[PickAParcel] Generating Decks...")
    moves.createDeck({G: this.G, playerID:null}, "action")
    moves.createDeck({G: this.G, playerID:null}, "direction")

    console.log("[PickAParcel] Generating Positions...")
    Object.keys(this.G.positions).forEach(x => {
      this.G.positions[x] = this.pickRandomPosition();
    });

    // Set Random player to have the first turn - not the host
    this.G.ctx.currentPlayer = Math.floor(Math.random() * this.players.length)

    // If they're both to SETUP, send them to DRAW
    this.checkPhase(GAMEPHASES.SETUP, GAMEPHASES.DRAW) 
  }

  _startTurn(){
    this.players.forEach((player)=>{
      const playerID = player.getID();
      console.log(`[PickAParcel] Drawing cards for ${playerID}...`);
      if (this.G.players[playerID].phase !== GAMEPHASES.DRAW){
        console.error(`Tried to start a turn with GamePhase ${this.G.players[playerID].phase}`)
        return;
      }
      let deckNotFinished = true;
      while (this.G.players[playerID].hand.length < CONSTANTS["DECKDRAW"]*2){
        deckNotFinished = moves.drawCards(
          {G: this.G, playerID: playerID},
          "action", 1,
          );
        deckNotFinished = moves.drawCards(
          {G: this.G, playerID: playerID},
          "direction", 1,
          );
        if (!deckNotFinished) return false; // Deck finished!
      }
      this.G.players[playerID].phase = GAMEPHASES.TURNSTRATEGY;
    });
    this.G.ctx.turn++;
    return true;
  }

  checkPhase(phase, setTo=undefined){
    let playerNum = this.players.length
    let phaseCheck = 0;
    for (let p=0; p<playerNum; p++)
      phaseCheck += this.G.players[p].phase === phase ? 1 : 0 // Playout

    const ret = (phaseCheck === playerNum)
    if (setTo === undefined)
      return ret

    if (phaseCheck === playerNum){ // side-effect
      for (let p=0; p<playerNum; p++)
        this.G.players[p].phase = setTo
      return true
    } else {
      return false
    }
  }

  tick(playerInputs) {

    // The rest can only be set to the state by the Host
    if (!this._isHost()) return;

    if (this.checkPhase(GAMEPHASES.SETUP))
      this._gameSetupHostOnly();  // Sets them to DRAW
    else // If game has begun - check for rule breaking/cheating etc
      sanityChecks.forEach((check) => {check(this.G)});

    if (this.checkPhase(GAMEPHASES.DRAW))
      this._startTurn() // Sets them to TURNSTRATEGY

    if (this.checkPhase(GAMEPHASES.READY)) {// READY
      // This will only be called once per turn
      // as the GamePhase will change to "CHECKWIN" inside
      playout({G:this.G, playerID:this.G.ctx.currentPlayer})
    }
    // if playout is over - back to DRAW
    this.checkPhase(GAMEPHASES.FINISHED, GAMEPHASES.DRAW) // Playout is over - back to Draw

    // Run the moves
    for (const [player, input] of playerInputs.entries()) {

      Object.keys(input.keysPressed).forEach((event)=>{
        // Tokenize event
        const eventTokens = event.split(" ")
        const eventAction = EVENTS[eventTokens[0]]
        const eventParameter = eventTokens[1]

        console.log(`[PickAParcel] Event from ${player.getID()}: ${event} - ${eventAction}(${eventParameter})`)
        if (eventAction == EVENTS['SUBMIT']){
          moves.finishTurnStrategy({G: this.G, playerID: player.getID()})
        }
        else if (eventAction == EVENTS['ADD']){
          let cardID = event.split(" ")[1]
          moves.addToTurnStrategy({G: this.G, playerID: player.getID()}, cardID)
        }
        else if (eventAction == EVENTS['REMOVE']){
          moves.removeFromTurnStrategy({G: this.G, playerID: player.getID()})
        }

        delete input.keysPressed[event] // remove the event from the inputs
      });
    }
  }

  serialize() {
    return JSON.stringify(this.G)
  }

  deserialize(value) {
    let newG = JSON.parse(value);
    if (!this._isHost())
      this.G = newG
  }

  // Draw the state of our game
  draw(canvas) {
    // Player Hand
    const playerID = this._getOwnPlayerID()
    drawCards({G:this.G, playerID:playerID}, "hand")
    drawCards({G:this.G, playerID:playerID}, "turn-strategy-own")
    drawCards({G:this.G, playerID:playerID}, "turn-strategy-opponent")

    drawBoard({G:this.G, playerID:playerID})

    // Info
    updateInfo({G:this.G, playerID:playerID});
  }
}


NetPlayJSGame.timestep = 1000 / 5; // Our game runs slowly as it is a boardgame
NetPlayJSGame.deterministic = true;
// Create a ghost game (no Canvas), that is only used
// to sync the data and also for net discovery.
NetPlayJSGame.canvasSize = { width: 0, height: 0 };
// NetPlayJSGame.canvasSize = { width: 10, height: 10 };
NetPlayJSGame.highDPI = false;

// Because our game can be easily rewound, we will use Rollback netcode
// If your game cannot be rewound, you should use LockstepWrapper instead.
// let GameObjectWrapper = new netplayjs.LockstepWrapper(NetPlayJSGame)
let GameObjectWrapper = new netplayjs.RollbackWrapper(NetPlayJSGame)
// let GameObjectWrapper = new netplayjs.LocalWrapper(NetPlayJSGame)
GameObjectWrapper.start();
console.log(GameObjectWrapper);

GameObjectWrapper.stats.remove();

let GameInstance = null;
let G = null;

// Populate G and GameInstance - for debug purposes
setG = setInterval(()=>{
  GameInstance = GameObjectWrapper.game;
  if (GameInstance !== undefined){
    G = GameInstance.G
    clearInterval(setG)
  }
}, 5000);

/* Elements added through JQuery */
$("#board").append(Board(CONSTANTS.BOARDSIZE))

$('#submit').click(()=>{
  passToHost(EVENTS['SUBMIT']);
  $('html, body').scrollTop(0); // for mobiles to show the board again
});
