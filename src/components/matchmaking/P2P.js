import {QRCodeSVG} from 'qrcode.react';

import './P2P.css'; // Optional: for styling


export const P2PQRCode = ({ matchID, matchIDPrefix }) => {

	matchIDPrefix = matchIDPrefix ? matchIDPrefix : 'pick-a-parcel-'
	matchIDPrefix = ''

	const fullPath = window.location.origin + window.location.pathname
	let params = new URLSearchParams()
	params.set('matchID', matchIDPrefix+matchID)

	const matchUrl = `${fullPath}#?${params.toLocaleString()}`;

	return (
	<div className='page'>
	<div className='matchmaking'>
		<h1> Welcome to <span className="gametitle">Pick-A-Parcel</span> Multiplayer</h1>
		<h2 className="matchmaking-text"> Your match ID is: <code className="matchmaking-matchid">{matchID}</code> </h2>
		<div className="matchmaking-options">
			<div className="matchmaking-option matchmaking-qrcode">
				<p>
				Get someone to join the game by scanning the QRCode:
				</p>
				<QRCodeSVG value={matchUrl} includeMargin={true}
					bgColor="#f8f8f2" fgColor="#43443b"
				/>
			</div>
			<div className="matchmaking-option matchmaking-link"> or by clicking on:<br/>
				<a className='matchmaking' href={matchUrl} target="_blank">{matchUrl}</a>
			</div>
		</div>
	</div>
	</div>
	);

}