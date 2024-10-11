const CARDSUMS = {
  "action": {
    "move": 8,
    "steal": 8,
    "throw": 8,
  },
  "direction": {
    "up":6,
    "down":6,
    "left":6,
    "right":6,
  },
};

const VALIDCARDS = {
    "action": ["move", "steal", "throw"],
    "direction": ["up", "down", "left", "right"],
};

const CONSTANTS = {
  "DECKDRAW": 4,
  "DECKNUM": 24,
  "BOARDSIZE": 5,
  "PAUSETIMER": 2000,
};

const GAMEPHASES = {
  "SETUP": "SETUP",
  "CARDDRAW": "CARDDRAW",
  "TURNSTRATEGY": "TURNSTRATEGY",
  "READY": "READY",
  "PLAYOUT": "PLAYOUT",  
  "EXECUTING": "EXECUTING",
  "FINISHED": "FINISHED",
  "CHECKWIN": "CHECKWIN",
  "LOSE": "LOSE",
  "WIN": "WIN",
  "DRAW": "DRAW",
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
