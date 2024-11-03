export const matchIDPrefix = '';
// export const matchIDPrefix = 'pick-a-parcel-';

export const maxMatchID = 10000;
export const generateMatchID = () => matchIDPrefix+(Math.round(Math.random() * maxMatchID)).toString();

export const testingMultiplayer = true

export const hashRouting = true;

const baseUrl = (process.env.PUBLIC_URL.startsWith("/") ?
	window.location.origin + process.env.PUBLIC_URL :
	process.env.PUBLIC_URL) + (hashRouting ? "/#" : "")

console.log(process.env.PUBLIC_URL, baseUrl)
export const urls = {
	"base": baseUrl,
	"game": baseUrl + "/game",
	"how-to-play": baseUrl + "/how-to-play",
	"tutorial": baseUrl + "/tutorial",
}

export const homeIFrameName = "iframe-home"

export const getMatchURL = (matchID, isHost, iframe=false) => {
	let params = new URLSearchParams()
	params.set('matchID', matchIDPrefix+matchID)
	params.set('isHost', isHost)
	const fullPath = window.location.origin + window.location.pathname

	if (iframe)
		return `${urls.game}?${params.toLocaleString()}`;
	else
		return `${urls.base}?${params.toLocaleString()}`;
}