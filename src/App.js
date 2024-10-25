import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer'; // gonna get network
import { Playfield } from './components/game/Playfield';

import { P2PQRCode } from './components/matchmaking/P2P';

import { Routes, Route, useLocation } from "react-router-dom";

import { EffectsBoardWrapper } from 'bgio-effects/react';

import { P2P } from '@boardgame.io/p2p';

import { PickAParcel } from './Game';

const maxMatchID = 10000;
const matchIDPrefix = 'pick-a-parcel-';
const uuid = () => Math.round(Math.random() * maxMatchID).toString();

const peerJSSecure = window.location.origin.startsWith("https")

const App = () => {

	const location = useLocation()
	const params = new URLSearchParams(location.search)
	let matchID = params.get('matchID');
	let playerID = '0';

	console.log(params, matchID)
	
	const isHost = (matchID === null)

	if (isHost){
		matchID = uuid();
	}
	else{
		playerID = '1'
	}

	let multiplayer = Local();
	if (process.env.NODE_ENV === 'production')
		multiplayer = P2P({
			isHost: isHost ? true : false,
			peerOptions: {
				secure: peerJSSecure,
			}
		})

	const PickAParcelClient = Client({
		game: PickAParcel,
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
	      <Route path="/*" element={
	      	<PickAParcelClient
	      		playerID={playerID}
	      		matchID={matchID}
	      		matchIDPrefix={matchIDPrefix}/>
	      	} />
		</Routes>
	)



};
export default App;
