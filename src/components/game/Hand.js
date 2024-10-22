import React from 'react';
import './Hand.css'; // Optional: for styling

import { Card } from './Card';


export const Hand = ({ G, ctx, playerID, moves }) => {

  if (playerID == undefined)
    return <div className="hand"></div>;

  const hand = G.players[playerID].hand

  const cards = Array.from({ length: hand.length }, (_, cardIndex) => {
    const card = hand[cardIndex];
    return <Card key={card.id} id={card.id} type={card.type} value={card.value} face="up" onclick={moves.addToTurnStrategy}/>
  });

  return <div className="hand">{cards}</div>;
};
