/*
A BoardGame.io style of a move map
The first parameter is always, G (Gamestate) and PlayerID
*/
import { INVALID_MOVE } from 'boardgame.io/core';
import { Client } from 'boardgame.io/client';

import { GAMEPHASES, CARDSUMS, CONSTANTS, GAMEOVER_REASONS } from './constants';


const helpers = {
    turnStrategyCheck: ({G, playerID}, finish=false) => {
        const turnStrategy = G.players[playerID].turnStrategy
        const types = Object.keys(CARDSUMS); // action, direction - in that order
        for (let c=0; c<turnStrategy.length; c++){
            if (types[c%2] !== turnStrategy[c].type){
                console.error(`TurnStrategy of ${playerID} does not have valid order!`)
                return false
            }
        }
        if (finish){
            const lastCard = turnStrategy[turnStrategy.length-1];
            if (lastCard !== undefined && lastCard.type !== "direction"){
                console.error(`TurnStrategy of ${playerID} has to end with a 'direction' card!`)
                return false
            }
        }
        return true
    }
}

/* Control Moves */
export const drawPlayerCards = ({G, ctx, events}, type="action") => {
	let deck = G.decks[type];
    for (let playerID = 0; playerID < ctx.numPlayers; playerID++)
    // G.players.forEach(playerID => 
    {
        const handTypeNum = G.players[playerID].hand.filter(card => card.type === type).length // N of "type" cards in hand
        const neededCards = CONSTANTS["DECKDRAW"] - handTypeNum // can be 0

        if (deck.length < neededCards){
            G.gameover.reason = GAMEOVER_REASONS.DECKS_FINISHED
            events.endGame();
        }

    	const cards = deck.splice(0, neededCards);
    	G.players[playerID].hand.push(...cards)
    }
    // );
}

export const messagePlayer = ({G, playerID}, message, timer=2000, all=false) => {
    G.players[playerID].message = message;

    if (timer !== 0)
        setTimeout(()=>{
            G.players[playerID].message = undefined;
        }, timer)
}

/* Playable Moves */
export const addToTurnStrategy = ({G, playerID}, cardID) => {
	console.log("Adding card ", cardID)

	// Check if card already in hand
	let cardIDs = G.players[playerID].hand.map(card => card.id)
	let indexOfCard = cardIDs.indexOf(cardID)
	if (indexOfCard === -1){
		console.error(`Card ${cardID} is not player ${playerID} hand!`)
		return INVALID_MOVE
	}
    // Check if TurnStrategy is OK before adding new
    if (!helpers.turnStrategyCheck({G:G, playerID:playerID}))
        return INVALID_MOVE

	let handLengthBefore = G.players[playerID].hand.length
	let card = G.players[playerID].hand.splice(indexOfCard, 1) // remove from the hand
	G.players[playerID].turnStrategy.push(...card) // add to the turn strategy
}

export const removeFromTurnStrategy = ({G, playerID}) => {
	if (G.players[playerID].turnStrategy.length <= 0){
		console.error(`No cards in player ${playerID} Turn Strategy`)
		return INVALID_MOVE
	}
	let card = G.players[playerID].turnStrategy.pop()
	G.players[playerID].hand.push(card)
}

export const submitTurnStrategy = ({G, ctx, playerID, events }) => {

    if (!helpers.turnStrategyCheck({G:G, playerID:playerID}, true))
        return INVALID_MOVE

    events.endStage();
    if (ctx.activePlayers && Object.keys(ctx.activePlayers).length === 1) {
        console.log("All players have selected their starting cards");
        events.endPhase();
    }
}
