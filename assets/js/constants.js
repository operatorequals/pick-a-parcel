const CARDSUMS = { // it's crucial to sum up to the same number
  "action": {
    "move": 12,
    "steal": 6,
    "throw": 6,
  },
  "direction": {
    "up":6,
    "down":6,
    "left":6,
    "right":6,
  },
};

const CONSTANTS = {
  "DECKNUM": (
    // Both decks have same sum
    Object.values(CARDSUMS['action']).reduce((a, b) => a + b, 0)
  ),
  "DECKDRAW": 4,
  "BOARDSIZE": 5,
  "PAUSETIMER": 2000,
};

const GAMEPHASES = {
  "SETUP": "SETUP",
  // The turn starts, players submit their Turn Strategies
  "CARDDRAW": "CARDDRAW",
  "TURNSTRATEGY": "TURNSTRATEGY",
  "READY": "READY",
  // The Playout executes
  "PLAYOUT": "PLAYOUT",  
  "EXECUTING": "EXECUTING",
  "FINISHED": "FINISHED",
  "CHECKWIN": "CHECKWIN",
  // Winner is found
  "LOSE": "LOSE",
  "WIN": "WIN",
  "DRAW": "DRAW",
  "END": "END",

  "NEWGAME": "NEWGAME",
};

const EVENTS = {
  "SUBMIT": "SUBMIT",
  "ADD": "ADD",
  "REMOVE": "REMOVE",
};

const POINTS = {
  "MOVE_TO_DESTINATION": 10,
  "THROW_TO_DESTINATION": 8,
  "HOLD_PARCEL": 5,
}
