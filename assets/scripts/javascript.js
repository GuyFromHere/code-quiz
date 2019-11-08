// startQuiz starts a timer which counts down from the max time
// max time is determined by length of quiz...questions.length * 15 seconds
// if correct, display "Correct!" and move to next question
// if incorrect, display "Incorrect!", move to the next question AND subtract additional 5 seconds from remaining time
// quiz ends when timer reaches 0 or all questions are answered
// after end of game, prompt user to enter initials for leaderboard. High scores ordered by remaining time.

// set manual timer variable for testing
var countDown = 5;

// DOM Object Style Guide:
// https://www.w3schools.com/jsref/dom_obj_style.asp
/* <h1>Coding Quiz Challenge</h1>
<p>Click the Start Quiz button to start the quiz!</p>
<input type="button" value="Start Quiz" id="startButton" onclick="quiz();" /> */

function setProperties(element, props) {
  for (var key in props) {
    element.style.key = props[key];
    console.log(key + " " + props[key]);
  }
}

function buildGame() {
  // load quiz in to DOM and collapse / hide elements until they are called...

  var board = document.getElementById("gameBoard");
  board.style.textAlign = "center";

  var newNode = document.createElement("h1");
  newNode.innerHTML = "Coding Quiz Challenge";
  board.appendChild(newNode);

  newNode = document.createElement("p");
  newNode.innerHTML = "Click the Start Quiz button to start the quiz!";
  board.appendChild(newNode);

  newNode = document.createElement("input");
  newNode.setAttribute("type", "button");
  newNode.setAttribute("value", "Start Quiz");
  newNode.setAttribute("id", "startButton");
  newNode.setAttribute("onclick", "quiz();");
  board.appendChild(newNode);
}

function gameOver() {
  // When game ends, display message and show button to restart the quiz (test)
  // Clear children of board
  var board = document.getElementById("gameBoard");
  while (board.firstChild) {
    board.firstChild.remove();
  }
  // Create new child nodes
  var newNode = document.createElement("div");
  newNode.innerHTML = "New Node!";
  board.appendChild(newNode);
}

function quiz() {
  // set sec to test value
  var sec = countDown;

  // start timer
  time = setInterval(function() {
    if (sec > 0) {
      document.getElementById("timer").innerHTML = sec--;
    } else {
      /*alert("Game Over");*/
      gameOver();
      clearInterval(time);
      sec = countDown;
    }
  }, 1000);
}
