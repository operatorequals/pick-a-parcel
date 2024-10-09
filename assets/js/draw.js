

//TODO: make it boardgame.io compatible
// function drawCards(targetElmID, cardList, callbackEvent, faceup=true){ 
function drawCards({G, playerID}, targetElmID){
  const playerNum = Object.keys(G.players).length;
  let nextPlayerID = (playerID + 1) % playerNum;
  const cardholderElm = $(`#${targetElmID}`);
  let faceup = true;
  let callbackEvent = undefined;

  if (targetElmID === "hand"){
    cardList = G.players[playerID].hand
    callbackEvent = EVENTS["ADD"];
    // cardholderElm.addClass(`player-${playerID+1}`);
  }
  else if (targetElmID === "turn-strategy-own"){
    cardList = G.players[playerID].turnStrategy;
    callbackEvent = EVENTS["REMOVE"];
  }
  else { // opponent
    cardList = G.players[nextPlayerID].turnStrategy;
    faceup=false;
    // cardholderElm.addClass(`player-${nextPlayerID+1}`)
  }

  const cardListIDs = cardList.map(card=>card.id);
  const drawnElm = $(`[id^=${targetElmID}-]`) // Card elements
  // The card ID is the last element of the '-' of HTML ID:
  // ex: hand-1234, turn-strategy-own-1234
  const drawnElmIDs = drawnElm.get().map(elm=>{
    return elm.id.split("-").findLast((x)=>x);
  }); 

  // Cards that aren't drawn but they should
  const undrawnCardIDs = cardList.filter(card => {
    if (!drawnElmIDs.includes(card.id)) return card
  });

  // Cards that are drawn that they shouldn't
  const overdrawnCardIDs = drawnElmIDs.filter(cardID => {
    if (!cardListIDs.includes(cardID)) return cardID
  });

  // console.log(`[${targetElmID}] Cards: ${cardListIDs}\n DrawnCards: ${drawnElmIDs}\nOverdrawn ${overdrawnCardIDs.length} - Undrawn: ${undrawnCardIDs.length}`)
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
    $(".parcel").removeClass("parcel").removeClass("objective").empty()
    $(".goal").removeClass("goal").removeClass("objective").empty()

    $("#board div[class*='player']").each((i,elm)=>{
      const jelm = $(elm)
      // remove all classes starting with "player"
      jelm[0].classList.forEach(className => {
        if (className.startsWith('player'))
            jelm.removeClass(className);
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
        $(`#board-cell-${pos.x}-${pos.y}`).addClass("player")
        // Define which player by color!
        $(`#board-cell-${pos.x}-${pos.y}`).addClass(`player-${Number(x)+1}`)
        $(`#board-cell-${pos.x}-${pos.y}`).append(x)
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

    PlayerID: ${playerID} <br/>
    Plays Next: ${G.ctx.currentPlayer} <br/>
    <br/>
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
    `
    infoElm.append(infoStr);
}