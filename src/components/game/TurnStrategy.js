import React, { useState } from 'react';
import './TurnStrategy.css'; // Optional: for styling
import './Board.css'; // Optional: for styling

import { useEffectListener } from 'bgio-effects/react';

import { Card } from './Card';


export const TurnStrategy = ({ G, ctx, playerID, moves, visible },) => {

  let turnStrategy = G.players[playerID].turnStrategy;
  const [playout, setPlayout] = useState(false);
  const [exec, setExec] = useState({});
  const [turnStrategyExec, setTurnStrategyExec] = useState(turnStrategy);
  // console.log("Turn Strategy", playerID, turnStrategy, turnStrategyExec)
  // let exec = {};

 useEffectListener('postPlayout',
    (effectPayload, boardProps) => {
      // console.log("[TurnStrategy] postPlayout")
      setPlayout(false)
    },
    [setPlayout]
  );

  useEffectListener(
      'preExecute',
      (effectPayload, boardProps) => {

        if (effectPayload.playerID !== playerID) return // drawn only in corresponding component
        setPlayout(true)

        setTurnStrategyExec(effectPayload.turnStrategy)
    		const execPayload = {
      		'action': effectPayload.action,
      		'direction': effectPayload.direction,
      	}
        setExec(execPayload)
      	// turnStrategy = effectPayload.turnStrategy
      	console.log("[TurnStrategy] preExecute", turnStrategyExec.length)
  
      },
      [setTurnStrategyExec, setExec],
  );

  useEffectListener(
  	'postExecute',
      (effectPayload, boardProps) => {
        if (effectPayload.playerID !== playerID) return // drawn only in corresponding component
        setExec({})
      	console.log("[TurnStrategy] postExecute")
      },
      [setExec],
  );

  if (playerID === undefined) //spectator
  	visible = true;

  // if in playout - draw the intermediate turnStrategy
  if (playout) turnStrategy = turnStrategyExec;

  const cards = Array.from({ length: turnStrategy.length }, (_, cardIndex) => {
    const card = turnStrategy[cardIndex];
    if (visible)
	    return <Card
			key={card.id}
			id={card.id}
			type={card.type}
			value={card.value}
			face="up"
      animation={!playout}
			onclick={moves.removeFromTurnStrategy}/>
	else
	    return <Card
			key={card.id}
			id={card.id}
      animation={!playout}
			face="down"/>
  });

// player-${playerID+1}
  return <div className={`turn-strategy-wrapper player-${playerID+1}`}>
			{exec.action !== undefined ?
			<div className="turn-strategy-exec">
			  	<div className="turn-strategy-action">
					<Card
						type="action"
						value={exec.action}
						face="up" />
			  	</div>
			  	<div className="turn-strategy-direction">
					<Card
						type="direction"
						value={exec.direction}
						face="up" />
			  	</div>
		  	</div>
		  	: ""}
		  	<div className="turn-strategy-rest">{cards.length !== 0 ? cards : ""}</div>
		 </div>;
}
