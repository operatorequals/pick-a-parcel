function passToHost(key) {
  const body = document.body;
   body.dispatchEvent(new KeyboardEvent("keydown", { key }));
}


// DEBUG functions


function formatJSON(value) {
    if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
            return '[' + value.map(formatJSON).join(', ') + ']';
        } else {
            return '{' + Object.keys(value).map(key => 
                `<span class="json-key">"${key}":</span> ${formatJSON(value[key])}`
            ).join(', ') + '}';
        }
    } else if (typeof value === 'string') {
        return `<span class="json-string">"${value}"</span>`;
    } else if (typeof value === 'number') {
        return `<span class="json-number">${value}</span>`;
    } else if (typeof value === 'boolean') {
        return `<span class="json-boolean">${value}</span>`;
    } else {
        return `<span class="json-null">null</span>`;
    }
}


function showInDebugWithID(elmID, object) {
    // json = formatJSON(object)
    json = "<code>"+JSON.stringify(object, null, 2)+"</code>"
    //         .replace(/"([^"]+)":/g, '<span class="json-key">"$1":</span>') // Color keys
    //         .replace(/"([^"]+)"/g, '<span class="json-string">"$1"</span>') // Color strings
    //         .replace(/: (\d+)/g, ': <span class="json-number">$1</span>') // Color numbers
    //         .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>') // Color booleans
    //         .replace(/: (null)/g, ': <span class="json-null">$1</span>'); // Color null    

        // .replace(/"([^"]+)":/g, '<span class="json-key">"$1":</span>')
        // .replace(/"(.*?)"/g, '<span class="json-string">"$1"</span>')
        // .replace(/: (\d+)/g, ': <span class="json-number">$1</span>')
        // .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>')
        // .replace(/: (null)/g, ': <span class="json-null">$1</span>');
	document.getElementById(elmID).innerHTML = json
}

