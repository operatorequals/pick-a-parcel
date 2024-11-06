import { useState } from 'react';

import '../pages/ui.css'
import './Loading.css'

import { InfoBubble } from './InfoBubble'

import { useLocation } from "react-router-dom";


export const Loading = ({isHost}) => {

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
		<h2> {!isHost ? <span>Connecting to</span> : <span>Hosting</span>} Game... </h2>
		{matchID !== null && <h3> Match ID: {matchID} </h3>}
		{ tooLong
			? <div>

				<h4> This is taking way too long... </h4>
				Maybe try {!isHost ?
					<span
						onClick={()=>window.location.reload()}
						style={{cursor: "pointer", fontStyle: "italic"}}
					>refreshing the page?</span> :
					<span>asking the client to refresh the page!</span>
				}
			</div>
			: <h4>Good Luck!</h4>
		}
	</div>
	<InfoBubble style={{
		position: "absolute",
		right: 0,
		bottom: 0,
		}}/>
</div>

	)
}