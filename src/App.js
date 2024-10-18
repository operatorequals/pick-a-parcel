import { Client } from 'boardgame.io/react';
import { PickAParcel } from './Game';
import { Local } from 'boardgame.io/multiplayer'; // gonna get network
import { Playfield } from './components/Playfield';

const PickAParcelClient = Client({
	game: PickAParcel,
	board: Playfield,
	multiplayer: Local(),	
});

const App = () => (
  <div>
    <PickAParcelClient playerID="0" />
  </div>
);
export default App;
