import { Client } from 'boardgame.io/react';
import { PickAParcel } from './Game';

import { Board } from './components/Board';

const App = Client({
	game: PickAParcel,
	board: Board,
});

export default App;
