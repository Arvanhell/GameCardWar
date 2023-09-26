let deckId = '' // must be global to 


// ----> First Shuffle getting new deck with Fetch
fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then(res => res.json()) // parse response as JSON
.then(data => {
  console.log(data)
 deckId =  data.deck_id

})
.catch(err => {
    console.log(`error ${err}`)
});
// ----> First Shuffle getting new deck


// ------> Drawing the cards from the deck as a second Fetch 
document.querySelector('button').addEventListener('click', drawTwo)
// ---> by clicking the button then function drawTwo is executed
function drawTwo(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  
      fetch(url)
      .then(res => res.json())
      .then(data =>{
          console.log(data);
       // ------> Drawing the cards from the deck     

          document.querySelector('#player1').src = data.cards[0].image
      // first image we imputing in to the DOM 
          document.querySelector('#player2').src = data.cards[1].image
      // second image we imputing in to the DOM

          // ------> passing value from function convertToNum 
          let player1Val = convertToNum(data.cards[0].value)
     // it is converted to Numbers because originaly value was a strings
          let player2Val = convertToNum(data.cards[1].value)
          // ------> passing value from function convertToNum 

          // ------> condition to resolve result who win
          if(player1Val > player2Val){
            document.querySelector('h3').innerText = 'Player1 Wins'
          } else if (player1Val < player2Val) {
            document.querySelector('h3').innerText = 'Player2 Wins'
          }else{
            document.querySelector('h3').innerText = 'Time for War!'
          }
// ------> condition to resolve results who win else War
      })
      .catch(err => {
        console.log(`error ${err}`)
      });
}


// function converting cards without value as number into numbers
function convertToNum(val){
  if(val === 'ACE'){
    return 14
  }else if (val === 'KING'){
    return 13
  }else if (val === 'QUEEN'){
    return 12
  }else if(val === 'JACK'){  
    return 11
  }else{
    return Number(val)
  }
}
//function converting cards without value as number into numbers