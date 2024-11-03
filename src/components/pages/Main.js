import { useState } from "react";

import { homeIFrameName } from '../../WebAppConstants'
import { getMatchURL } from '../../WebAppConstants'

import './Main.css'
import './ui.css'


// https://www.freecodecamp.org/news/react-router-cheatsheet/

import { Menu } from '../screens/Menu'
import { FloatingButton } from '../screens/FloatingButton'


const MultiplayerMenu = ({}) => {
	return <div>
	<div className="ui-bubble" styles={{margin: "auto"}}>Hello</div>
	</div>
}

const ChatMenu = ({}) => {
	return <div className="chat-menu"></div>
}

export const Main = ({matchID, isHost}) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [inGame, setInGame] = useState({matchID: matchID, isHost:isHost});

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    // If inGame set the iframe to the game URL
	return (
<div className={`page-main ${isMenuOpen ? "slide-right" : "slide-left"}`}>
	<Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} iFrameName={homeIFrameName}
		className="page-menu"/>

	<div className="page-container">
		<FloatingButton onClick={toggleMenu} className="ui-bubble"/>
		<iframe name={homeIFrameName}
			src={inGame.matchID ? getMatchURL(inGame.matchID, inGame.isHost, true) : "#"}
		/>
	</div>
	<div className="page-game-menu game-menu">
		<MultiplayerMenu />
	</div>
	
</div>

	);
}