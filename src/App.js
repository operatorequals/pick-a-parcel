import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { InfoBubble } from './components/screens/InfoBubble';
import { Menu } from './components/screens/Menu';
import { FloatingButton } from './components/screens/FloatingButton';
import { GameDialog } from './components/screens/GameDialog';
import { Matchmaking } from './components/matchmaking/Matchmaking';

import { generateMatchID } from './WebAppConstants';

import { useOrientation } from './hooks/useOrientation';

import { appRoutes, appRoutesMap } from './Router';

import './App.css'

const App = () => {
	const [isInGame, setIsInGame] = useState(false)
    const orientation = useOrientation() ? "portrait" : "landscape";
    const isMobile = orientation === 'portrait'

	const jumpedToGame = useRef(false); // This ref will track whether the effect has run

	const location = useLocation()
	const params = new URLSearchParams(location.search)

    const [match, setMatch] = useState({
    	matchID: params.has('matchID') ? params.get('matchID') : generateMatchID(),
    	isHost: params.has('isHost') ? (params.get('isHost') === 'true') : true,
    	});

    const [isMenuOpen, setIsMenuOpen] = useState(isMobile ? 1 : 0);
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
	if (isMobile){
		if (isMenuOpen === 0)
			menuClass = "slide-left-2" // menu
		else if (isMenuOpen === 1)
			menuClass = "slide-right" // main
		else if (isMenuOpen === 2)
			menuClass = "slide-left" // matchmaking
	}

	// Jump to game 
	useEffect(() => {
		if (!isMobile) return;
		if (jumpedToGame.current) return;
		if (isInGame){
			setIsMenuOpen(1)
			jumpedToGame.current = true;
		} else
			jumpedToGame.current = false;
		console.log(jumpedToGame.current, menuClass, isInGame)
	}, [isInGame, jumpedToGame, setIsMenuOpen]);


    return (
<div className={
	`page-app ${menuClass}`}>

	<Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}
		appRoutes={appRoutes}
		isInGame={isInGame}
		match={match}
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
			<GameDialog
				setMatch={setMatch}
				match={match}
				setIsInGame={setIsInGame}
			/> :
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
