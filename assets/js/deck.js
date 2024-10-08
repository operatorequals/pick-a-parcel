

class Card {
    constructor(type, value) {
        if (VALIDCARDS[type].indexOf(value) === -1)
            throw new Error(`Invalid Card: "${type}" "${value}"`);
        this.type = type; // "action" or "direction"
        this.value = value; // e.g., "move", "left"
        this.id = Math.random().toString(36).slice(2, 9); // unique random ID to for each card
    }

    toHTML(id, callback=""){
        if (this.type == "action")
            return ActionCard(this.value, id, callback);
        else
            return DirectionCard(this.value, id, callback);
    }
}
