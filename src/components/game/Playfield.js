import React, { useState, useEffect } from 'react';
import './Playfield.css'; // Optional for styling

// import { useOrientation } from 'react-use';
import { useEffectListener } from 'bgio-effects/react';

import { Board } from './Board';
import { Hand } from './Hand';
import { TurnStrategy } from './TurnStrategy';

import { GameOver } from '../screens/GameOver'
import { Loading } from '../screens/Loading'

import { testingMultiplayer } from '../../WebAppConstants';

export const Playfield = ({G, ctx, events, playerID, moves, matchID, matchData, isHost, setIsInGame, orientation}) => {

	const [playout, setPlayout] = useState(false);
	const [endGame, setEndGame] = useState(false);
	
	useEffectListener('prePlayout',
		(effectPayload, boardProps) => {
			setEndGame(false) // reset endGame, in case it is set
			setPlayout(true)
		},
		[setPlayout, setEndGame]
	);

	useEffectListener('postPlayout',
		(effectPayload, boardProps) => setPlayout(false),
		[setPlayout]
	);


	useEffectListener('endGame',
		(effectPayload, boardProps) => setEndGame(true),
		[setEndGame]
	);

	const allConnected = matchData.every(player=>player.isConnected)

	useEffect(() => { // Update App State - a game is ON!
    	setIsInGame(matchData.every(player=>player.isConnected))
	}, [setIsInGame, matchData]);

    // disable along the debug panel: https://boardgame.io/documentation/#/debugging?id=using-the-debug-panel-in-production
    if (!allConnected && (testingMultiplayer || process.env.NODE_ENV === 'production')){
    	return <Loading isHost={isHost}/>
    }

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
	}).filter(x=>x !== undefined);

	turnStrategies.push(ownTurnStrategy) // Add own TurnStrategy element last

	const playerTurnProperties = {
		isNext: Number(ctx.currentPlayer) === Number(playerID),
		active: ctx.activePlayers !== null ? (
			(Object.keys(ctx.activePlayers).indexOf(playerID) !== -1) && !playout
			) : false
	}
	// console.log(G, ctx, playerID, matchID)

	return (
		<div className="playfield">
			{
				(ctx.gameover !== undefined && endGame) &&
				<GameOver ctx={ctx} playerID={playerID} matchID={matchID}/>
			}
			{
				(orientation.indexOf("landscape") !== -1) ?
				<div className="playout">
					<Board G={G} />
					<div className="turn-strategies">
						{turnStrategies}
					</div>
				</div>
				:<div className="playout">
					{turnStrategies[0]}
					<Board G={G} />
					{turnStrategies[1]}
				</div>
			}
			<div className={
					`playcontrol
					${playerTurnProperties.isNext ? "plays-next" : ""}
					${!playerTurnProperties.active ? "inactive" : ""}
					`}>
				<Hand G={G} playerID={playerID} moves={moves}/>
				<div className="submit-wrapper">
					<div id="submit" onClick={
						playerTurnProperties.active ?
						()=>moves.submitTurnStrategy() : ()=>{}}>
						Run Script...
					</div>
				</div>
			</div>
		</div>
		)
}

