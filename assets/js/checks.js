
sanity_checks = [
  cardNumber = (G) => {
    const sum = CONSTANTS["DECKNUM"] * 2;
    const cardPlaces = [
  	  G.players[0].hand,
  	 	G.players[0].turnStrategy,
  	 	G.players[1].hand,
  	 	G.players[1].turnStrategy,
  	 	G.decks["direction"].cards,
  	 	G.decks["action"].cards,
      G.decks["trunk"],
    ]
    let current = 0
    cardPlaces.forEach(place=>{
    	current += place.length;
    })

    if (sum !== current){
      console.error(`Inconsistend state: Total cards ${current} - should be ${sum}`)
      return false
    }
    return true;
  },
  
  twoParcels = (G) => {
    const players = Object.keys(G.players)
    let parcelNum = 0;
    players.forEach((playerID) =>{
      parcelNum += players[playerID].hasParcel ? 1 : 0;
    });
    if (parcelNum > 1){
      console.error(`Inconsistend state: More than 1 players have the Parcel`)
      return false
    }
    return true;
  }
]
