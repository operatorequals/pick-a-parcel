import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer'; // gonna get network
import { Playfield } from './components/Playfield';

import { EffectsBoardWrapper } from 'bgio-effects/react';

import { PickAParcel } from './Game';

const PickAParcelClient = Client({
	game: PickAParcel,
	multiplayer: Local(),	

	board: EffectsBoardWrapper(Playfield, {
  // Delay passing the updated boardgame.io state to your board
  // until after the last effect has been triggered.
  // Default: false
	  updateStateAfterEffects: true,

  // Global control of the speed of effect playback.
  // Default: 1
	  speed: 1,
	}),
});

const App = () => (
    <PickAParcelClient playerID="0" />
);
export default App;
