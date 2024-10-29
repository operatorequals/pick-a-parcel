import {useRef, useState, useEffect, Children} from 'react';
import { useParams } from 'react-router-dom';

import { EffectsBoardWrapper } from 'bgio-effects/react';

import { Card } from '../game/Card';
import { Hand } from '../game/Hand';
import { DemoBoard } from '../game/Board';

import { state_1_2 } from './tutorial-states/section-1';
import { state_3_1, state_3_2 } from './tutorial-states/section-3';
import { state_5_0, state_5_1,
	state_5_2, state_5_3,
	state_5_4, state_5_5,
	state_5_7, state_5_8, state_5_9,
} from './tutorial-states/section-5';
import {
	state6
} from './tutorial-states/section-6';


import { useVisibleComponents } from '../../hooks/useVisibleComponents';

import "./ui.css"
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
<h2>This is a Robot</h2>
<h4>A Warehouse Robot to be precise...</h4>
		</TrackableBubbleUI>
		
		<TrackableBubbleUI refs={refs} >
The <em>Robot</em> lives on a square.			
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
That <em>Square</em> is on a <em>Board</em>.
		</TrackableBubbleUI>

		<TrackableBubbleUI id="section-2" refs={refs} >
Ok, now, here is also a <em>Card</em>.
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
Here is <em>another card</em>.
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
There are 2 kinds of cards: <code>function</code> cards and <code>parameter</code> cards.
More on these in a bit...
		</TrackableBubbleUI>

		<TrackableBubbleUI id="section-3" refs={refs} >
Back to the Robot!
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
The robot has to take a <em>Parcel </em> 
which is on the board "p".
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
And get it to the <em>Destination</em> ("g" - Goal).
		</TrackableBubbleUI>

		<TrackableBubbleUI id="section-4" refs={refs} >
But, robots <em>can't move by themselves </em>
they need to be programmed...
<br/>
With code...
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
And here is where the <em>cards come into play</em>!
		</TrackableBubbleUI>

		<TrackableBubbleUI id="section-5" refs={refs} >
A <code>move</code> function, along with an <code>"up"</code> parameter,
will tell the robot...
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
... to go <em>"up"</em>!
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
If the <em>Parcel</em> is one step ahead...
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
Running this code will <em>take it</em>!
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
If a <em>Packet</em> is around, the <code>steal</code> card will <em>steal</em> it!
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
<h3>Regardless of direction!</h3>
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
<span className="ui-alt2-text"> /* (A parameter is always needed, to not cause any syntax errors...) */ </span>
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
The <code>throw</code> function, hurls the packet in the direction of the <em>parameter</em>.
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
The packet travels until it reaches a <em>wall</em>, the <em>Destination</em>, or <em>another Player</em>.
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
If it reaches the <em>Destination</em> you win!
		</TrackableBubbleUI>

		<TrackableBubbleUI id="section-6" refs={refs} >
<h3>Easy enough...</h3>
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >
But, here is another robot.
<br/>
This is an opponent.
		</TrackableBubbleUI>

		<TrackableBubbleUI refs={refs} >

It also has to <em>Pick A Parcel</em>.
<br/>
And whichever sends it to the destination - wins!
<br/>
It's a Warehouse battle.
		</TrackableBubbleUI>

		<TrackableBubbleUI  id="section-7" refs={refs} >

{/* Here is how to fight: */}
<h2> Have Fun! </h2>
<br/>
Play a game <a href={process.env.PUBLIC_URL} target="_blank">here</a>!
		</TrackableBubbleUI>

	</div>

	<div className="tutorial-container-interactive-wrapper">
		<div className="tutorial-container-interactive">
			<div className="tutorial-container-interactive-center">

			{ isFirstVisibleID("section-1-0") &&
				<img src="./assets/robot.png" alt="robot"
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
				<Card type="action" value="move" face="up" animation={true}/>
			}
			{ isFirstVisibleID("section-2-1") &&
				<Card type="direction" value="up" face="up" animation={true}/>
			}
			{ isFirstVisibleID("section-2-2") &&
			<div className="card-holder">
				<Card type="action" value="move" face="up" animation={true}/>
				<Card type="direction" value="up" face="up" animation={true}/>
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
			{ isFirstVisibleID("section-4-0") &&
				<DemoBoard players={state_3_2.players} positions={state_3_2.positions}/>
			}
			{ isFirstVisibleID("section-4-1") &&
			<div className="card-holder">
				<Card type="direction" value="up" face="up" animation={true}/>
				<Card type="action" value="move" face="up" animation={true}/>
				<Card type="direction" value="down" face="up" animation={true}/>
				<Card type="action" value="steal" face="up" animation={true}/>
				<Card type="direction" value="left" face="up" animation={true}/>
				<Card type="action" value="throw" face="up" animation={true}/>
				<Card type="direction" value="right" face="up" animation={true}/>
			</div>
			}
			{ isFirstVisibleID("section-5-0") &&
			<div className="card-holder">
				<DemoBoard players={state_5_0.players} positions={state_5_0.positions}/>
				<Hand G={state_5_0} playerID={0} />
			</div>
			}
			{ isFirstVisibleID("section-5-1") &&
			<div className="card-holder">
				<DemoBoard players={state_5_1.players} positions={state_5_1.positions}/>
			</div>
			}
			{ isFirstVisibleID("section-5-2") &&
			<div className="card-holder">
				<DemoBoard players={state_5_2.players} positions={state_5_2.positions}/>
				<Hand G={state_5_2} playerID={0} />
			</div>
			}
			{ isFirstVisibleID("section-5-3") &&
			<div className="card-holder">
				<DemoBoard players={state_5_3.players} positions={state_5_3.positions}/>
				<Hand G={state_5_3} playerID={0} />
			</div>
			}
			{ isFirstVisibleID("section-5-4") &&
			<div className="card-holder">
				<DemoBoard players={state_5_4.players} positions={state_5_4.positions}/>
				<Hand G={state_5_4} playerID={0} />
			</div>
			}
			{ isFirstVisibleID("section-5-5") &&
			<div className="card-holder">
				<DemoBoard players={state_5_5.players} positions={state_5_5.positions}/>
				<Hand G={state_5_5} playerID={0} />
			</div>
			}
			{ isFirstVisibleID("section-5-6") &&
			<div className="card-holder">
				<Card type="action" value="steal" face="up" animation={true}/>
				<Card type="direction" value="up" face="up" animation={true}/>
			</div>
			}
			{ isFirstVisibleID("section-5-7") &&
			<div className="card-holder">
				<DemoBoard players={state_5_7.players} positions={state_5_7.positions}/>
				<Hand G={state_5_7} playerID={0} />
			</div>
			}
			{ isFirstVisibleID("section-5-8") &&
			<div className="card-holder">
				<DemoBoard players={state_5_8.players} positions={state_5_8.positions}/>
				<Hand G={state_5_8} playerID={0} />
			</div>
			}
			{ isFirstVisibleID("section-5-9") &&
			<div className="card-holder">
				<DemoBoard players={state_5_9.players} positions={state_5_9.positions}/>
				<Hand G={state_5_9} playerID={0} />
			</div>
			}
			{ isFirstVisibleID("section-6-0") &&
				<DemoBoard players={state_5_0.players} positions={state_5_0.positions}/>
			}
			{ isFirstVisibleID("section-6-1") &&
				<DemoBoard players={state6[1].players} positions={state6[1].positions}/>
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

---

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