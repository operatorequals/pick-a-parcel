// import './InfoBubble.module.scss'
import '../pages/ui.css'
import './InfoBubble.css'

import githubIcon from '../../assets/img/github.png';
import heartIcon from '../../assets/img/heart.png';

export const InfoBubble = ({style}) => {

	const publicUrl = process.env.PUBLIC_URL.startsWith("/") ? "https://operatorequals.github.io/pick-a-parcel" : process.env.PUBLIC_URL
	const githubUrl = "https://github.com/operatorequals/pick-a-parcel"
	const githubAuthorUrl = "https://github.com/operatorequals"
	const tutorialUrl = `${publicUrl}/#/tutorial`
	const instructionsUrl = `${publicUrl}/#/how-to-play`
	const appVersion = process.env.REACT_APP_VERSION; // populated through Makefile

	console.log(process.env)
	return (
<div className="ui-bubble info-bubble" style={style}>
	<div className="info-bubble-entry">
		<span className="ui-text info-bubble-span">
			Source Code:
			<a href={githubUrl} target="_blank">
				<img src={githubIcon} alt="on Github" className="info-bubble-icon"/>
			</a>
		</span>
	</div>
	<div className="info-bubble-entry">
		<span className="ui-text">Version</span>: <code>{appVersion}</code>
	</div>

	{/* <div className="info-bubble-entry" style={{justifyContent:"flex-end"}}> */}
	{/* 	<a href={tutorialUrl} target="_blank"> */}
	{/* 		<span className="ui-text">Interactive Tutorial</span> */}
	{/* 	</a> */}
	{/* </div> */}

	<div className="info-bubble-entry" style={{marginTop: "0.5em"}}>
		<span className="ui-alt-text info-bubble-span">
			Made with <img src={heartIcon} alt="&lt;3" className="info-bubble-icon"/> by <a href={githubAuthorUrl}>@operatorequals</a>
		</span>
	</div>
</div>
	)

}