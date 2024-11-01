import { useState } from 'react';

import '../pages/ui.css'
import './Loading.css'

import { InfoBubble } from './InfoBubble'

import { useLocation } from "react-router-dom";


export const Loading = ({}) => {

	const location =  useLocation();
	const params = new URLSearchParams(location.search);
	const matchID = params.get('matchID');

	const [tooLong, setTooLong] = useState(false)
	const tooLongTimer = 5*1000 // 10 secs
	setTimeout(()=>{
		setTooLong(true)
	}, tooLongTimer)

	return(
<div className="page-loading">
	<div className="ui-bubble" style={{textAlign: "center"}}>
		<h2> Connecting to Game... </h2>
		{matchID !== null && <h3> Match ID: {matchID} </h3>}
		{ tooLong
			? <div>
				<h4> This is taking way too long... </h4>
				Maybe try refreshing the page?
			</div>
			: <h4>Good Luck!</h4>
		}
	</div>
	<InfoBubble />
</div>

	)
}