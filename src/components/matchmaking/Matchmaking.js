import { useState } from 'react';
import {QRCodeSVG} from 'qrcode.react';

import '../pages/ui.css'; // Optional: for styling
import './Matchmaking.css'; // Optional: for styling


import { getMatchURL, generateMatchID } from '../../WebAppConstants'


export const Matchmaking = ({match, setMatch}) => {

	const [inputMatchID, setInputMatchID] = useState(null);

	if (match.matchID === undefined){
		setMatch({
			matchID: generateMatchID(),
			isHost: true,
		})
		sessionStorage.setItem('score', 0);
	}
	const matchUrl = getMatchURL(
		match.matchID,
		!match.isHost // we are Host - share URL for a client
		)

	return (
<div className="page-matchmaking">

	<div className="ui-bubble matchmaking-options-server">
		<span className="ui-title" style={{marginBottom:"0.2em"}}> Host a Game </span>

		<span className="ui-subtitle" style={{marginBottom:"0.2em", fontSize: "1.2em", fontWeigth:"600"}}>
			Match ID: {match.matchID}
		</span>
		<div className="matchmaking-option matchmaking-qrcode">
			<span className="ui-text">
			scanning the QRCode:
			</span>
			{/* --sublime-white, --sublime-gray*/}
			<QRCodeSVG value={matchUrl} includeMargin={true}
				bgColor="#f8f8f2" fgColor="#43443b"
			/>
		</div>

		<div className="matchmaking-option matchmaking-link">
			<span className="ui-text">
			sharing this link:
			</span>
			<a className='matchmaking' href={matchUrl} target="_blank"
				style={{'textWrap': 'break-word'}}>{matchUrl}</a>
		</div>

	</div>

	<div className="ui-bubble matchmaking-options-client">
		<span className="ui-title" style={{marginBottom:"0.2em"}}> Join a Game </span>
		<span className="ui-text">
		Enter the <code>Match ID</code>:
		</span>
		<form className="matchmaking-input-form"
			onSubmit={(e)=>{
					e.preventDefault();
					if (inputMatchID === null || inputMatchID.match(/^ *$/)) return
					const url = getMatchURL(inputMatchID, false)
					console.log(url)

					setMatch({
						matchID: inputMatchID,
						isHost: false,
					})
					
					window.location=url
					}
				}>
			<input type="text" name="matchID"
				maxLength="8" size="8"
				onChange={e => setInputMatchID(e.target.value)} />
			{/* <input type="hidden" name="isHost" value="false" onChange={e => setInputMatchID(e.target.value)} /> */}
			<button type="submit" disabled={
				(inputMatchID === null || inputMatchID.match(/^ *$/)) ? true : false
				}>
					Play Game!
			</button>
		</form>		
	</div>

	<div className="ui-bubble matchmaking-options-random" style={{display: "none"}}>
		<span className="ui-title" style={{marginBottom:"0.2em"}}> Random Match </span>		
	</div>	

</div>
		)

}
