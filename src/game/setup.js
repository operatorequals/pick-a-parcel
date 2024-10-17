import { CARDSUMS, CONSTANTS } from './constants';


const createCard = (type, value, nrand) => {
    if (CARDSUMS[type][value] === undefined)
        throw new Error(`Invalid Card: "${type}" "${value}"`);
    let card = {}
    card.type = type; // "action" or "direction"
    card.value = value; // e.g., "move", "left"
    card.id = nrand.toString(36).slice(2, 9); // unique random ID to for each card
    return card;
}

export const createDeck = ({G, random}, type="action" ) => {
    const cardSums = CARDSUMS[type]
    const cardTotal = Object.values(cardSums).reduce((a, b) => a + b, 0)
    console.log(`Creating ${type} Deck (${cardTotal} cards)...`);
    let cards = []
    for (const [value, num] of Object.entries(cardSums)){
        for (let i = 0; i < num; i++)
            cards.push(createCard(type, value, random.Number()));
    }
    // Deck shuffling
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(random.Number() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    G.decks[type] = cards;
}

export const pickRandomPosition = ({G, random}, object) => {
    let nonColliding = 0;
    let x = -1;
    let y = -1;
    const positions = Object.values(G.positions);
    while (nonColliding < positions.length){
      nonColliding = 0;
      x = Math.floor(random.Number() * CONSTANTS.BOARDSIZE) + 1;
      y = Math.floor(random.Number() * CONSTANTS.BOARDSIZE) + 1;
      for (let i = 0; i < positions.length; i++){
          const pos = positions[i]
          const collision = (pos.x === x && y === pos.y);
          if (!collision) nonColliding++;
          else break;
      }
    }
    G.positions[object] = {'x':x, 'y':y}
  }