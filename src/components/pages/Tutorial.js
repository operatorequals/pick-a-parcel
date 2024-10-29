import {useRef, useState, useEffect, Children} from 'react';
import { useParams } from 'react-router-dom';

import { EffectsBoardWrapper } from 'bgio-effects/react';

import { Card } from '../game/Card';
import { DemoBoard } from '../game/Board';

import { state_1_2 } from './tutorial-states/section-1';
import { state_3_1, state_3_2 } from './tutorial-states/section-3';

import { useVisibleComponents } from '../../hooks/useVisibleComponents';

import "./HowToPlay.css"
import "./Tutorial.css"

import "../game/Board.css"

const TrackableBubbleUI = ({id, children, refs}) => {
	if (TrackableBubbleUI.idCounter === undefined) TrackableBubbleUI.idCounter = 0
	if (TrackableBubbleUI.idPrefix === undefined) TrackableBubbleUI.idPrefix = null
	console.log(TrackableBubbleUI.idCounter, id, children)
	if (id===undefined) id = TrackableBubbleUI.idCounter++
	else {
		TrackableBubbleUI.idCounter = 0
		TrackableBubbleUI.idPrefix = id
	}
	const finalID = `${TrackableBubbleUI.idPrefix}-${TrackableBubbleUI.idCounter}`
	return <div className={`ui-bubble ${!TrackableBubbleUI.idCounter ? "section-start" : ""}`}
		id={`${finalID}`} ref={(el) => (refs.current[finalID] = el)}>
		{children}
	</div>
};

export const Tutorial = ({}) => {

	const [refs, visibleComponents] = useVisibleComponents({ threshold: 0.8 });
	const isIdVisible = (id) => visibleComponents.some(el=>el.id===id)
	const isFirstVisibleID = (id) => ((visibleComponents.length > 0) ? visibleComponents[0].id===id : false)

	const jsx = (
<div className="page-tutorial">
	
	<div className="tutorial-container-text" id="sections" >
		<TrackableBubbleUI id="section-1" refs={refs} >
This is a Robot.
A Warehouse Robot to be precise.
		</TrackableBubbleUI>
		
		<TrackableBubbleUI refs={refs} >
The Robot lives on a square.			
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
That Square is on a Board.
		</TrackableBubbleUI>

		<TrackableBubbleUI id="section-2" refs={refs} >
Ok, now, here is a Card.
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
Here is another card.
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
There are 2 kinds of cards.
<code>function</code> cards and
<code>parameter</code> cards.
More on these in a bit...
		</TrackableBubbleUI>

		<TrackableBubbleUI id="section-3" refs={refs} >
Back to the Robot!
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
The robot has to take a Parcel
which is on the board "p".
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
And get it to the Destination ("g" - Goal).
		</TrackableBubbleUI>
	</div>
	{/* isIdVisible */}

	<div className="tutorial-container-interactive-wrapper">
		<div className="tutorial-container-interactive">
			<div className="tutorial-container-interactive-center">

			{ isFirstVisibleID("section-1-0") &&
				<img src="./pick-a-parcel/assets/robot.png" alt="robot"
					className="tutorial-container-interactive-robot"
					/>
			}
			{ isFirstVisibleID("section-1-1") &&
				<div className="board-cell player"
					style={{
						height: "10em",
						width: "10em",
						backgroundSize: "10em",
						}}
				/>
			}
			{ isFirstVisibleID("section-1-2") &&
				<DemoBoard players={state_1_2.players} positions={state_1_2.positions}/>
			}

			{ isFirstVisibleID("section-2-0") &&
				<Card type="action" value="move" face="up" animate={true}/>
			}
			{ isFirstVisibleID("section-2-1") &&
				<Card type="direction" value="up" face="up" animate={true}/>
			}
			{ isFirstVisibleID("section-2-2") &&
			<div>
				<Card type="action" value="move" face="up" animate={true}/>
				<Card type="direction" value="up" face="up" animate={true}/>
			</div>
			}

			{ isFirstVisibleID("section-3-0") &&
				<DemoBoard players={state_1_2.players} positions={state_1_2.positions}/>
			}
			{ isFirstVisibleID("section-3-1") &&
				<DemoBoard players={state_3_1.players} positions={state_3_1.positions}/>
			}
			{ isFirstVisibleID("section-3-2") &&
				<DemoBoard players={state_3_2.players} positions={state_3_2.positions}/>
			}

			</div>
		</div>
	</div>
</div>
	);
	console.log(visibleComponents)
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

---

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