import React from 'react';
import './Board.css'; // Optional: for styling

import { GAMEPHASES, CONSTANTS, POINTS } from '../game/constants';


export const Board = ({ G }) => {
  const rows = Array.from({ length: CONSTANTS.BOARDSIZE }, (_, rowIndex) => (
    <div className="board-row" key={rowIndex+1}>
      {Array.from({ length: CONSTANTS.BOARDSIZE }, (_, colIndex) => {
        let placedObject = null;
        let isPlayer = null;
        Object.entries(G.positions).forEach(([obj, pos]) => {
          if (pos.x === colIndex+1 && pos.y === rowIndex+1)
            placedObject = obj;
          isPlayer = !isNaN(placedObject)
        });
        const cellClass = placedObject ? (isPlayer ? `player player-${placedObject}` : `objective ${placedObject}`) : ""
        console.log(placedObject, isPlayer, colIndex, rowIndex)
        return <div className={`board-cell ${cellClass}`} key={colIndex+1}></div>
      })}
    </div>
  ));

  return <div className="board">{rows}</div>;
};
