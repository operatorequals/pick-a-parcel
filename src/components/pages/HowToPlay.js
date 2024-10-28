import './HowToPlay.css';

export const HowToPlay = ({}) => {

	return (

<div className="page">
	<div className="ui-bubble">

<h2 class="atx" id="the-setting">The Setting</h2>
<p>You are a programmer. And you are programming <em>Robots</em>! <em>Warehouse Robots</em>, that is.</p>
<p>Your job is to instruct robots, so they collect <em>Parcels</em> through the <em>Warehouse</em> and deliver them to their <em>Destination</em>.</p>
	</div>
	<div className="ui-bubble">
<h2 class="atx" id="whatand39s-in-the-box">What's in the Box?</h2>
<ul>
<li><p>A <em>Deck</em> of cards for <em>Functions</em></p>
<ul>
<li>Contains <code>move()</code>, <code>steal()</code> and <code>throw()</code> <em>Cards</em>.</li>
</ul>
</li>
<li><p>A <em>Deck</em> of cards for <em>Parameters</em></p>
<ul>
<li>Contains <code>"up"</code>, <code>"down"</code> <code>"left"</code> and <code>"right"</code> Cards.</li>
</ul>
</li>
<li><p>A NxN <em>Board</em> (the <em>Warehouse</em>)</p>
</li>
<li><p><em>Robot</em> Avatars of different colors</p>
</li>
<li><p>One <em>Parcel</em> and one <em>Destination</em> Avatar</p>
</li>
<li><p>(A Pair of N-sided <em>Dice</em>?)</p>
</li>
</ul>
</div>
<div className="ui-bubble">
<h2 class="atx" id="how-to-play">How to play</h2>
<h3 class="atx" id="the-setup">The Setup</h3>
<ol>
<li><p>Each player chooses a <em>Robot</em></p>
</li>
<li><p>Each player rolls the <em>Dice</em> and uses the outcome as coordinates to place the <em>Robot</em> on the <em>Board</em>. Which outcome will be used as the vertical (Y) or horizontal (X) coordinate is a decision left to the player</p>
</li>
<li><p>A player rolls the dice 2 more times, for the <em>Parcel</em> and the <em>Destination</em>. The dice are rolled one-by-one, declaring the coordinate assigned to each roll beforehand.</p>
</li>
</ol>
<p>The <em>Dice</em> are not used in the game. They only serve as a source of randomness for game initialization.</p>
<h5 class="atx" id="robots-the-parcel-and-the-destination-cannot-be-placed-on-a-non-vacant-position-in-case-this-occurs-a-re-roll-is-done"><em>Robots</em>, the <em>Parcel</em> and the <em>Destination</em> cannot be placed on a non-vacant position. In case this occurs, a re-roll is done.</h5>
<h3 class="atx" id="a-turn">A Turn</h3>
<h4 class="atx" id="phase-1-create-your-program">Phase 1: Create your Program</h4>
<ol>
<li><p>Each player draws cards from the <em>Decks</em> ("<em>Parameters</em>" and "<em>Functions</em>") until they have 4 from each (a sum of 8 cards), to form their <em>Hand</em>.</p>
</li>
<li><p>Players asynchronously create their <em>Program</em> from their <em>Hand</em>, and leave it face-down, until everyone is finished.</p>
</li>
<li><p>When everyone is finished creating their <em>Program</em>, the <em>Program</em>s are executed.</p>
</li>
</ol>
<h4 class="atx" id="phase-2-execution">Phase 2: Execution</h4>
<ol>
<li><p>The player that goes first reveals the first 2 cards of their <em>Program</em> (they have to be a <em>Function Card</em> and a <em>Parameter Card</em> - see <em>How to create Your Robot's Program</em>).</p>
</li>
<li><p>The player controls their <em>Robot</em> according to the revealed cards, see <em>Executing your Program</em>.</p>
</li>
<li><p>The next player that has remaining cards in their <em>Program</em>, starts Execution.</p>
</li>
</ol>
<p>Continue until no Player has remaining cards in their <em>Program</em>. When this happens, all players go back to <em>Phase 1</em>.</p>
</div>
<div className="ui-bubble">
<h2 class="atx" id="the-objective---win-lose-and-draw">The Objective - win, lose and draw</h2>
<p>The Objective of the game is picking up the <em>Parcel</em> and somehow getting it to the <em>Destination</em> square of the <em>Board</em>.</p>
<p>The game is <strong><em>finished immediately</em></strong> if a Player wins. A player can win in 3 ways:</p>
<ol>
<li><p>The player's <em>Robot</em> holds the <em>Parcel</em> and moves to the <em>Destination</em> square (using a <code>move()</code> card)</p>
</li>
<li><p>The player's <em>Robot</em> holds the <em>Parcel</em> and throws it to the <em>Destination</em> square (using a <code>throw()</code> card)</p>
</li>
<li><p>The <em>Decks</em> run out before all player draw 4 <em>Function</em> and 4 <em>Parameter Cards</em>, and the player's <em>Robot</em> holds the <em>Parcel</em>.</p>
</li>
</ol>
<p>If a player wins all other player's automatically lose. If the <em>Decks</em> run out and no <em>Robot</em> is holding the <em>Parcel</em>, the game is concluded as a Draw.</p>
<h4 class="atx" id="a-point-system">A Point System</h4>
<p>It is possible to assign and accumulate <em>Points</em> for multi-round games. In this case, a suggested <em>Point</em> system is as follows:</p>
<p>Draws and Loses add 0 Points to player Scores.</p>
<p>If a player wins the <em>Points</em> added to their <em>Score</em> depend on the method of winning. In this cases:</p>
<ul>
<li><p>Method 1: 10 <em>Points</em></p>
</li>
<li><p>Method 2: 8 <em>Points</em></p>
</li>
<li><p>Method 3: 5 <em>Points</em></p>
</li>
</ul>
<p>This system creates extra motivation to risk moves, and not just wait for the <em>Decks</em> to run out while holding the <em>Parcel</em>.</p>
<hr/>
</div>
<div className="ui-bubble">
<h2 class="atx" id="how-to-create-your-robotand39s-program">How to create your <em>Robot's Program</em></h2>
<p>A <em>Program</em> is a set of (initialy face down) cards, organized in pairs. Each pair of cards must contain exactly one <em>Function</em> and one <em>Parameter</em> Card. The order of the Card pairs is important, as they are only executed in the chosen order.</p>
<p>Example <em>Program</em> with 6 Cards:</p>
<pre><code class="fenced-code-block">move() - "up" | steal() - "down" | throw() - "right"</code></pre>
<p>Given the above, a <em>Program</em> can only contain an even number of <em>Cards</em>, and always in the <em>Function</em> - <em>Parameter</em> ( - <em>Function</em> - <em>Parameter</em>..., etc) format.</p>
<p>A <em>Program</em> can contain <code>0</code> <em>Cards</em>. In that case, the player skips the <em>Execution Phase</em> entirely.</p>
</div>
<div className="ui-bubble">
<h2 class="atx" id="executing-your-program">Executing your Program</h2>
<p>The player reveals the next pair of Cards from their Program. The Cards have to be a Function and a Parameter card (see <em>How to create your Robot's Program</em>).</p>
<h3 class="atx" id="move"><code>move()</code></h3>
<p>If the <em>Function Card</em> is a <code>move()</code> card, the Robot tries to <strong>move to the direction shown by the <em>Parameter Card</em></strong>, to an adjacent square.</p>
<ul>
<li><p>If the <em>Robot</em> tries to <strong><em>move outside the Board</em></strong>, the move is not executed -<code>nop</code>.</p>
</li>
<li><p>If <strong><em>another Robot</em></strong> is on the adjacent square, the move is not executed - <code>nop</code>.</p>
</li>
<li><p>If the adjacent square contains the <em>Parcel</em>, the <em>Robot</em> moves to the square and <strong><em>picks up the Parcel</em></strong>.</p>
</li>
<li><p>If the adjacent square is the destination:</p>
<ul>
<li><p>If the <strong><em>Robot holds the Parcel</em></strong> - the player <strong>wins</strong> the round!</p>
</li>
<li><p>If the <strong><em>Robot</em> does not hold the <em>Parcel</em></strong>, the move is not executed - <code>nop</code>.</p>
</li>
</ul>
</li>
</ul>
<h3 class="atx" id="steal"><code>steal()</code></h3>
<p>If the <em>Function Card</em> is a <code>steal()</code> card, the <strong><em>Parameter</em> Card is not taken into account</strong>.</p>
<ul>
<li><p>If the player's <strong><em>Robot</em> is holding the <em>Parcel</em></strong>, the move is not executed - <code>nop</code>.</p>
</li>
<li><p>If the player's <strong><em>Robot</em> does not hold the <em>Parcel</em></strong></p>
<ul>
<li><p>If the <em>Parcel</em> or another <em>Robot</em> holding <strong>the <em>Parcel</em> is placed in an adjacent square</strong> (non-diagonal) - <strong>the player's <em>Robot</em> takes the <em>Parcel</em></strong>.</p>
</li>
<li><p>Else, the move is not executed - <code>nop</code>.</p>
</li>
</ul>
</li>
</ul>
<h3 class="atx" id="throw"><code>throw()</code></h3>
<p>If the <em>Function Card</em> is a <code>throw()</code> card, the player's <em>Robot</em> loses the <em>Parcel</em> and <strong>throws it to the direction shown by the <em>Parameter Card</em></strong>, travelling as far as it can go.</p>
<ul>
<li><p>If the player's <em>Robot</em> <strong>does not hold the <em>Parcel</em></strong>, the move is not executed - <code>nop</code>.</p>
</li>
<li><p>If the player's <strong><em>Robot</em> holds the <em>Parcel</em></strong>, the <em>Parcel</em> travels to the direction designated by the <em>Parameter Card</em></p>
<ul>
<li><p>If the <em>Parcel</em> travels <strong>towards the <em>Board</em>'s boundary</strong>, it stops in the <strong>last square of the <em>Board</em> towards the direction</strong> of the <em>Parameter Card</em>.</p>
</li>
<li><p>If the <em>Parcel</em> travels <strong>towards another player's <em>Robot</em></strong>, that <strong><em>Robot</em> gets to hold the <em>Parcel</em></strong>.</p>
</li>
</ul>
<ul>
<li><p>If the <em>Parcel</em> travels <strong>towards the <em>Destination</em></strong>, the player <strong>wins</strong> the round!</p>
</li>
</ul>
</li>
</ul>

	</div>
</div>

	);

}