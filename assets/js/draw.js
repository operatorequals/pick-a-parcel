

function drawCards(targetElmID, cardList, callbackEvent, faceup=true){

    const cardholderElm = $(`#${targetElmID}`);

    const cardListIDs = cardList.map(card=>card.id);

    // console.log(`${targetElmID}: ${cardListIDs}`);

    const drawnElm = $(`[id^=${targetElmID}-]`) // 
    // The card ID is the last element of the '-' of HTML ID:
    // ex: hand-1234, turn-strategy-own-1234
    const drawnElmIDs = drawnElm.get().map(elm=>elm.id.split("-").findLast((x)=>x)) 

    // Cards that aren't drawn but they should
    const undrawnCardIDs = cardList.filter(function(card) {
      if (!drawnElmIDs.includes(card.id)) return card
    });

    // Cards that are drawn that they shouldn't
    const overdrawnCardIDs = drawnElmIDs.filter(function(cardID) {
      if (!cardListIDs.includes(cardID)) return cardID
    });

    // console.log(`Drawn cards ${drawnElmIDs}`)
    // console.log(`Hand: ${handIDs}\nOverdrawn ${overdrawnCardIDs.length} - Undrawn: ${undrawnCardIDs.length}`)
    // Draw Hand and set callback
    undrawnCardIDs.forEach((card, i) => {
      let cardID = `${targetElmID}-${card.id}`

      if (faceup){
	      let cardHTML = FaceUpCard(card.type, card.value, cardID)
	      cardholderElm.append(cardHTML)
	      let cardElm = $(`#${cardID}`)
	      cardElm.click(() => {
	        passToHost(`${EVENTS[callbackEvent]} ${card.id}`) // this is evaluated in Host's tick()
	        cardElm.remove()
	      });
	  } else {
	      let cardHTML = FaceDownCard(cardID)
	      // console.log(`facedown card ${cardID}`)
	      cardholderElm.append(cardHTML)
	  }

    });

    // Remove cards no longer in Hand
    overdrawnCardIDs.forEach(cardID => {
      $(`#${targetElmID}-${cardID}`).remove()
    })

}

function drawBoard({G, playerID}){

    // Reset Board
    $(".parcel").removeClass("parcel")
    $(".goal").removeClass("goal")
    $(".player").each((i,elm)=>{
      const jelm = $(elm)
      jelm.empty();
      jelm.removeClass("player");
    });
    // Draw Board Positions
    Object.entries(G.positions).forEach(([x, pos]) => {
      // console.log(x,pos)
      if (x === "parcel"){
        $(`#board-cell-${pos.x}-${pos.y}`).addClass("parcel")
      }
      else if (x === "goal"){
        $(`#board-cell-${pos.x}-${pos.y}`).addClass("goal")
      } // it is a player
      else {
        // console.log("Drawing player")
        $(`#board-cell-${pos.x}-${pos.y}`).addClass("player")
        $(`#board-cell-${pos.x}-${pos.y}`).append(x)
        // Define which player!
      }
    });
}

function updateInfo({G, playerID}){
    infoElm = $("#info");
    infoElm.empty();
    player = G.players[playerID]
    opponent = G.players[(playerID+1) % (Object.keys(G.players).length)]
    phase = GAMEPHASES[player.phase]
    infoStr = `
    PlayerID: ${playerID} <br/>
    Phase: ${player.phase} <br/>
    Opponent Phase: ${opponent.phase} <br/>
    HasParcel: ${player.hasParcel} <br/>
    <br/>
    Message: ${player.message !== undefined ? player.message : ""} <br/>
    `
    infoElm.append(infoStr);
}