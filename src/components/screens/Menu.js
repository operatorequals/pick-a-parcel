import { useState } from 'react';
import { NavLink } from "react-router-dom";

import { getMatchURL } from '../../WebAppConstants';

import './Menu.css'
import '../pages/ui.css'

const capitalize = s => s && String(s[0]).toUpperCase() + String(s).slice(1)

const MenuItem = ({name, url, iFrameName}) => {

	const [hover, setHover] = useState(false)
	const target = iFrameName !== undefined ? iFrameName : "_blank"
	return (
<div className="ui-menu-ref"
	onMouseEnter={() => setHover(true)}
	onMouseLeave={() => setHover(false)}
	onTouchStart={() => setHover(true)}
	onTouchEnd={() => setHover(false)}
	>
	<NavLink to={url}
		// target={target}
		>
		<span className={hover ? "ui-menu-ref-no-comment" : "ui-menu-ref-comment"} >{hover ? "" : "/*"} {name} {hover ? "" : "*/"}</span>
	</NavLink>
</div>
	)
}

export const Menu = ({ isOpen, onClose, className, appRoutes, isInGame, match}) => {
	const matchUrl = getMatchURL(
		match.matchID,
		match.isHost // we are Host - share URL for a client
	)

	return (
<div className={`ui-bubble ui-menu menu-slide ${isOpen ? 'menu-slide-open' : ''} ${className !== undefined ? className : ""}`}>
	<div className="ui-menu-title">
		<h4>Pick-A-Parcel</h4>
	</div>

	<div className="ui-menu-refs">
		<span className="code-syntax-function">go<span className="code-syntax-parenthesis">(</span></span>
			{
				appRoutes.map(({ path, name, order }) => {
					if (order === undefined) return
					return <MenuItem name={capitalize(name)} key={name} url={path} />
				})
			}

		<span className="code-syntax-parenthesis">)<span className="code-syntax-semicolon">;</span></span>
	</div>
	
	{/* Make it so play can have in parenthesis if someone has joined */}
	{/* and also get you to /game page */}

	<div onClick={()=>{
				window.location=matchUrl;
				onClose();
			}
		} className="menu-slide-btn-close"> 
		<span className="code-syntax-function">play</span><span className="code-syntax-parenthesis">(
			<span className="code-syntax-parameter">{isInGame ? "game" : ""}</span>
			)</span><span className="code-syntax-semicolon">;</span>
	</div>
</div>
	);
}
