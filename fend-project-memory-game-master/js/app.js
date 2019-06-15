/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;	
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
let cards=['fa-diamond','fa-diamond',
			  'fa-paper-plane-o','fa-paper-plane-o',
			  'fa-anchor','fa-anchor',
			  'fa-bolt','fa-bolt',
			  'fa-cube','fa-cube',
			  'fa-leaf','fa-leaf',
			  'fa-bicycle','fa-bicycle',
			  'fa-bomb','fa-bomb'
			 ];

function generateCard(card){
	return `<li class="card" data-card="${card}"><i class ="fa ${card}"></i></li>`;
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 function  inGame(){
 	let deck=document.querySelector('.deck');
 	let cardHTML=shuffle(cards).map(function(card){
 		return generateCard(card);
 	});

 	deck.innerHTML=cardHTML.join('');
 }


 inGame();
let win = 0 ;
let allCardsInDiv=document.querySelectorAll('.card'); 
let openCardsCounter=[];
let moves=0;
let movesCounter=document.querySelector('.moves');
let restart=document.querySelector('.restart');
let star = 0 ;
let starRating=3;
let secs = 0;

/* 
This is a method to restart the game and the board and the star rating and the timer
*/ 
restart.addEventListener('click',function(maher){
	movesCounter.innerText=0;
	document.querySelector('.star1').style.display='inline';
	document.querySelector('.star2').style.display='inline';
	document.querySelector('.star3').style.display='inline';
	secs=0;
	openCardsCounter.length=0;

	allCardsInDiv.forEach(function(card){card.classList.remove('show');
		card.classList.remove('open');
		card.classList.remove('match');
	})
	shuffle(cards);
});

/*
This a method to click event and win the game ; 
 */ 
allCardsInDiv.forEach(function(card) {

	card.addEventListener('click',function(waleed){
	if (moves>=8)
	{
		document.querySelector('.star3').style.display='none';
		starRating=2;
	}
	if (moves>=15)
	{
		document.querySelector('.star2').style.display='none';
		starRating=1;
	}
	if (moves>=22)
	{
		document.querySelector('.star3').style.display='none';
		starRating=0;
	}
		if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
			openCardsCounter.push(card);
			card.classList.add('open','show');
				if(openCardsCounter.length == 2){
					if(openCardsCounter[0].dataset.card==openCardsCounter[1].dataset.card)
					{
						win++;
						openCardsCounter[0].classList.add("match");
						openCardsCounter[0].classList.add("open");
						openCardsCounter[0].classList.add("show");
						openCardsCounter[1].classList.add("match");
						openCardsCounter[1].classList.add("open");
						openCardsCounter[1].classList.add("show");
						openCardsCounter=[];
						moves++;
						movesCounter.innerText=moves;
						
						}else{
						setTimeout(function(){
							openCardsCounter.forEach(function(card){
								card.classList.remove('open','show');

							});
							moves++;
							movesCounter.innerText=moves;
							openCardsCounter=[];
						},1000);
				    }

				    if(win == 8 )
							{

									document.querySelector('.container').style.display='none';
									document.querySelector('.pwin').innerText="Congratulations! You Won! Your Star Rating is "+starRating;
									document.querySelector('.win').style.display='inline';
									document.querySelector('.gt').innerText="the time you take is "+ secs+" seconds";
							}	

				}  
			
		}	
	});
});
/*
this  a method to calcualte the time from start to win the game ;
 */ 
window.onload = function() {
    let id = setInterval(function(){ 
        secs++; 
        document.querySelector('.gameTime').innerText=secs;
    }, 1000);
};
document.querySelector('.winGame').addEventListener('click',function(){
shuffle(cards);
	document.querySelector('.container').style.display='inline';
	document.querySelector('.win').style.display='none';
});
