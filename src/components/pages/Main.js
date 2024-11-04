import { useState } from "react";

import { homeIFrameName } from '../../WebAppConstants'
import { getMatchURL, WebAppURLs } from '../../WebAppConstants'

import './ui.css'

const MultiplayerMenu = ({}) => {
	return <div>
	<div className="ui-bubble" styles={{margin: "auto"}}>Hello</div>
	</div>
}

const ChatMenu = ({}) => {
	return <div className="chat-menu">Now Playing</div>
}

export const Main = ({}) => {

    // If inGame set the iframe to the game URL
	return (
<div className={`page-home`}>
This is gonna be the Homepage!
</div>
	);
}