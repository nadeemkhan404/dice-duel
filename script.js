'use strict';
//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//Starting Conditions

let scores;
let currentScore;
let activePlayer;
let playing;

const init = function () {
  //1. Setting Scores Array again to [0,0]
  scores = [0, 0];
  //1. Total Score of Player 1 = 0
  score0El.textContent = 0;

  //2. Total Score of Player 2 = 0
  score1El.textContent = 0;

  //3. Setting the Playing Variable to True
  playing = true;

  //4. Setting Dice to Invisible as it will be visible again when we press the Roll Button
  diceEl.classList.add('hidden');

  //5. Switching the Active Player to Default That is 0.
  activePlayer = 0;

  //6. Removing the Active Player Background from player2
  player1El.classList.remove('player--active');

  //7. Switching the Active Player to Default Visually through Background Color
  player0El.classList.add('player--active');

  //8. Current Score of Player 1 = 0
  current0El.textContent = 0;

  //9. Current Score of Player 2 = 0
  current1El.textContent = 0;

  //10. currentScore Variable = 0
  currentScore = 0;

  //11. Removing the Winner Player's Winner Background from both players
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

init();

const switchPlayer = function () {
  //a. Before Changing the Score Displaying the Score 0 before Switching
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  //b. Changing the Value of currentScore Variable to 0
  currentScore = 0;

  //c. Switching the Player
  activePlayer = activePlayer === 0 ? 1 : 0;

  //d. Visual Switch
  player0El.classList.toggle('player--active'); //----HERE
  player1El.classList.toggle('player--active'); //----HERE
};

//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating Random Dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2. Display the Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. Check for rolled 1: if true
    if (dice !== 1) {
      //Add Dice to the Current Roll
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      //4. SWITCH TO NEXT PLAYER:
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] = scores[activePlayer] + currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // If True, then finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // If False, Switch to Next Player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

/* CAN ALSO BE WRITTEN LIKE THIS:
btnNew.addEventListener('click', function () {
  //1. Setting the Playing Variable to True
  playing = true;

  //2. Making the Dice Visible
  diceEl.classList.remove('hidden');
  
  //3. Switching the Active Player to Default That is 0.
  activePlayer = 0;
  
  //4. Removing the Active Player Background from player2
  player1El.classList.remove('player--active');

  //5. Switching the Active Player to Defautl Visually through Background Color
  player0El.classList.add('player--active');
  
  //6. Current Score of Player 1 = 0
  current0El.textContent = 0;

  //7. Current Score of Player 2 = 0
  current1El.textContent = 0;
  
  //8. currentScore Variable = 0
  currentScore = 0;

  //9. Total Score of Player 1 = 0
  score0El.textContent = 0;

  //10. Total Score of Player 2 = 0
  score1El.textContent = 0;
  
  //11. Removing the Winner Player's Winner Background from both players
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
});
*/
