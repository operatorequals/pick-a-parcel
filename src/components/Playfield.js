import React from 'react';
// import './Card.css'; // Optional for styling

import { Board } from '../components/Board';
import { Hand } from '../components/Hand';
import { TurnStrategy } from '../components/TurnStrategy';

export const Playfield = ({G, ctx, events, playerID, moves}) => {
	const turnStrategies = Array.from({ length: Object.keys(G.players).length }, (_, playerIndex) => {
		//will need to sort my own ID last
		// console.log("---",playerID, playerIndex, Number(playerID) === playerIndex)
		const visible = (Number(playerID) === playerIndex)
		return <TurnStrategy
			key={playerIndex}
			G={G}
			playerID={playerIndex}
			moves={moves}
			visible={visible}/>
	});
	return (
		<div className="playfield">
			<Board G={G} />
			<div className="turn-strategies">
				{turnStrategies}
			</div>
			<Hand G={G} playerID={playerID} moves={moves}/>
		</div>
	)
}


			// <Card id="1m96uly" type="action" value="move" flipped="true"
			// onclick={moves.addToTurnStrategy}

