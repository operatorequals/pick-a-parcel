import { Route, Routes } from "react-router-dom";

import { HowToPlay } from './components/pages/HowToPlay';
import { Tutorial } from './components/pages/Tutorial';
import { Main } from './components/pages/Main';
import { Game } from './components/pages/Game';

export const appRoutes = [
	{
		"name": "base",
		"component": Main,
		"path": "/",
	},
	{	"name": "game",
		"component": Game,
		"path": "/game",
	},
	{	"name": "instructions",
		"component": HowToPlay,
		"path": "/how-to-play",
	},
	{	"name": "tutorial",
		"component": Tutorial,
		"path": "/tutorial",
	},
]

export const appRoutesMap =  Object.assign({}, ...(appRoutes.map(item => ({ [item.name]: {...item} }) )));

