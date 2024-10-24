import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer'; // gonna get network
import { Playfield } from './components/game/Playfield';

import { P2PQRCode } from './components/matchmaking/P2P';

import { Routes, Route } from "react-router-dom";

import { EffectsBoardWrapper } from 'bgio-effects/react';

import { P2P } from '@boardgame.io/p2p';

import { PickAParcel } from './Game';


const uuid = () => Math.round(Math.random() * 1e16).toString(32);
let matchID = undefined;
let matchUrl = undefined;
let playerID = '0';

const urlHash = window.location.hash
const params = new URLSearchParams(urlHash)

const guest = params.get("#/?matchID") !== null
console.log(window.location.hash, urlHash, params)
if (guest){
	matchID = params.get("#/?matchID")
	playerID = '1'
}
else{
	matchID = `pick-a-parcel-${uuid()}`;
}

const peerJSSecure = window.location.origin.startsWith("https")

let multiplayer = Local();
if (process.env.NODE_ENV === 'production')
	multiplayer = P2P({
		isHost: guest ? false : true,
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

	// debug: true, // is handled by NODE_ENV === production automatically
});

const App = () => (
    <Routes>
      <Route path="/*" element={	<PickAParcelClient playerID={playerID} matchID={matchID}/> } />
	</Routes>


);
export default App;
