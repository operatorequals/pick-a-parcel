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
                else if (x == "goal") return; // Player cannot steal the Goal
                else if (x == "parcel"){ // Player fetches the parcel from around
                    console.log(`[PickAParcel] Player ${playerID} fetched the parcel.`);
                    G.players[playerID].hasParcel = true;
                    G.positions.parcel = { x: -1, y: -1 }; // Move parcel off board
                } else { // This is another player - steal their parcel
                    stolenPlayerID = x;
                    if (!G.players[stolenPlayerID].hasParcel) return // if other player has no parcel - no stealing
                    G.players[stolenPlayerID].hasParcel = false;
                    G.players[playerID].hasParcel = true;
                    console.log(`[PickAParcel] Player ${playerID} stole the parcel from Player ${stolenPlayerID}.`);
                }
            });
        });
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
        return playerWon
    }
}

function checkWin({G, playerID}){
    winnerExists = Object.values(G.players).every(player => player.hasParcel);
    if (!winnerExists){
        G.players[playerID].phase = GAMEPHASES.DRAW;
        G.players[playerID].message = "It's a Draw!";
        return false;
    }
    Object.entries(G.players).forEach((playerID, player)=>{
        if (player.hasParcel){
            G.players[playerID].phase = GAMEPHASES.WIN;
            G.players[playerID].message = "You just WON!";
            G.players[playerID].score += POINTS.HOLD_PARCEL;
        } else {
            G.players[playerID].phase = GAMEPHASES.LOSE;
            G.players[playerID].message = "You just Lost!";
        }
    });
}

async function playout({G, playerID}, pauseTimer=CONSTANTS.PAUSETIMER, pauseTimerReduceEachTurn=90/100) {
    // Set everyone to playout
    const playerNum = Object.keys(G.players).length;
    Object.values(G.players).every(player => player.phase = GAMEPHASES.PLAYOUT); //Playout

    let allFinished = Object.values(G.players).every(player => player.phase === GAMEPHASES.FINISHED);
    while (!allFinished){
        console.log(`[PickAParcel] Player ${playerID} goes next...`)
        G.ctx.currentPlayer = playerID;

        pauseTimer = pauseTimer * pauseTimerReduceEachTurn
        await playTurn({G:G, playerID:G.ctx.currentPlayer}, pauseTimer);
        playerID = (playerID + 1) % playerNum
        allFinished = Object.values(G.players).every(player => player.phase === GAMEPHASES.FINISHED);
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
    let playerPoints = 0;
    // Check if player has any cards left in Turn Strategy
    if (actionCard === undefined){
    	G.players[playerID].phase = GAMEPHASES.FINISHED;
        console.log(`[PickAParcel] Player ${playerID} does not have any TurnStrategy cards!`);
    } else {
        G.players[playerID].phase = GAMEPHASES.EXECUTING
        G.decks.trunk.unshift(actionCard, directionCard)
        const action = actionCard.value
        const direction = directionCard.value

        // Announce card to players
        // moves.messagePlayer({G:G, playerID: playerID}, `Player ${playerID}:\n${action}("${direction}");`, pauseTimer)
        // moves.messagePlayer({G:G, playerID: nextPlayerID}, `Player ${playerID}:\n${action}("${direction}");`, pauseTimer)

        await new Promise(r => setTimeout(r, pauseTimer)); // Pause for a momen
        G.players[playerID].phase = GAMEPHASES.PLAYOUT  // PLAYOUT

        if (action === 'move') {
            playerWon = cardAction.movePlayer({G:G, playerID: playerID},  direction);
            playerPoints = POINTS.MOVE_TO_DESTINATION
        } else if (action === 'steal') {
            playerWon = cardAction.stealParcel({G:G, playerID: playerID});
        } else if (action === 'throw') {
            playerWon = cardAction.throwParcel({G:G, playerID: playerID},  direction);
            playerPoints = POINTS.THROW_TO_DESTINATION
        } // add more card types here
    }

    if (playerWon){
        console.log(`[PickAParcel] Player ${playerID} just Won after ${G.ctx.turn} turns!`);
        G.players[playerID].phase = GAMEPHASES.WIN;
        G.players[playerID].message = "You just WON!"
        G.players[playerID].score += playerPoints

        G.players[nextPlayerID].phase = GAMEPHASES.LOSE; // all other players
        G.players[nextPlayerID].message = "You just Lost!"
        return true;
    }

    return false
}
