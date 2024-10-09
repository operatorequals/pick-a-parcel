

function drawCards(targetElmID, cardList, callbackEvent, faceup=true){

    const cardholderElm = $(`#${targetElmID}`);
    // Set background if EXECUTING script
    // if (targetElmID.startsWith("turnStrategy"))


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
        cardElm.addClass("card-animation")
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
    $(".parcel").removeClass("parcel").empty()
    $(".goal").removeClass("goal").empty()
    // $(".player").each((i,elm)=>{
    $("[class*='player']").each((i,elm)=>{
      const jelm = $(elm)
      // remove all classes starting with "player"
      jelm[0].classList.forEach(className => {
        if (className.startsWith('player')){
            jelm.removeClass(className);
        }

      });
      jelm.empty();
    });
    // Draw Board Positions
    Object.entries(G.positions).forEach(([x, pos]) => {
      // console.log(x,pos)
      if (x === "parcel"){
        $(`#board-cell-${pos.x}-${pos.y}`).addClass("objective").addClass("parcel").append("P")
      }
      else if (x === "goal"){
        $(`#board-cell-${pos.x}-${pos.y}`).addClass("objective").addClass("goal").append("G")

      } // it is a player
      else {
        // console.log("Drawing player")
        $(`#board-cell-${pos.x}-${pos.y}`).addClass("player")
        $(`#board-cell-${pos.x}-${pos.y}`).addClass(`player-${Number(x)+1}`)
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
    Message: <h1>${player.message !== undefined ? player.message : ""}</h1> <br/>

    Plays Next: ${G.ctx.currentPlayer} <br/>
    PlayerID: ${playerID} <br/>
    HasParcel: ${player.hasParcel} <br/>
    Opponent HasParcel: ${opponent.hasParcel} <br/>
    <br/>
    Phase: ${player.phase} <br/>
    Opponent Phase: ${opponent.phase} <br/>
    <br/>

    Deck cards: ${G.decks["action"].length + G.decks["direction"].length} <br/>
    <br/>

    Cards in hand: ${player.hand.length}<br/>
    Cards in opponent's hand: ${opponent.hand.length}<br/>
    <br/>

    Own Turn Strategy: ${player.turnStrategy.length}<br/>
    Opponent Turn Strategy: ${opponent.turnStrategy.length}<br/>
    <br/>
    GameState updatedOn: ${G.updatedOn}<br/>
    `
    infoElm.append(infoStr);
}