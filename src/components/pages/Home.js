import { useState } from "react";

import { homeIFrameName } from '../../WebAppConstants'

import './Home.css'
import './ui.css'

// https://www.freecodecamp.org/news/react-router-cheatsheet/

import { Menu } from '../screens/Menu'
import { FloatingButton } from '../screens/FloatingButton'

export const Home = ({componentMap}) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

	return (
<div className={`page-home ${isMenuOpen ? "slide-right" : "slide-left"}`}>
	<Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} iFrameName={homeIFrameName}
		className="page-menu"/>

	<div className="page-container">
		<FloatingButton onClick={toggleMenu} className="ui-bubble"/>
		<iframe name={homeIFrameName} src="#"/>
	</div>
	<div className="page-game-menu game-menu">
		<div className="ui-bubble" styles={{margin: "auto"}}>Hello</div>
		<div className="ui-bubble" onClick={()=>{toggleMenu()}}>MENUUU</div>
	</div>
	
</div>

	);
}