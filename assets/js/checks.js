
sanity_checks = [
  cardNumber = (G) => {
    const sum = CONSTANTS["DECKNUM"] * 2;
    const cardPlaces = [
      G.players[0].hand,
      G.players[0].turnStrategy,
      G.players[1].hand,
      G.players[1].turnStrategy,
      G.decks["direction"],
      G.decks["action"],
      G.decks["trunk"],
    ]
    let current = 0
    cardPlaces.forEach(place=>{
    	current += place.length;
    })

    if (sum !== current){
      console.error(`Inconsistent state: Total cards ${current} - should be ${sum}`)
      return false
    }
    return true;
  },

  twoParcels = (G) => {
    const players = Object.keys(G.players)
    let parcelNum = 0;
    players.forEach((playerID) =>{
      parcelNum += G.players[playerID].hasParcel ? 1 : 0;
    });
    const parcelPosition = G.positions.parcel;
    if (parcelPosition.x != -1 && parcelPosition.y != -1)
      parcelNum += 1;
    if (parcelNum != 1){
      console.error(`Inconsistent state: More than 1 Parcel in the game (found: ${parcelNum})`)
      return false
    }
    return true;
  },
]
