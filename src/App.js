import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { InfoBubble } from './components/screens/InfoBubble';
import { Menu } from './components/screens/Menu';

import { HowToPlay } from './components/pages/HowToPlay';
import { Tutorial } from './components/pages/Tutorial';
import { Main } from './components/pages/Main';
import { Game } from './components/pages/Game';

import { generateMatchID } from './WebAppConstants';


const inIframe = () => window.self !== window.top;

const App = () => {
	const location = useLocation()
	const params = new URLSearchParams(location.search)

	let matchID = params.has('matchID') ? params.get('matchID') : generateMatchID();
	const isHost = params.has('isHost') ? (params.get('isHost') === 'true') : true;
	let playerID = params.has('playerID') ? params.get('playerID') : '0';

	const [isInGame, setIsInGame] = useState(false)
    const [match, setMatch] = useState({matchID: matchID, isHost: isHost});

    const handleMessage = (event) => {
    	// could make an equality check here:
    	// console.log(event.origin, window.location.origin)
    	const message = event.data
    	if (!(typeof message === 'string' || message instanceof String)) return
        const mts = message.match(/setIsInGame\((\w+)\)/)
    	if (mts === null) return; //no 'setIsInGame' message
        const isInGame = (mts[1] === 'true') // convert to bool
    	console.log("Seetting isInGame from MESSAGE", message, mts[1], isInGame)
    	setIsInGame(isInGame)
    };

    useEffect(() => {
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

	const setIsInGamePass = (isInGame) => {
		if (!inIframe())
			setIsInGame(isInGame)
		else
			window.parent.postMessage(`setIsInGame(${isInGame})`, '*');
	} 

    console.log("Root Component isInGame:", isInGame)
    return (
		<Routes>
	      <Route exact path="/" element={
	      	<Main
	      		match={match}
	      		isInGame={isInGame}
	      		/>
			}/>
	      <Route path="/game" element={
	      	<Game
	      		matchID={matchID} isHost={isHost}
	      		setIsInGame={setIsInGamePass}
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
	      <Route path="/test/home" element={
	      	<Main
	      		match={match}
	      		isInGame={isInGame}
	      		/>
	      	}/>
	      {/* <Route path="/about" element={} /> */}
		</Routes>
	)

};
export default App;
