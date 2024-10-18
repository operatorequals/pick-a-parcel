import React from 'react';
import './TurnStrategy.css'; // Optional: for styling

import { Card } from '../components/Card';




export const TurnStrategy = ({ G, ctx, playerID, moves, own },) => {

  if (playerID == undefined)
    return <div className="turn-strategy-rest"></div>;

	console.log("own", own)
  const turnStrategy = G.players[playerID].turnStrategy
  const cards = Array.from({ length: turnStrategy.length }, (_, cardIndex) => {
    const card = turnStrategy[cardIndex];
    if (own)
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

  

  return <div className="turn-strategy-wrapper">
		  	<div className="turn-strategy-action"></div>
		  	<div className="turn-strategy-direction"></div>
		  	<div className="turn-strategy-rest">{cards}</div>
		 </div>;
}
