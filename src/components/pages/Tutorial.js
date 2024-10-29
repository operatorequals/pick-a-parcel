import {useRef, useState, Children} from 'react';
import { useParams } from 'react-router-dom';

import { Card } from '../game/Card';

import { useVisibility } from '../../hooks/useVisibility';

import "./HowToPlay.css"
import "./Tutorial.css"

import "../game/Board.css"

const useInputs = n => [...Array(n)].map((_, i) => useState('name' + i));

export const Tutorial = ({}) => {

	let refs = {}
	let inverseRefs = {}

	// const s1 = useRef(null)
	// const isVisible = useVisibility(s1, { threshold: 0.8 });
	// console.log(s1, isVisible)


	const jsx = (
<div className="page">
	
	<div className="tutorial-container-text" id="sections" >
		<div className="ui-bubble" id="section-1" ref={useRef(null)} onScroll={(e)=>{console.log(e)}}>
This is a Robot. A Warehouse Robot.			
		</div>

		<div className="ui-bubble">
The Robot lives on a square.			
		</div>

		<div className="ui-bubble">
The Square is on the Board.
		</div>

		<div className="ui-bubble" id="section-2" ref={useRef(null)} onScroll={(e)=>{console.log(e)}}>
Ok, now, here is a Card.
Here is another card.
		</div>

		<div className="ui-bubble">
This is a card of type function
and this is a "parameter" card.
More on these in a bit...
		</div>

		<div className="ui-bubble" id="section-3"  ref={useRef(null)}>
Back to the Robot!
The robot has to take a Parcel
which is on the board.
		</div>

		<div className="ui-bubble" onScroll={(e)=>{console.log(e)}}>
And get it to the Destination
		</div>
	</div>
	

	<div className="tutorial-container-interactive-wrapper">
		<div className="tutorial-container-interactive">
			<Card />
			<div>
			<div className="board-cell" />
			</div>
		</div>
	</div>

</div>
	);

	for (const pElem of Children.toArray(jsx.props.children)){
		if (pElem.props.children.length === 0) continue
		for (const elem of Children.toArray(pElem.props.children)){
			if (elem.props.id === undefined) continue
			if (elem.props.id.startsWith("section-"))
				refs[elem.props.id] = {
					'ref': elem.ref,
					'visible': false,
				}
				inverseRefs[elem.ref] = elem.props.id
		}
	}

	// for (const id of Object.keys(refs))
	// 	// // eslint-disable-next-line react-hooks/rules-of-hooks
	// 	refs[id].visible = useVisibility(refs[id].ref, { threshold: 0.1 })
// 

	const [visibilities, setVisibilities] = useState(refs);
	const setVisibility = (i, v) => {
		setInputs(Object.assign({...visibilities}, { [i]: v }));
	};
	for (const id of Object.keys(refs))
		// // eslint-disable-next-line react-hooks/rules-of-hooks
		refs[id].visible = setVisibilities(id, useVisibility(refs[id].ref, { threshold: 0.1 }))


	console.log(refs)

	return jsx;
}
/*
This is a Robot. A Warehouse Robot.
The Robot lives on a square.
The Square is on the Board.

Ok, now, here is a Card.
Here is another card.
This is a card of type function
and this is a "parameter" card.
More on these in a bit

Back to the Robot!
The robot has to take the Parcel
which is on the board.
And get it to the Destination
But, robots can't move by themselves
they need to be programmed.
With code.
And here is where the cards come!

A Move function, along an "up" parameter,
make the robot go up.

Go on the parcel to take it.

A steal function, nullifies its parameter.
If a packet is around, the steal card will steal it
(A parameter is still needed though, to not cause a syntax error)

A throw function, hurls the packet in the parameter's way.
throw + left, packet is send to the left. Until it reaches a wall, the goal, or another player.

---

Easy enough, but, here is another robot.
This is an opponent.

It wants to also pick the parcel.

And whichever sends it to the destination - wins
It's a Warehouse battle.

Here is how to fight:

You get 8 cards.
The opponent does too.

You put cards in your "program"
The opponent does too.

Remember. a Program has always an even number of cards.
a function first, and a parameter after.

When finished structuring your program, hit "Run script".

When all players do, the programs are executed.

Functions are run, along their parameters, in a Round-Robin way.

At that time, you have no control. Things just play-out...


*/