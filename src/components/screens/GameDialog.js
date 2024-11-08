

export const GameDialog = ({match, setMatch, setIsInGame, score}) => {
	return (
<div className="page-chat">
	<div className="ui-bubble" style={{margin: "auto"}}>
		<h3> Match Details </h3>
		<h4>MatchID: {match.matchID}</h4>
		You are {match.isHost ? "" : "NOT"} the host
		
	</div>
	<div className="ui-bubble" style={{margin: "auto"}}>
		<h3> Score </h3>
		<h4>Your score: <b>{score}</b></h4>
		
	</div>
	<div className="ui-button-wrapper" style={{margin: "auto"}}>
		<div className="ui-button"
			onClick={
				()=>{
					setMatch({});
					setIsInGame(false);
				}
			}>Stop Match
		</div>
	</div>
</div>
	)
}