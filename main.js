let GAMEPHASE = 0;

class NetPlayJSGame extends netplayjs.Game {

  // In the constructor, we initialize the state of our game.
  constructor(canvas, players) {
    super();

    this.G = {
      "updatedOn":  +new Date(), // Used to synchronize object
      "players": {
        0: {
          "hand": [],
          "turnStrategy": [],
          "phase" : GAMEPHASES[GAMEPHASE],
          "message": "",
          "hasParcel": false,
        },
        1: {
          "hand": [],
          "turnStrategy": [],
          "phase" : GAMEPHASES[GAMEPHASE],
          "message": "",
          "hasParcel": false,
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
    if (this._isHost()){
      this._gameSetupHostOnly();
    }

    this._startTurn()
  }

  _getOwnPlayerID(){
    for(let i = 0; i < this.players.length; i++){
      let player = this.players[i]
      if (player['isLocal']) return i;
    }
    return null;
  }

  _isHost(){
    for(let i = 0; i < this.players.length; i++){
      let player = this.players[i]
      if (player['isHost']) return true;
    }
    return false;
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
      console.log(`${x}, ${y} - ${positions}`);
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
    this.G.decks.action = Deck.createDeck("action", CONSTANTS["DECKNUM"]);
    this.G.decks.direction = Deck.createDeck("direction", CONSTANTS["DECKNUM"]);

    Object.keys(this.G.positions).forEach(x => {
      this.G.positions[x] = this.pickRandomPosition();
    });
    updateG(this.G);
  }

  _startTurn(){
    this.players.forEach((player)=>{
      const playerID = player.getID();
      console.log(`[PickAParcel] Drawing cards for ${playerID}...`);
      if (this.G.players[playerID].phase !== GAMEPHASES[0]){
        console.error(`Tried to start a turn with GamePhase ${this.G.players[playerID].phase}`)
        return;
      }
      while (this.G.players[playerID].hand.length < CONSTANTS["DECKDRAW"]*2){
        moves.draw(
          {G: this.G, playerID: playerID},
          "action", 1,
          );
        moves.draw(
          {G: this.G, playerID: playerID},
          "direction", 1,
          );
      }
      this.G.players[playerID].phase = GAMEPHASES[1]
    });
    this.G.ctx.turn++; 
    updateG(this.G);
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
      updateG(this.G)
      return true
    } else {
      return false
    }
  }

  tick(playerInputs) {
    sanity_checks.forEach((check) => {
        check(this.G);
      });

    // The rest can only be set to the state by the Host
    if (!this._isHost()) return;

    if (this.checkPhase(GAMEPHASES[0])) {// DRAW
      this._startTurn()
    }

    if (this.checkPhase(GAMEPHASES[2])) {// READY
      // This will only be called once per turn
      // as the GamePhase will change to "CHECKWIN" inside
      playTurn({G:this.G, playerID:this.G.ctx.currentPlayer})
    }
    // if playout is over - back to DRAW
    this.checkPhase(GAMEPHASES[4], GAMEPHASES[0]) // Playout is over - back to Draw

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
          console.log(`Processing "ADD" ${event}`)
          let cardID = event.split(" ")[1]
          moves.addToTurnStrategy({G: this.G, playerID: player.getID()}, cardID)
        }
        else if (eventAction == EVENTS['REMOVE']){
          console.log(`Processing "REMOVE" ${event}`)
          moves.removeFromTurnStrategy({G: this.G, playerID: player.getID()})
        }

        delete input.keysPressed[event] // remove the event from the inputs
      });

    }
  }

  serialize() {
    // console.log("Serializing...")
    return JSON.stringify(this.G)
  }

  deserialize(value) {
    let newG = JSON.parse(value);
    // console.log(`Deserializing... - Trying to update with ${newG.updatedOn}`)
    if (this.G.updatedOn < newG.updatedOn){
      // console.log(`[+] Updating State... (${this.G.updatedOn} < ${newG.updatedOn}`)
      this.G = newG
    }
  }

  // Draw the state of our game
  draw(canvas) {
    // Player Hand
    const playerID = this._getOwnPlayerID()
    const hand = this.G["players"][playerID]["hand"]
    drawCards("hand", hand, EVENTS["ADD"], true)

    this.players.forEach(player => {
      const turnStrategy = this.G["players"][[player.getID()]]["turnStrategy"]
      if (player.getID() === this._getOwnPlayerID())
        drawCards("turn-strategy-own", turnStrategy, EVENTS["REMOVE"], true)
      else
        drawCards("turn-strategy-opponent", turnStrategy, undefined, false)
    });

    drawBoard({G:this.G, playerID:this._getOwnPlayerID()})

    updateInfo({G:this.G, playerID:this._getOwnPlayerID()});
  }
}


NetPlayJSGame.timestep = 1000 / 2; // Our game runs slowly as it is a boardgame
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

$('#submit').click(()=>{
  passToHost(EVENTS['SUBMIT']);
});

// setTimeout(()=>{
//   GameInstance = GameObjectWrapper.game;
//   G = GameInstance.G
// }, 5000);

$("#board").append(Board(CONSTANTS.BOARDSIZE))