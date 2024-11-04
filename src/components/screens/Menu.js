import { useState } from 'react';

import { homeIFrameName } from '../../WebAppConstants'

import './Menu.css'
import '../pages/ui.css'


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
	<a href={url} target={target}>
		<span className={hover ? "ui-menu-ref-no-comment" : "ui-menu-ref-comment"} >{hover ? "" : "/*"} {name} {hover ? "" : "*/"}</span>
	</a>
</div>
	)
}

export const Menu = ({ isOpen, onClose, iFrameName, className, initialTab}) => {
	iFrameName = iFrameName !== undefined ? iFrameName : homeIFrameName
	return (
<div className={`ui-bubble ui-menu menu-slide ${isOpen ? 'menu-slide-open' : ''} ${className !== undefined ? className : ""}`}>
	<div className="ui-menu-title">
		<h4>Pick-A-Parcel</h4>
	</div>
	<div className="ui-menu-refs">
		<span className="code-syntax-function">go<span className="code-syntax-parenthesis">(</span></span>
			<MenuItem name="Home" url="#/game" iFrameName={iFrameName} />
			<MenuItem name="Tutorial" url="/#/tutorial" />
			<MenuItem name="Instruction" url="/#/how-to-play" iFrameName={iFrameName} />
			<MenuItem name="About" url="#" iFrameName={iFrameName} />

		<span className="code-syntax-parenthesis">)<span className="code-syntax-semicolon">;</span></span>
	</div>
	<div onClick={onClose} className="menu-slide-btn-close">
		<span className="code-syntax-function">play</span><span className="code-syntax-parenthesis">()</span><span className="code-syntax-semicolon">;</span>
	</div>
</div>
	);
}
