

export const GameDialog = ({match, setMatch, setIsInGame}) => {
	return (
<div className="page-chat">
	<div className="ui-bubble" style={{margin: "auto"}}>
		<h4>Your MatchID: {match.matchID}</h4>
		You are {match.isHost ? "" : "NOT"} the host
		
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