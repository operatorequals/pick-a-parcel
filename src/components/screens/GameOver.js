

// import './GameOver.css';

export const GameOver = ({G, ctx, reset, playerID}) => {

	const winner = ctx.gameover.winner;
	const reason = ctx.gameover.reason;
	const draw = winner === undefined;
	const won = Number(winner) === Number(playerID);
	
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
			<a href={window.location}>RESET!</a>
		</div>
		)
}
