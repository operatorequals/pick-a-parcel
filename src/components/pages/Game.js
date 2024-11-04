import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';

import { EffectsBoardWrapper } from 'bgio-effects/react';

import { P2P, generateCredentials } from '@boardgame.io/p2p';

import { useLocation } from "react-router-dom";

import { Loading } from '../screens/Loading';

import { Playfield } from '../game/Playfield';
	
import { PickAParcel } from '../../Game';

import { generateMatchID, testingMultiplayer } from '../../WebAppConstants';


export const Game = ({matchID, isHost, setIsInGame}) => {
	
	const peerJSSecure = window.location.protocol.startsWith("https")
	const credentials = generateCredentials();

	let playerID = undefined;
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

	return	<PickAParcelClient
	      		playerID={playerID}
	      		matchID={matchID}
	      		setIsInGame={setIsInGame}
			/>
}