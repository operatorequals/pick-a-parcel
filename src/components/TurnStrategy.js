import React, { useState } from 'react';
import './TurnStrategy.css'; // Optional: for styling

import { useEffectListener } from 'bgio-effects/react';

import { Card } from '../components/Card';


export const TurnStrategy = ({ G, ctx, playerID, moves, visible },) => {

  const [exec, setExec] = useState({});

  useEffectListener(
    // Name of the effect to listen for.
      'toExecute',
    // Function to call when the effect fires.
      (effectPayload, boardProps) => {
  		setExec({
      		'action': effectPayload.action,
      		'direction': effectPayload.direction,
      		'playerID': effectPayload.playerID,
      	});
      	// const timeout = setTimeout(setExec({}), 2000);
      	// return () => clearTimeout(timeout);
      },
      [setExec],
  );

  useEffectListener(
  	'executed',
      (effectPayload, boardProps) => setExec({}),
      [setExec],
  );

  if (playerID == undefined)
    return <div className="turn-strategy-rest"></div>;

  console.log(`Turn Strategy ${playerID} visible:`, visible)
  const turnStrategy = G.players[playerID].turnStrategy
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
			{exec.playerID === playerID ?
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
		  	<div className="turn-strategy-rest">{cards}</div>
		 </div>;
}
