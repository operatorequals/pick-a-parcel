import React, { useState } from 'react';
import './TurnStrategy.css'; // Optional: for styling

import { useEffectListener } from 'bgio-effects/react';

import { Card } from './Card';


export const TurnStrategy = ({ G, ctx, playerID, moves, visible },) => {

  // const [exec, setExec] = useState({});
  // const [turnStrategy, setTurnStrategy] = useState(G.players[playerID].turnStrategy);
  let exec = {};
  let turnStrategy = G.players[playerID].turnStrategy;

  // console.log(`Rendering Turn Strategy (${visible ? "" : "in"}visible) for ${playerID}`, turnStrategy)
  useEffectListener(
      'preExecute',
      (effectPayload, boardProps) => {
  		exec = {
      		'action': effectPayload.action,
      		'direction': effectPayload.direction,
      		'playerID': effectPayload.playerID,
      	}
      	// setTurnStrategy(effectPayload.turnStrategy)
      	turnStrategy = effectPayload.turnStrategy
      	console.log("[TurnStrategy] preExecute", turnStrategy.length)
      	// const timeout = setTimeout(setExec({}), 2000);
      	// return () => clearTimeout(timeout);
      },
      [exec, turnStrategy,
      // setTurnStrategy
      ],
  );
// 
//   useEffectListener(
//   	'postExecute',
//       (effectPayload, boardProps) => {
//       	exec = {}
//       	console.log("[TurnStrategy] postExecute")
//       },
//       [exec],
//   );

  if (playerID == undefined)
  	visible = true;
    // return <div className="turn-strategy-rest"></div>;

  const cards = Array.from({ length: turnStrategy.length }, (_, cardIndex) => {
    const card = turnStrategy[cardIndex];
    if (visible)
	    return <Card
			key={card.id}
			id={card.id}
			type={card.type}
			value={card.value}
			face="up"
			onclick={moves.removeFromTurnStrategy}/>
	else
	    return <Card
			key={card.id}
			id={card.id}
			face="down"/>
  });

// player-${playerID+1}
  return <div className={`turn-strategy-wrapper`}>
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
