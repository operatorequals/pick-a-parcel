import { useState } from 'react';
import {QRCodeSVG} from 'qrcode.react';

import './P2P.css'; // Optional: for styling
import '../pages/ui.css'; // Optional: for styling





export const P2PQRCode = ({ matchID, matchIDPrefix }) => {

	const [inputMatchID, setInputMatchID] = useState(null);

	matchIDPrefix = matchIDPrefix ? matchIDPrefix : 'pick-a-parcel-'
	matchIDPrefix = ''

	const getMatchURL = (matchID, isHost) => {
		let params = new URLSearchParams()
		params.set('matchID', matchID)
		params.set('isHost', isHost)
		const fullPath = window.location.origin + window.location.pathname

		return `${fullPath}#/?${params.toLocaleString()}`;
	}

	const matchUrl = getMatchURL(matchIDPrefix+matchID, false)

	return (
<div className='page-matchmaking'>
	<div className='ui-bubble'>
		<h2> Welcome to <span className="gametitle">Pick-A-Parcel</span> Multiplayer</h2>
		<h3 style={{textAlign: "center"}}> Your match ID is: <code className="matchmaking-matchid">{matchID}</code> </h3>
		<h4 style={{textAlign: "center"}}> Get someone to join the game by:</h4>
		<div className="matchmaking-options">
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
				<a className='matchmaking' href={matchUrl} target="_blank">{matchUrl}</a>
			</div>

			<div className="matchmaking-option matchmaking-input">
				<span className="ui-text">
				Or join yourself a game by typing a <code>Match ID</code> here:
				</span>
				<form className="matchmaking-input-form"
					onSubmit={(e)=>{
							e.preventDefault();
							if (inputMatchID === null || inputMatchID.match(/^ *$/)) return
							const url = getMatchURL(inputMatchID, false)
							console.log(url)
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
		</div>
	</div>
</div>
	);

}