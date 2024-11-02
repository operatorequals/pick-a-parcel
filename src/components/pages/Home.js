import { useState } from "react";

import { homeIFrameName } from '../../WebAppConstants'

import './Home.css'
import './ui.css'

// https://www.freecodecamp.org/news/react-router-cheatsheet/

import { Menu } from '../screens/Menu'

export const Home = ({}) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

	return (
<div className="page-home">
	<Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} iFrameName={homeIFrameName} />

	<div className="iframe-container">
		<iframe name={homeIFrameName} />
	</div>
	<div className="page-game-menu game-menu">
		<div className="ui-bubble" styles={{margin: "auto"}}>Hello</div>
		<div className="ui-bubble" onClick={()=>{toggleMenu()}}>MENUUU</div>
	</div>
	
</div>

	);
}