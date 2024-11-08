import { useState } from "react";

import { homeIFrameName } from '../../WebAppConstants'
import { getMatchURL, WebAppURLs } from '../../WebAppConstants'

import { InfoBubble } from '../screens/InfoBubble'

import './ui.css'

export const Home = ({}) => {

	return (
<div className={`page-home`}>
	<div className="ui-bubble">
		<h2>Welcome to Pick-A-Parcel</h2>
		<h3>A Boardgame about programming Warehouse Robots!</h3>
		<h4>Online Version</h4>
		Stay Tuned...
	</div>

	<InfoBubble style={{
		position: "absolute",
		right: "1em",
		bottom: "4em",
	}}/>

</div>
	);
}