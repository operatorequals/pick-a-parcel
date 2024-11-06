const shortgame = { // smaller test deck - 1 round
  "action": {
    "move": 4,
    "steal": 2,
    "throw": 2,
  },
  "direction": {
    "up":2,
    "down":2,
    "left":2,
    "right":2,
  },
};

const fullgame = { // it's crucial to sum up to the same number
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

export const CARDSUMS = process.env.NODE_ENV === 'production' ? fullgame : shortgame

export const CONSTANTS = {
  "DECKNUM": (
    // Both decks have same sum
    Object.values(CARDSUMS['action']).reduce((a, b) => a + b, 0)
  ),
  "DECKDRAW": 4,
  "BOARDSIZE": 5,
  "PAUSETIMER": 3000,
};

export const GAMEPHASES = {
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

export const POINTS = {
  "MOVE_TO_DESTINATION": 10,
  "THROW_TO_DESTINATION": 8,
  "HOLD_PARCEL": 5,
}

export const GAMEOVER_REASONS = {
  MOVE_TO_DESTINATION: "MOVE_TO_DESTINATION",
  THROW_TO_DESTINATION: "THROW_TO_DESTINATION",
  DECKS_FINISHED: "HOLD_PARCEL",
}