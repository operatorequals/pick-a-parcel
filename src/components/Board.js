import React, { useState } from 'react';
import './Board.css'; // Optional: for styling

import { useEffectListener } from 'bgio-effects/react';
import { useLatestPropsOnEffect } from 'bgio-effects/react';

import { GAMEPHASES, CONSTANTS, POINTS } from '../game/constants';

// https://delucis.github.io/bgio-effects/client/react/

export const Board = ({ G }) => {
  // let positions = G.positions;

  const [positions, setPositions] = useState(G.positions);

  useEffectListener(
    // Name of the effect to listen for.
      'execute',
    // Function to call when the effect fires.
      (effectPayload, boardProps) => {
        console.log(`execute in Board:`, effectPayload)
        setPositions(effectPayload.positions)
      },
      [setPositions],
  );

  Object.entries(positions).forEach(([obj, pos])=>{
    console.log(`Drawing ${obj} in X: ${pos.x} Y: ${pos.y}`);
  });

  const rows = Array.from({ length: CONSTANTS.BOARDSIZE }, (_, rowIndex) => {
    rowIndex = (CONSTANTS.BOARDSIZE-rowIndex) // invert Y axis
    return <div className="board-row" key={rowIndex}>
      {Array.from({ length: CONSTANTS.BOARDSIZE }, (_, colIndex) => {
        colIndex = colIndex+1 // get to [1,5]
        let placedObject = null;
        let isPlayer = null;
        Object.entries(positions).forEach(([obj, pos]) => {
          if (pos.x === colIndex && pos.y === rowIndex)
            placedObject = obj;
          isPlayer = !isNaN(placedObject)
        });
        const cellClass = placedObject ? (isPlayer ? `player player-${Number(placedObject)+1}` : `objective ${placedObject}`) : ""
        return <div className={`board-cell ${cellClass}`} key={colIndex+1}></div>
      })}
    </div>
  });

  return <div className="board">{rows}</div>;
};
