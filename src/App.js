import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { InfoBubble } from './components/screens/InfoBubble';
import { Menu } from './components/screens/Menu';
import { FloatingButton } from './components/screens/FloatingButton';

import { Matchmaking } from './components/matchmaking/Matchmaking';

import { HowToPlay } from './components/pages/HowToPlay';
import { Tutorial } from './components/pages/Tutorial';
import { Main } from './components/pages/Main';
import { Game } from './components/pages/Game';

import { generateMatchID } from './WebAppConstants';

import { useOrientation } from './hooks/useOrientation';

import { appRoutes, appRoutesMap } from './Router';

import './App.css'

const App = () => {
	const [isInGame, setIsInGame] = useState(false)
    const orientation = useOrientation() ? "portrait" : "landscape";
    const isMobile = orientation === 'portrait'

	const location = useLocation()
	const params = new URLSearchParams(location.search)

    const [match, setMatch] = useState({
    	matchID: params.has('matchID') ? params.get('matchID') : generateMatchID(),
    	isHost: params.has('isHost') ? (params.get('isHost') === 'true') : true,
    	});

    const [isMenuOpen, setIsMenuOpen] = useState(0);
    const toggleMenu = () => setIsMenuOpen(prev => {
    	// On desktop toggles 0 to 1, in mobile takes 0, 1, 2 values
    	return prev < (isMobile ? 2 : 1) ? ++prev : 0
    });

	const appRoutesComponent = appRoutes.map(({ path, name, component }) => {
		const Component = component
		if (name === "game")
		    return <Route key={name} path={path} element={
		    	<Component
		    		match={match}
		      		setIsInGame={setIsInGame}
		      		orientation={orientation}
		    	 />
		    } />;
		else
		    return <Route key={name} path={path} element={
		    	<Component/>
		    } />;
	  });

	let menuClass = isMenuOpen ? "slide-right" : "slide-left"	
	if (isMobile)
		if (isMenuOpen === 0)
			menuClass = "slide-right"
		if (isMenuOpen === 1)
			menuClass = "slide-left"
		if (isMenuOpen === 2)
			menuClass = "slide-left-2"

    return (
<div className={
	`page-app ${menuClass}`}>

	<Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}
		appRoutes={appRoutes}
		isInGame={isInGame}
		className="side-menu"
	/>
	<FloatingButton onClick={toggleMenu} className="ui-bubble"/>

	<div className="page-container">
	<Routes>
		{appRoutesComponent}
	</Routes>
	</div>
	<div className="game-menu side-menu">
		{/* < InfoBubble /> */}
		{isInGame ?
			<div className="chat">
				Your MatchID: {match.matchID}
				You are {match.isHost ? "" : "NOT"} the host
				<div 
					onClick={
						()=>{
							setMatch({});
							setIsInGame(false);
						}
					}>Stop Match</div>
			</div> :
			<Matchmaking
				setMatch={setMatch}
				match={match}
			/>
		}
	</div>
	
</div>

	)

};
export default App;
