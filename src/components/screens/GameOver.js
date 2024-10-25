import { maxMatchID } from '../../WebAppConstants';


// import './GameOver.css';

export const GameOver = ({G, ctx, reset, playerID, matchID}) => {

	const winner = ctx.gameover.winner;
	const reason = ctx.gameover.reason;
	const draw = winner === undefined;
	const won = Number(winner) === Number(playerID);

	const fullPath = window.location.origin + window.location.pathname
	const replayerMatchID = Number(matchID) * 87634 % maxMatchID // calculate the same next ID

	let params = new URLSearchParams()
	params.set('matchID', replayerMatchID)
	params.set('isHost', playerID === '0' ? 'true' : 'false')

	const replayURL = `${fullPath}#?${params.toLocaleString()}`;

	return (
		<div>
			<div className="result-text">
			{draw ? 
				"It's a DRAW" :
				(won ? "You WON!" :
				"You LOST")
			}
			</div>
			{ !draw ?
			<div className="result-points">
				Points acquired: {ctx.gameover.points}!
			</div>
			: ""}
			<a href={replayURL}>RESET!</a>
		</div>
		)
}
