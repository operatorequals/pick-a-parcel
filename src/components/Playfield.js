import React from 'react';
import './Playfield.css'; // Optional for styling

import { Board } from '../components/Board';
import { Hand } from '../components/Hand';
import { TurnStrategy } from '../components/TurnStrategy';

export const Playfield = ({G, ctx, events, playerID, moves}) => {
	let ownTurnStrategy = null;
	const turnStrategies = Array.from({ length: Object.keys(G.players).length }, (_, playerIndex) => {
		const visible = (Number(playerID) === playerIndex)
		const turnStrategy = <TurnStrategy
			key={playerIndex}
			G={G}
			playerID={playerIndex}
			moves={moves}
			visible={visible}/>
		if (visible === false)
			return turnStrategy
		else
			ownTurnStrategy = turnStrategy
	});
	turnStrategies.push(ownTurnStrategy) // Add own TurnStrategy element last
	
	return (
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
}


			// <Card id="1m96uly" type="action" value="move" flipped="true"
			// onclick={moves.addToTurnStrategy}

