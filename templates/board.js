const Board = (x=5, y=undefined, topLayer=false, id="board") => {
	// If not specified make a 5X5 Board
	if (y === undefined) y=x;

	let html = ""
	if (topLayer)
		html += `<div id="${id}-board" class="board">`

	for (let i=1; i<=x; ++i){
		html += `<div id="${id}-row-${i}" class="row">`
		for (let j=y; j>0; --j)
			html += `<div id="${id}-cell-${i}-${j}" class="cell"></div>`
		html += `</div>`
	}

	if (!topLayer)
		html += `</div>`
	return html
}
