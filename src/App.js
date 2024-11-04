import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { InfoBubble } from './components/screens/InfoBubble';
import { Menu } from './components/screens/Menu';
import { FloatingButton } from './components/screens/FloatingButton';

import { HowToPlay } from './components/pages/HowToPlay';
import { Tutorial } from './components/pages/Tutorial';
import { Main } from './components/pages/Main';
import { Game } from './components/pages/Game';

import { generateMatchID } from './WebAppConstants';

import { appRoutes, appRoutesMap } from './Router';

import './App.css'

const App = () => {
	const location = useLocation()
	const params = new URLSearchParams(location.search)

	const [isInGame, setIsInGame] = useState(false)
    const [match, setMatch] = useState({
    	matchID: params.has('matchID') ? params.get('matchID') : generateMatchID(),
    	isHost: params.has('isHost') ? (params.get('isHost') === 'true') : true,
    	});

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    console.log("Root Component isInGame:", isInGame)
    console.log(match.matchID,match.isHost)

	const appRoutesComponent = appRoutes.map(({ path, name, component }) => {
		const Component = component
		if (name === "game")
		    return <Route key={name} path={path} element={
		    	<Component
		    		match={match}
		      		setIsInGame={setIsInGame}
		    	 />
		    } />;
		else
		    return <Route key={name} path={path} element={
		    	<Component/>
		    } />;

	  });

    return (
<div className={`page-app ${isMenuOpen ? "slide-right" : "slide-left"}`}>

	<Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}
		className="side-menu"
		appRoutes={appRoutes}
	/>
	<FloatingButton onClick={toggleMenu} className="ui-bubble"/>

	<div className="page-container">
	<Routes>
		{appRoutesComponent}
	</Routes>
	</div>
	<div className="page-game-menu side-menu">
		{/* < InfoBubble /> */}
		{isInGame ? <div className="chat">Playing</div> : <div className="multiplayer">NOT Playing</div>
		// <MultiplayerMenu /> :
		// <ChatMenu />
		}
	</div>
	
</div>

	)

};
export default App;
