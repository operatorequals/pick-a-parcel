const CONSTANTS = {
  "DECKDRAW": 4,
  "DECKNUM": 24,
  "BOARDSIZE": 5,
  "PAUSETIMER": 2000,
}

const GAMEPHASES = [ // TODO: Make it a map
  "DRAW",
  "TURNSTRATEGY",
  "READY",
  "PLAYOUT",  
  "CHECKWIN",
  "LOSE",
  "WIN",
  "EXECUTING",
  "SETUP",
]

const EVENTS = {
  "SUBMIT": "SUBMIT",
  "ADD": "ADD",
  "REMOVE": "REMOVE",
}

const VALIDCARDS = {
    "action": ["move", "steal", "throw"],
    "direction": ["up", "down", "left", "right"],
};