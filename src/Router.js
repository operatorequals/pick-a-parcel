import { Route, Routes } from "react-router-dom";

import { HowToPlay } from './components/pages/HowToPlay';
import { Tutorial } from './components/pages/Tutorial';
import { Main } from './components/pages/Main';
import { Game } from './components/pages/Game';

export const appRoutes = [
	{
		"name": "home",
		"component": Main,
		"path": "/",
		"order": 1,
	},
	{	"name": "game",
		"component": Game,
		"path": "/game",
	},
	{	"name": "instructions",
		"component": HowToPlay,
		"path": "/how-to-play",
		"order": 2,
	},
	{	"name": "tutorial",
		"component": Tutorial,
		"path": "/tutorial",
		"order": 3,
	},
	{	"name": "about",
		"component": ()=><div>About Page!</div>,
		"path": "/about",
		"order": 4,
	},
]

export const appRoutesMap =  Object.assign({}, ...(appRoutes.map(item => ({ [item.name]: {...item} }) )));

