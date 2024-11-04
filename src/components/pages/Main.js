import { useState } from "react";

import { homeIFrameName } from '../../WebAppConstants'
import { getMatchURL, WebAppURLs } from '../../WebAppConstants'

import './Main.css'
import './ui.css'


// https://www.freecodecamp.org/news/react-router-cheatsheet/

import { Menu } from '../screens/Menu'
import { InfoBubble } from '../screens/InfoBubble'
import { FloatingButton } from '../screens/FloatingButton'


const MultiplayerMenu = ({}) => {
	return <div>
	<div className="ui-bubble" styles={{margin: "auto"}}>Hello</div>
	</div>
}

const ChatMenu = ({}) => {
	return <div className="chat-menu">Now Playing</div>
}

export const Main = ({match, isInGame}) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    console.log("Main component: isInGame", isInGame)
    const iframeURL = match.matchID ?
				getMatchURL(match.matchID, match.isHost, true) :
				WebAppURLs.game
    // If inGame set the iframe to the game URL
	return (
<div className={`page-main ${isMenuOpen ? "slide-right" : "slide-left"}`}>

	<Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}
		iFrameName={homeIFrameName}
		className="page-menu"
		initialTab={iframeURL}
	/>

	<div className="page-container">
		<FloatingButton onClick={toggleMenu} className="ui-bubble"/>
		<iframe name={homeIFrameName}
			src={iframeURL}
		/>
	</div>
	<div className="page-game-menu game-menu">
		{/* < InfoBubble /> */}
		{!isInGame ? 
		<MultiplayerMenu /> :
		<ChatMenu />
		}
	</div>
	
</div>

	);
}