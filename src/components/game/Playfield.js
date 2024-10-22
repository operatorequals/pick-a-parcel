import React from 'react';
import './Playfield.css'; // Optional for styling

import { useOrientation } from 'react-use';

import { Board } from './Board';
import { Hand } from './Hand';
import { TurnStrategy } from './TurnStrategy';

import { P2PQRCode } from '../matchmaking/P2P';


const PlayfieldLandscape = ({G, ctx, events, playerID, moves, turnStrategies}) => (
		<div className="playfield">
			<div className="playout">
				<Board G={G} />
				<div className="turn-strategies">
					{turnStrategies}
				</div>
			</div>
			<div className="playcontrol">
				<Hand G={G} playerID={playerID} moves={moves}/>
				<div className="submit-wrapper">
					<div id="submit" onClick={()=>moves.submitTurnStrategy()}>Run Script...</div>
				</div>
			</div>
		</div>
)

const PlayfieldPortrait = ({G, ctx, events, playerID, moves, turnStrategies}) => (
		<div className="playfield">
			<div className="playout">
				{turnStrategies[0]}
				<Board G={G} />
				{turnStrategies[1]}
			</div>
			<div className="playcontrol">
				<Hand G={G} playerID={playerID} moves={moves}/>
				<div className="submit-wrapper">
					<div id="submit" onClick={()=>moves.submitTurnStrategy()}>Run Script...</div>
				</div>
			</div>
		</div>
)



export const Playfield = ({G, ctx, events, playerID, moves, matchID, matchData}) => {

    const noPlayerTwo = !matchData.every(player=>player.isConnected)
    if (noPlayerTwo)
	    return <P2PQRCode matchID={matchID}/>

    const orientation = useOrientation().type;
    // const orientation = window.matchMedia('(max-width: 480px)').matches ? "portrait" : "landscape"

	let ownTurnStrategy = null;
	const turnStrategies = Array.from({ length: Object.keys(G.players).length }, (_, playerIndex) => {
		const visible = (Number(playerID) === playerIndex)
		const turnStrategy = <TurnStrategy
			key={playerIndex}
			G={G}
			playerID={playerIndex}
			moves={moves}
			visible={visible}/>
		console.log(visible, turnStrategy)
		if (visible === false)
			return turnStrategy
		else
			ownTurnStrategy = turnStrategy
	}).filter(x=>x !== undefined);

	turnStrategies.push(ownTurnStrategy) // Add own TurnStrategy element last

	if (orientation.indexOf("landscape") !== -1)
		return <PlayfieldLandscape G={G} ctx={ctx} events={events} playerID={playerID} moves={moves} turnStrategies={turnStrategies} />
	else
		return <PlayfieldPortrait G={G} ctx={ctx} events={events} playerID={playerID} moves={moves} turnStrategies={turnStrategies} />
}


			// <Card id="1m96uly" type="action" value="move" flipped="true"
			// onclick={moves.addToTurnStrategy}

