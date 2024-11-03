import { Routes, Route, useLocation } from "react-router-dom";

import { InfoBubble } from './components/screens/InfoBubble';
import { Menu } from './components/screens/Menu';

import { HowToPlay } from './components/pages/HowToPlay';
import { Tutorial } from './components/pages/Tutorial';
import { Main } from './components/pages/Main';
import { Game } from './components/pages/Game';

import { generateMatchID } from './WebAppConstants';


const App = () => {
	const location = useLocation()
	const params = new URLSearchParams(location.search)

	let matchID = params.has('matchID') ? params.get('matchID') : generateMatchID();
	const isHost = params.has('isHost') ? (params.get('isHost') === 'true') : true;
	let playerID = params.has('playerID') ? params.get('playerID') : '0';

    return (
		<Routes>

	      <Route path="/" element={
	      	<Game
	      		matchID={matchID} isHost={isHost}
	      		/>
			}/>
	      <Route path="/game" element={
	      	<Game
	      		matchID={matchID} isHost={isHost}
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
	      		matchID={matchID} isHost={isHost}
	      		/>
	      	}/>
	      {/* <Route path="/about" element={} /> */}
		</Routes>
	)

};
export default App;
