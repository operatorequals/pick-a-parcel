import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { Playfield } from './components/game/Playfield';

import { P2PQRCode } from './components/matchmaking/P2P';
import { InfoBubble } from './components/screens/InfoBubble';
import { Loading } from './components/screens/Loading';
import { Menu } from './components/screens/Menu';

import { HowToPlay } from './components/pages/HowToPlay';
import { Tutorial } from './components/pages/Tutorial';
import { Home } from './components/pages/Home';

import { Routes, Route, useLocation } from "react-router-dom";

import { EffectsBoardWrapper } from 'bgio-effects/react';

import { P2P, generateCredentials } from '@boardgame.io/p2p';

import { PickAParcel } from './Game';

import { generateMatchID, testingMultiplayer } from './WebAppConstants';

const peerJSSecure = window.location.protocol.startsWith("https")

const App = () => {

	const credentials = generateCredentials();
	const location = useLocation()
	const params = new URLSearchParams(location.search)
	let matchID = params.has('matchID') ? params.get('matchID') : generateMatchID();
	const isHost = params.has('isHost') ? (params.get('isHost') === 'true') : true;
	let playerID = params.has('playerID') ? params.get('playerID') : '0';

	console.log(params, matchID, isHost, playerID)

	if (!isHost) // hardcode guest as Player 1
		playerID = '1'
	else
		playerID = '0'

	let debug = true;
	let multiplayer = Local();
	if (process.env.NODE_ENV === 'production' || testingMultiplayer){
		multiplayer = P2P({
			isHost: isHost,
			peerOptions: {
				secure: peerJSSecure,
			}
		})
		debug = false
	}

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
		loading: Loading,
		debug: debug
	});

    return (
		<Routes>

	      <Route path="/" element={
	      	<PickAParcelClient
	      		playerID={playerID}
	      		matchID={matchID}
	      	 />
			}/>
	      <Route path="/how-to-play" element={
	      	<HowToPlay />
			}/>
	      <Route path="/tutorial" element={
	      	<Tutorial />
			}/>
	      <Route path="/info" element={
	      	<InfoBubble />
			}/>
	      <Route path="/test/menu" element={<Menu/>} />
	      <Route path="/test/home" element={<Home/>} />
	      {/* <Route path="/about" element={} /> */}
		</Routes>
	)



};
export default App;
