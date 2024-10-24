import React, { useState } from 'react';
import './Board.css'; // Optional: for styling

import { useEffectListener } from 'bgio-effects/react';

import { GAMEPHASES, CONSTANTS, POINTS } from '../../game/constants';

// https://delucis.github.io/bgio-effects/client/react/

export const Board = ({ G }) => {
  // let positions = G.positions;

  const [positions, setPositions] = useState(G.positions);
  const [players, setPlayers] = useState(G.players);

  useEffectListener(
    // Name of the effect to listen for.
      'postExecute',
    // Function to call when the effect fires.
      (effectPayload, boardProps) => {
        console.log(`execute in Board:`, effectPayload)
        setPositions(effectPayload.positions)
        setPlayers(effectPayload.players) // to find out whether holding the parcel
      },
      [setPositions],
  );

  // Object.entries(positions).forEach(([obj, pos])=>{
  //   console.log(`Drawing ${obj} in X: ${pos.x} Y: ${pos.y}`);
  // });

  const rows = Array.from({ length: CONSTANTS.BOARDSIZE }, (_, rowIndex) => {
    rowIndex = (CONSTANTS.BOARDSIZE-rowIndex) // invert Y axis
    return <div className="board-row" key={rowIndex}>
      {Array.from({ length: CONSTANTS.BOARDSIZE }, (_, colIndex) => {
        colIndex = colIndex+1 // get to [1,5]
        let placedObject = null;
        let isPlayer = null;
        let playerID = null;
        Object.entries(positions).forEach(([obj, pos]) => {
          if (pos.x === colIndex && pos.y === rowIndex)
            placedObject = obj;
          isPlayer = !isNaN(placedObject) && placedObject !== null
          playerID = isPlayer ? Number(placedObject) : null
        });
        // console.log(placedObject, isPlayer, playerID, players[playerID])
        let playerHasParcelClass = "";
        if (isPlayer){
          playerHasParcelClass = players[playerID].hasParcel ? "has-parcel" : ""
        }
        // console.log(playerHasParcelClass)
        // TODO: NEEDS to use intermediate G (from effect) to see if got the parcel
        const cellClass = placedObject ? (isPlayer ? `player player-${Number(placedObject)+1} ${playerHasParcelClass}` : `objective ${placedObject}`) : ""
        return <div className={`board-cell ${cellClass}`} key={colIndex+1}>{placedObject ? placedObject[0] : ""}</div>
      })}
    </div>
  });

  return <div className="board">{rows}</div>;
};
