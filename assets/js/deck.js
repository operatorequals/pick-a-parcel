const VALIDCARDS = {
    "action": [
        "move", "steal", "throw",
    ],
    "direction": [
        "up", "down", "left", "right"
    ],
};

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

class Deck {
    constructor(cards, type) {
        this.cards = cards;
        this.type = type
    }

    static createDeck = (type="action", num_of_cards=24, shuffle=true) => {
        // num_of_cards: should be dividable by 3 and 4,
        // to end up with 2 decks of same copies of actions
        let cardValues = VALIDCARDS[type]
        let cards = []
        for (let i = 0; i < num_of_cards; i++)
            cards.push( // rotate through card values to include them all
                new Card(type, cardValues[i % cardValues.length])
                );

        const deck = new Deck(cards, type);
        if (shuffle)
            deck.shuffle();
        return deck;
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        console.log('Deck shuffled:', this.cards);
    }

    draw(count) {
        if (this.length() < count)
            throw new DeckFinishedError(
                `The ${this.type} Deck has ${this.length()} cards left. Unable to draw ${count}`
                );
        const drawnCards = this.cards.splice(0, count);
        console.log(`Drawn cards:`, drawnCards);
        return drawnCards;
    }

    length() {
        return this.cards.length
    }

    toHTML(id){
        return BackCard(id);
    }    
}
