const BackCard = (id, class_="card-back") => `
<div class="${class_}" id="card-back-${id}">
    <p class="card-back-text">pick(
    "parcel"
    <br/>
    );</p>
</div>
`

const FaceDownCard = (id, callback="") => `
    <div class="card" id="${id}" onclick=${callback}>
        ${BackCard(id, "card-front")}
    </div>
`

const FaceUpCard = (type, value, id, callback="") => {
    if (type == "action")
        return ActionCard(value, id, callback=callback);
    else if (type == "direction")
        return DirectionCard(value, id, callback=callback);

}
const ActionCard = (value, id, callback="") => `
    <div class="card" id="${id}" onclick=${callback}>
        <div class="card-front card-action">
            <h2><span class="card-value-action">${value}</span><span class="card-action-parenthesis">(
            	<br/>
            	<br/>
            )</span><span class="card-action-semicolon">;</span></h2>
            <p class="card-type"># function</p>
        </div>
        ${BackCard(id)}
    </div>
`;

const DirectionCard = (value, id, callback="") => {

	return `
    <div class="card" id="${id}" onclick=${callback}>
        <div class="card-front card-direction">
            <h2><span class="card-value-direction">
            	<br/>
	            "${value}"</span>
	        </h2>
            <p class="card-type"># parameter</p>
        </div>
        ${BackCard(id)}
    </div>
`};


