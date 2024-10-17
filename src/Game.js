import { Stage, ActivePlayers } from 'boardgame.io/core';

import { CARDSUMS } from './game/constants';
import { STATE } from './game/state';
import {
	// Playable Moves
	addToTurnStrategy,
  	removeFromTurnStrategy,
    submitTurnStrategy,

    // Control Moves
    drawPlayerCards,
    messagePlayer,
 } from './game/moves';


import {
	playout
} from './game/actions'

import {
	pickRandomPosition,
	createDeck,
} from './game/setup';

/* On simultaneous turns
https://github.com/boardgameio/boardgame.io/issues/774
*/

export const PickAParcel = {
  name: 'Pick-A-Parcel',
  minPlayers: 2,
  disableUndo: true,

  setup: (ctx) => {
  	console.log(ctx);
  	let G = JSON.parse(JSON.stringify(STATE)); // deep copy
  	// Create Decks
  	const deckTypes = Object.keys(CARDSUMS)
  	deckTypes.forEach((type)=>{
	    createDeck({G: G}, type);
  	});
  	const objectsOnBoard = Object.keys(G.positions)
  	objectsOnBoard.forEach((object)=>{
	    pickRandomPosition({G: G}, object);
  	});

  	return G;
  },

  events: {
    endGame: false,
    endTurn: false,
    endStage: false,
  },
  moves: {},

  playerView: ({ G, ctx, playerID }) => G, // to mask the other player secrets

  turn: {
	activePlayers: { all: 'turnStrategy' },

    onBegin: ({G, ctx})=>{ // Replenish player hands each turn
    	console.log(`adding cards to hands`, G, ctx)
    	drawPlayerCards({G: G, ctx: ctx}, "action");
    	drawPlayerCards({G: G, ctx: ctx}, "direction");
    },

    stages: {

	    turnStrategy: {
	      moves: {
	      	addToTurnStrategy,
	      	removeFromTurnStrategy,
	        submitTurnStrategy,
	      },
	    },
	},

	onEnd: playout
      // ...
  },

};
