import { Stage, ActivePlayers } from 'boardgame.io/core';

import { EffectsPlugin } from 'bgio-effects/plugin';
import { config } from './bgio-plugins/effects-config';

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


export const PickAParcel = {
  name: 'Pick-A-Parcel',
  seed: 42, // testing
  minPlayers: 2,
  disableUndo: true,

  plugins: [EffectsPlugin(config)],

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

  	// let otherIDs = [...Array(G.players).keys()]
  	// otherIDs.filter((item) => item === playerID);

  	// otherIDs.forEach(otherID=>{
	  // 	delete newG.players[otherID].hand // can't see other hands
  	// })

  	delete newG.decks['action'] // can't see the decks
  	delete newG.decks['direction']
  	return newG
  },

  turn: {
	/* On simultaneous turns
	https://github.com/boardgameio/boardgame.io/issues/774
  	*/
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

  // endIf: to set a check if conditions meet
  // onEnd: announce the winner found in ctx.gameover (set by endIf)
};

// On delayed movements on react components
// https://delucis.github.io/bgio-effects/plugin/sequencing/