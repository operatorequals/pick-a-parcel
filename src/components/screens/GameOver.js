import { useEffect } from "react";

import { maxMatchID, WebAppURLs } from '../../WebAppConstants';
import './GameOver.css';

// import './GameOver.css';

export const GameOver = ({ ctx, playerID, matchID, setScore }) => {

    const winner = ctx.gameover.winner;
    const reason = ctx.gameover.reason;
    const draw = winner === undefined;
    const won = Number(winner) === Number(playerID);

    const fullPath = window.location.origin + window.location.pathname;
    const replayerMatchID = Number(matchID) * 87634 % maxMatchID; // calculate the same next ID

    let params = new URLSearchParams();
    params.set('matchID', replayerMatchID);
    params.set('isHost', playerID === '0' ? 'true' : 'false');

    const replayURL = `javascript:window.location.href=window.location.href`;
    // const replayURL = `${WebAppURLs.game}?${params.toLocaleString()}`;

    useEffect(() => { // Update App State - a game is ON!
        if (won)
            setScore(prev=>prev+ctx.gameover.points);
        },
        [won]
    )

    return (
        <div className='gameover-container'>
            <div className='text-container'>
                <h2 className="result-text">
                    {draw ?
                        "It's a DRAW" :
                        (won ? "You WON!" :
                            "You LOST")
                    }
                </h2>
                {!draw ?
                    <div className="result-points">
                        Points acquired: <span>{ctx.gameover.points}</span>!
                    </div>
                    : ""}
                <a className='reset-button' href="javascript:location.reload()">playAgain<span>()</span>;</a>
            </div>
        </div>
    );
};
