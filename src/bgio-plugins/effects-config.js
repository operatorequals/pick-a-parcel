// https://delucis.github.io/bgio-effects/plugin/config/
import { current } from 'immer';

export const config = {

  effects: {
  	postExecute: {
	    create: (arg) => ({ ...arg, }),
  		duration: 2,
  	},

  	preExecute: {
  		create: (arg) => ({ ...arg, }),
    		duration: 1,
  	},

    endGame: {
      create: (arg) => ({ ...arg, }),
    },

    prePlayout: {},

    postPlayout: {},

    preTurn: {},

  }


}