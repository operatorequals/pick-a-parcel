import { GAMEPHASES } from './constants';

export let STATE = {
  "players": {
    0: {
      "hand": [],
      "turnStrategy": [],
      "message": "",
      "hasParcel": false,
      "score": 0,
    },
    1: {
      "hand": [],
      "turnStrategy": [],
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


// ===============================================================

const TEST_STATE = {
  "players": {
    0: {
      "hand": [
{"type": "action", "value": "move", "id": "1234"},
{"type": "action", "value": "steal", "id": "12345"},
      ],
      "turnStrategy": [
{"type": "action", "value": "move", "id": "12346"},
{"type": "direction", "value": "up", "id": "12347"},
      ],
      "phase" : GAMEPHASES.EXECUTING,
      "message": "",
      "hasParcel": false,
      "score": 0,
    },
    1: {
      "hand": [
{"type": "action", "value": "move", "id": "1234"},
{"type": "action", "value": "steal", "id": "12345"},
      ],
      "turnStrategy": [
{"type": "action", "value": "move", "id": "12346"},
{"type": "direction", "value": "up", "id": "12347"},
      ],
      "phase" : GAMEPHASES.PLAYOUT,
      "message": "",
      "hasParcel": true,
      "score": 0,
    },
  },
  "positions": {
    "parcel": {"x":-1, "y":-1}, //they all need to be -1
    "goal": {"x":3, "y":3},
    0: {"x":1, "y":5},
    1: {"x":2, "y":4},
  },
  "decks": {
    "action": [],
    "direction": [],
    "trunk": [
{"type": "action", "value": "move", "id": "12346"},
{"type": "direction", "value": "up", "id": "12347"},
    ],
  },
  "ctx": {
    "currentPlayer": 0,
    "turn": 0,
    "round": 0,
  },
}