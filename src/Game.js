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
  seed: 42, // testing
  minPlayers: 2,
  disableUndo: true,

  setup: (ctx) => {
  	console.log(ctx);
  	let G = JSON.parse(JSON.stringify(STATE)); // deep copy
  	// Create Decks
  	const deckTypes = Object.keys(CARDSUMS)
  	deckTypes.forEach((type)=>{
	    createDeck({G: G, random: ctx.random}, type);
  	});
  	const objectsOnBoard = Object.keys(G.positions)
  	objectsOnBoard.forEach((object)=>{
	    pickRandomPosition({G: G, random: ctx.random}, object);
  	});

  	return G;
  },

  events: {
    endGame: false,
    endTurn: false,
    endStage: false,
  },
  moves: {},

  playerView: ({ G, ctx, playerID }) => {
  	let newG = JSON.parse(JSON.stringify(G)); // deep copy

  	let otherIDs = [...Array(ctx.playerNum).keys()]
  	delete otherIDs[playerID]
  	otherIDs.forEach(otherID=>{
	  	delete newG.players[otherID]
  	})

  	delete newG.decks['action']
  	delete newG.decks['direction']
  	return newG
  }, // to mask the other player secrets

  turn: {
	activePlayers: { all: 'turnStrategy' },

    onBegin: ({G, ctx, events}) => { // Replenish player hands each turn
    	console.log(`adding cards to hands`, G, ctx)
    	drawPlayerCards({G: G, ctx: ctx, events: events}, "action");
    	drawPlayerCards({G: G, ctx: ctx, events: events}, "direction");
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

  },

};
