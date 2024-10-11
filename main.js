let GAMEPHASE = 0;

class NetPlayJSGame extends netplayjs.Game {

  // In the constructor, we initialize the state of our game.
  constructor(canvas, players) {
    super();

    this.G = STATE;
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
    if (this.G.ctx.round > 0){
      console.log("[PickAParcel] Starting new round...")
      this.G.decks.trunk = [];
      this.G.decks.action = [];
      this.G.decks.direction = [];
      Object.keys(this.G.players).forEach(playerID=>{
        this.G.players[playerID].hand = [];
        this.G.players[playerID].TurnStrategy = [];
        this.G.players[playerID].hasParcel = false;
        this.G.players[playerID].message = "";
      });
    }
    console.log("[PickAParcel] Generating Decks...")
    moves.createDeck({G: this.G, playerID:null}, "action")
    moves.createDeck({G: this.G, playerID:null}, "direction")

    console.log("[PickAParcel] Generating Positions...")
    Object.keys(this.G.positions).forEach(x => {
      this.G.positions[x] = this.pickRandomPosition();
    });

    // Set Random player to have the first turn - not the host
    this.G.ctx.currentPlayer = Math.floor(Math.random() * this.players.length);
    this.G.ctx.turn = 0;
  }

  _startTurn(){
    // this.players.forEach((player)=>{
    for (const playerID of Object.keys(this.G.players)) {
      console.log(`[PickAParcel] Drawing cards for ${playerID}...`);
      if (this.G.players[playerID].phase !== GAMEPHASES.CARDDRAW){
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
        if (!deckNotFinished){
          this.setPhase(GAMEPHASES.CHECKWIN)
          return false; // Deck finished!
        }
      }
    }
    this.setPhase(GAMEPHASES.TURNSTRATEGY)
    this.G.ctx.turn++;
    return true;
  }

  setPhase(phase){
    const playerNum = this.players.length
    for (let p=0; p<playerNum; p++)
      this.G.players[p].phase = phase
  }

  checkPhase(phase, all=true){
    const players = Object.values(this.G.players)
    if (all)
      return players.every(player => player.phase === phase);
    else
      return players.some(player => player.phase === phase);
  }

  async tick(playerInputs) {
    // If game has begun - check the state for rule breaking/cheating etc
    // Runs on the Host and the Client
    if (!this.checkPhase(GAMEPHASES.SETUP))
      sanityChecks.forEach((check) => {check(this.G)});

    /*
      The rest of the game loop
      is run only by the Host
      Client only gets the G updates
    */
    if (!this._isHost()) return;

    // Run the Game Setup (create Decks, find positions)
    // and start by drawing cards
    if (this.checkPhase(GAMEPHASES.SETUP)){
      this._gameSetupHostOnly();
      this.setPhase(GAMEPHASES.CARDDRAW)
    }

    if (this.checkPhase(GAMEPHASES.CARDDRAW))
      this._startTurn() // Sets them to TURNSTRATEGY

    // This will only be called once per turn
    // as the GamePhase will change to "FINISHED" inside
    if (this.checkPhase(GAMEPHASES.READY))
      await playout({G:this.G, playerID:this.G.ctx.currentPlayer})

    // if playout is over - back to CARDDRAW
    if (this.checkPhase(GAMEPHASES.FINISHED))
      this.setPhase(GAMEPHASES.CARDDRAW) // Playout is over - back to Draw

    // If CARDDRAW finds the Deck empty
    // proceeds to CHECKWIN
    // else goes to TURNSTRATEGY
    if (this.checkPhase(GAMEPHASES.CHECKWIN))
      checkWin({G:this.G, playerID:this.G.ctx.currentPlayer})

    // If the game has concluded ask for a new round
    if (this.checkPhase(GAMEPHASES.WIN, false) || this.checkPhase(GAMEPHASES.DRAW)){
      this.setPhase(GAMEPHASES.NEWGAME) // to stop the tick() from running the game
      const newGame = await confirm("Do you want to start a new game?");
      if (newGame){
        G.ctx.round++;
        this.setPhase(GAMEPHASES.SETUP);
      } else {
        this.setPhase(GAMEPHASES.END);
      }
    }

    // Do not process inputs if no players are in Turn Strategy Phase
    if (!this.checkPhase(GAMEPHASES.TURNSTRATEGY, false))
      return

    // Process the "Events" from all players and do "moves" accordingly
    for (const [player, input] of playerInputs.entries()) {

      Object.keys(input.keysPressed).forEach((event)=>{
        /* Tokenize event
        Event examples (CardID: 32ka846):
          ADD 32ka846
          REMOVE 32ka846
          SUBMIT
        */
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


NetPlayJSGame.timestep = 1000 / 10; // Our game runs slowly as it is a boardgame
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
