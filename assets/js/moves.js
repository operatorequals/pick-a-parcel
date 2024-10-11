/*
A BoardGame.io style of a move map
The first parameter is always, G (Gamestate) and PlayerID
*/

INVALID_MOVE = null;

const helpers = {
    turnStrategyCheck: ({G, playerID}) => {
        const turnStrategy = G.players[playerID].turnStrategy
        const types = Object.keys(CARDSUMS); // action, direction - in that order
        for (let c=0; c<turnStrategy.length; c++){
            if (types[c%2] !== turnStrategy[c].type){
                console.error(`TurnStrategy of ${playerID} does not have valid order!`)
                return INVALID_MOVE
            }
        }
        return true
    }
}

const moves = {
    /* Control Moves */
    createDeck: ({G, playerID}, type="action") => {
        const cardSums = CARDSUMS[type]
        const cardTotal = Object.values(cardSums).reduce((a, b) => a + b, 0)
        console.log(`Creating ${type} Deck (${cardTotal} cards)...`);
        let cards = []
        for (const [value, num] of Object.entries(cardSums)){
            for (let i = 0; i < num; i++)
                cards.push(new Card(type, value));
        }
        // Deck shuffling
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        G.decks[type] = cards;
    },

	drawCards: ({G, playerID}, type="action", num=CONSTANTS["DECKDRAW"]) => {
		deck = G["decks"][type]
        if (deck.length < num)
            return false;
		cards = deck.splice(0, num);
		G["players"][playerID].hand.push(...cards)
		return true
	},

    messagePlayer: ({G, playerID}, message, timer=2000, all=false) => {
        G.players[playerID].message = message;

        if (timer != 0)
            setTimeout(()=>{
                G.players[playerID].message = undefined;
            }, timer)
    },

    /* Playable Moves */
	addToTurnStrategy: ({G, playerID}, cardID) => {
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
		card = G.players[playerID].hand.splice(indexOfCard, 1) // remove from the hand
		G.players[playerID].turnStrategy.push(...card) // add to the turn strategy
		console.log(G.players[playerID].hand, handLengthBefore, G.players[playerID].hand.length)
	},

	removeFromTurnStrategy: ({G, playerID}) => {
		if (G.players[playerID].turnStrategy.length <= 0){
			console.error(`No cards in player ${playerID} Turn Strategy`)
			return INVALID_MOVE
		}
		card = G.players[playerID].turnStrategy.pop()
		G.players[playerID].hand.push(card)
	},

	finishTurnStrategy: ({G, playerID}, ) => {
		//check the Turn Strategy
		if (G.players[playerID].phase !== GAMEPHASES.TURNSTRATEGY){
			console.error(`Player ${playerID} is not in 'Turn Strategy phase: ${G.players[playerID].phase}`)
			return INVALID_MOVE
		}

        if (!helpers.turnStrategyCheck({G:G, playerID:playerID}))
            return INVALID_MOVE

		G.players[playerID].phase = GAMEPHASES.READY
	},
}
