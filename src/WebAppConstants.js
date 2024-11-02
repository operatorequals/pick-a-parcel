export const matchIDPrefix = '';
// export const matchIDPrefix = 'pick-a-parcel-';

export const maxMatchID = 10000;
export const generateMatchID = () => matchIDPrefix+(Math.round(Math.random() * maxMatchID)).toString();

export const testingMultiplayer = true

export const hashRouting = true;

const baseUrl = (process.env.PUBLIC_URL.startsWith("/") ?
	window.location.origin + process.env.PUBLIC_URL :
	process.env.PUBLIC_URL) + hashRouting ? "/#" : ""

// console.log(baseUrl)
export const urls = {
	"base": baseUrl,
	"how-to-play": baseUrl + "/how-to-play",
	"tutorial": baseUrl + "/tutorial",

}