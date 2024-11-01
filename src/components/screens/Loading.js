import '../pages/ui.css'
import './Loading.css'

import { InfoBubble } from './InfoBubble'

import { useLocation } from "react-router-dom";


export const Loading = ({}) => {

	const location =  useLocation();
	const params = new URLSearchParams(location.search);
	const matchID = params.get('matchID');

	return(

<div className="page-loading">
	<div className="ui-bubble" style={{textAlign: "center"}}>
		<h2> Connecting to Game... </h2>
		{matchID !== null ?? <h3> Match ID: {matchID} </h3>}
		<h4>Good Luck!</h4>
	</div>
	<InfoBubble />
</div>

	)
}