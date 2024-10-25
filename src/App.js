import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer'; // gonna get network
import { Playfield } from './components/game/Playfield';

import { P2PQRCode } from './components/matchmaking/P2P';

import { Routes, Route, useLocation } from "react-router-dom";

import { EffectsBoardWrapper } from 'bgio-effects/react';

import { P2P, generateCredentials } from '@boardgame.io/p2p';

import { PickAParcel } from './Game';

const maxMatchID = 10000;
const matchIDPrefix = 'pick-a-parcel-';
// const matchIDPrefix = ''
const uuid = () => Math.round(Math.random() * maxMatchID).toString();

const peerJSSecure = window.location.protocol.startsWith("https")

const App = () => {

	const credentials = generateCredentials();
	const location = useLocation()
	const params = new URLSearchParams(location.search)
	let matchID = params.has('matchID') ? params.get('matchID') : uuid();
	const isHost = params.has('isHost') ? (params.get('isHost') === 'true') : (matchID === null);
	let playerID = params.has('playerID') ? params.get('playerID') : '0';

	console.log(params, matchID, isHost, playerID)

	if (!isHost) // hardcode guest as Player 1
		playerID = '1'
	else
		playerID = '0'

	let multiplayer = Local();
	if (process.env.NODE_ENV === 'production')
		multiplayer = P2P({
			isHost: isHost,
			peerOptions: {
				secure: peerJSSecure,
			}
		})

	const PickAParcelClient = Client({
		game: PickAParcel,
		credentials: credentials,
		matchID: matchID,
		board: EffectsBoardWrapper(Playfield, {
		  updateStateAfterEffects: true,
		  speed: 1,
		}),
		playerID: playerID,
		multiplayer: multiplayer,
	});

    return (
		<Routes>
	      <Route path="/" element={
	      	<PickAParcelClient
	      		playerID={playerID}
	      		matchID={matchID}
	      		matchIDPrefix={matchIDPrefix}/>
	      	} />
	      {/* <Route path="/how-to-play" element={} /> */}
	      {/* <Route path="/about" element={} /> */}

		</Routes>
	)



};
export default App;
