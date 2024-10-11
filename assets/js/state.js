STATE = {
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
    "round": 0,
  },
}
