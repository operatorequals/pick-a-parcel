/*
A BoardGame.io style of a move map
The first parameter is always, G (Gamestate) and PlayerID
*/

INVALID_MOVE = null;


updateG = (G) => {G["updatedOn"] = +new Date();}

const moves = {
    /* Control Moves */
    createDeck({G, playerID}, type="action", num=CONSTANTS["DECKNUM"]){
        console.log(`Creating ${type} Deck (${num} cards)...`);
        const cardValues = VALIDCARDS[type]
        let cards = []
        for (let i = 0; i < num; i++)
            cards.push( // rotate through card values to include them all
                new Card(type, cardValues[i % cardValues.length])
                );

        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        G.decks[type] = cards;
        updateG(G);
    },

	draw: ({G, playerID}, type="action", num=CONSTANTS["DECKDRAW"]) => {
		deck = G["decks"][type]
		// if cards. // Check remaining cards
		cards = deck.splice(0, num);
		G["players"][playerID].hand.push(...cards)
		updateG(G)
		return true
	},

    /* Playable Moves */
	addToTurnStrategy: ({G, playerID}, cardID) => {
		console.log("Adding card ", cardID)

		// Check Card for validity

		// Check if card already in hand
		let cardIDs = G.players[playerID].hand.map(card => card.id)
		let indexOfCard = cardIDs.indexOf(cardID)
		if (indexOfCard === -1){
			console.error(`Card ${cardID} is not player ${playerID} hand!`)
			return INVALID_MOVE
		}

		// Check if valid order for Turn Strategy
		let card = G.players[playerID].hand[indexOfCard]
		if (G.players[playerID].turnStrategy.length == 0){
			if (card.type !== "action"){ // First card has to be "Action"
				console.error(`Card ${cardID} is of type "Action"!`)
				return INVALID_MOVE
			} // Then they have to alternate
		}

		// let previousCard = G.players[playerID].turnStrategy[G.players[playerID].turnStrategy.length-1]
		// if (card.type === previousCard.type){
		// 	console.error(`Card ${cardID} is of wrong type!`)
		// 	return INVALID_MOVE
		// }

		let handLengthBefore = G.players[playerID].hand.length
		card = G.players[playerID].hand.splice(indexOfCard, 1) // remove from the hand
		G.players[playerID].turnStrategy.push(...card) // add to the turn strategy
		console.log(G.players[playerID].hand, handLengthBefore, G.players[playerID].hand.length)

		return updateG(G)
	},

	removeFromTurnStrategy: ({G, playerID}) => {
		if (G.players[playerID].turnStrategy.length <= 0){
			console.error(`No cards in player ${playerID} Turn Strategy`)
			return INVALID_MOVE
		}

		card = G.players[playerID].turnStrategy.pop()
		G.players[playerID].hand.push(card)

		updateG(G)
	},

	finishTurnStrategy: ({G, playerID}, ) => {
		//check the Turn Strategy
		if (G.players[playerID].phase !== GAMEPHASES[1]){
			console.error(`Player ${playerID} is not in 'Turn Strategy phase: ${G.players[playerID].phase}`)
			return INVALID_MOVE
		}

		const turnStrategy = G.players[playerID].turnStrategy
		const types = ['action', 'direction'];
		for (let c=0; c<turnStrategy.length; c++){
			if (types[c%2] !== turnStrategy[c].type){
				console.error(`TurnStrategy of ${playerID} does not have valid order!`)
				return INVALID_MOVE
			}
		}

		G.players[playerID].phase = GAMEPHASES[2] // PLAYOUT
		updateG(G)
	},
}

/* These are actions that the Player has no control over */
const cardAction = {
	/*
			cardAction.movePlayer({G:G,playerID:0},"up");
			cardAction.stealParcel({G:G,playerID:0});
            cardAction.throwParcel({G:G,playerID:0},"up");
	*/
    movePlayer: ({G, playerID}, direction) => {
    	console.log(`[PickAParcel] Player ${playerID} moving ${direction}!`)
    	let playerPosition = G.positions[playerID];
        const { x, y } = playerPosition;
        const parcelPosition = G.positions.parcel
        let playerWon = false;

        switch (direction) {
            case 'left':
                if (x > 1) playerPosition = { x: x - 1, y };
                break;
            case 'right':
                if (x < CONSTANTS.BOARDSIZE) playerPosition = { x: x + 1, y };
                break;
            case 'down':
                if (y > 1) playerPosition = { x, y: y - 1 };
                break;
            case 'up':
                if (y < CONSTANTS.BOARDSIZE) playerPosition = { x, y: y + 1 };
                break;
        }
        // Collide with other players and Goal
        let allowMove=true;
        Object.entries(G.positions).forEach(([x, pos]) => {
            const collision = (pos.x != playerPosition.x || pos.y != playerPosition.y);
            // console.log(x, pos, playerPosition, collision)
            if (collision) return; // There is no collision with x - allgood
            if (x == playerID) return; // Player cannot collide with itself - allgood
            else if (x == "goal") {
                if (G.players[playerID].hasParcel){
                    console.log(`[PickAParcel] Player ${playerID} stepped on the Goal with the parcel!`);
                    playerWon=true; // Player just stepped on the Goal with the Parcel!
                } else
                    allowMove=false;
            } // Player cannot stand on the Goal
            else if (x == "parcel"){ // Player stepped on the parcel and took it (stop drawing it)
                console.log(`[PickAParcel] Player ${playerID} picked up the parcel.`);
                G.players[playerID].hasParcel = true;
                G.positions.parcel = { x: -1, y: -1 }; // Move parcel off board
            } else { // This is another player - cannot step on them
                console.log(`[PickAParcel] Collides with player ${x}`)
                allowMove = false;
            }
        });
        if (allowMove)
            G.positions[playerID] = playerPosition;

        // if stepped on goal with parcel it's a win!
        updateG(G);
        return playerWon;
    },

    stealParcel:({G, playerID}) => {
        console.log(`[PickAParcel] Player ${playerID} trying to steal parcel!`);
        let playerPosition = G.positions[playerID];
        const { x, y } = playerPosition;
        const parcelPosition = G.positions.parcel

        const neighbors = [
            { x: playerPosition.x - 1, y: playerPosition.y },
            { x: playerPosition.x + 1, y: playerPosition.y },
            { x: playerPosition.x, y: playerPosition.y - 1 },
            { x: playerPosition.x, y: playerPosition.y + 1 },
        ];

        neighbors.forEach(neighbor=>{
            Object.entries(G.positions).forEach(([x, pos]) => {
                const collision = (pos.x != neighbor.x || pos.y != neighbor.y);
                if (collision) return; // There is no collision with x - allgood
                if (x == playerID) return; // Player cannot steal themselves
                if (x == "goal") return; // Player cannot steal the Goal
                if (x == "parcel"){ // Player fetches the parcel from around
                    console.log(`[PickAParcel] Player ${playerID} fetched the parcel.`);
                    G.players[playerID].hasParcel = true;
                    G.positions.parcel = { x: -1, y: -1 }; // Move parcel off board
                } else { // This is another player - steal their parcel
                    stolenPlayerID = x;
                    G.players[stolenPlayerID].hasParcel = false;
                    G.players[playerID].hasParcel = true;
                    console.log(`[PickAParcel] ${playerID} stole the parcel from a ${stolenPlayerID}.`);
                }
            });
        });
        updateG(G);
    },

    throwParcel: ({G, playerID}, direction) => {
        console.log(`[PickAParcel] Player ${playerID} threw the parcel ${direction}!`);

        if (!G.players[playerID].hasParcel){
            // If player does not have a parcel
            console.log(`[PickAParcel] ${playerID} does not have the parcel`)
            return false;
        }

        let playerWon = false;
        let parcelPosition = G.positions[playerID] // If player has the parcel - they share positions
        let { x, y } = parcelPosition;

        G.players[playerID].hasParcel = false; // Player loses the parcel

        let break_=false;
        while (!break_) { // Parcel travelling
             x = parcelPosition.x; y = parcelPosition.y;
            switch (direction) {
                case 'left':
                    if (x > 1) parcelPosition = { x: x - 1, y }; else break_=true;
                    break;
                case 'right':
                    if (x < CONSTANTS.BOARDSIZE) parcelPosition = { x: x + 1, y }; else break_=true;
                    break;
                case 'down':
                    if (y > 1) parcelPosition = { x, y: y - 1 }; else break_=true;
                    break;
                case 'up':
                    if (y < CONSTANTS.BOARDSIZE) parcelPosition = { x, y: y + 1 }; else break_=true;
                    break;
            }

            // Check each position for objects
            Object.entries(G.positions).forEach(([x, pos]) => {
                const collision = (pos.x == parcelPosition.x && pos.y == parcelPosition.y);
                console.log(`${x}= ${pos.x}:${pos.y}  Parcel: ${parcelPosition.x}:${parcelPosition.y} > ${collision}`)
                if (!collision) return; // There is no collision with x - continue ahead
                // if (x == playerID) return; // This should be impossible - it's impossible for player to be on parcel's way
                if (x == "goal") { // Player just won!
                    playerWon = true;
                    break_ = true;
                }
                else if (x == "parcel"){ // this should only happen if parcel has been assigned in this loop
                    break_ = true;
                } else { // Any player fetches the parcel
                    console.log(`[PickAParcel] Parcel was thrown directly on Player ${x}`)
                    G.players[x].hasParcel = true;
                    parcelPosition = { x: -1, y: -1 } // Stop drawing it
                    break_ = true;
                }
            });

        }
        G.positions.parcel = parcelPosition;
        updateG(G);
        return playerWon
    }
}

async function playout({G, playerID}, pauseTimer=CONSTANTS.PAUSETIMER, pauseTimerReduceEachTurn=90/100) {
    // Set everyone to playout
    const playerNum = Object.keys(G.players).length;
    Object.values(G.players).every(player => player.phase = GAMEPHASES[3]); //Playout

    let allFinished = Object.values(G.players).every(player => player.phase === GAMEPHASES[4]);
    while (!allFinished){
        console.log(`[PickAParcel] Player ${playerID} goes next...`)
        G.ctx.currentPlayer = playerID;
        updateG(G);

        pauseTimer = pauseTimer * pauseTimerReduceEachTurn
        await playTurn({G:G, playerID:G.ctx.currentPlayer}, pauseTimer);
        playerID = (playerID + 1) % playerNum
        allFinished = Object.values(G.players).every(player => player.phase === GAMEPHASES[4]);
    }
    console.log(`[PickAParcel] All players finished. Continuing to next Turn...`)
    return false;
}

async function playTurn({G, playerID}, pauseTimer=3000) { // this needs serious fix
    // playerID = G.ctx.currentPlayer // rely on G only
    console.log(`[PickAParcel] It's ${playerID}'s turn.`);
    const playerNum = Object.keys(G.players).length;
    let nextPlayerID = (playerID + 1) % playerNum

    let turnStrategy = G.players[playerID].turnStrategy
    const actionCard = turnStrategy.shift();
    const directionCard = turnStrategy.shift();

    let playerWon = false;
    // Check if player has any cards left in Turn Strategy
    if (actionCard === undefined){
    	G.players[playerID].phase = GAMEPHASES[4]; //Checkwin
        console.log(`[PickAParcel] Player ${playerID} does not have any TurnStrategy cards!`);
    } else {
        G.players[playerID].phase = GAMEPHASES[7]  // EXECUTING
        G.decks.trunk.unshift(actionCard, directionCard)
        const action = actionCard.value
        const direction = directionCard.value
        await new Promise(r => setTimeout(r, pauseTimer)); // Pause for a momen
        G.players[playerID].phase = GAMEPHASES[3]  // PLAYOUT

        if (action === 'move') {
            playerWon = cardAction.movePlayer({G:G, playerID: playerID},  direction);
        } else if (action === 'steal') {
            playerWon = cardAction.stealParcel({G:G, playerID: playerID});
        } else if (action === 'throw') {
            playerWon = cardAction.throwParcel({G:G, playerID: playerID},  direction);
        } // add more card types here
    }
    updateG(G);

    if (playerWon){
        console.log(`[PickAParcel] Player ${playerID} just Won after ${G.ctx.turn} turns!`);
        G.players[playerID].phase = GAMEPHASES[6];
        G.players[playerID].message = "You just WON!"

        G.players[nextPlayerID].phase = GAMEPHASES[5]; // all other players
        G.players[nextPlayerID].message = "You just Lost!"
        // set state to win
        updateG(G);
        return true;
    }

    return false
}
