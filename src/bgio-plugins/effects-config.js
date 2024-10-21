// https://delucis.github.io/bgio-effects/plugin/config/
import { current } from 'immer';

export const config = {

  effects: {
  	postExecute: {

	    create: (arg) => ({ ...arg, }), // the cards executed
  		duration: 2,
  	},

	preExecute: {
		create: (arg) => ({ ...arg, }),
  		duration: 1.5,
	},
  }
}