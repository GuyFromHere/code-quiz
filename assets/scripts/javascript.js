// startQuiz starts a timer which counts down from the max time
// max time is determined by length of quiz...questions.length * 15 seconds
// if correct, display "Correct!" and move to next question
// if incorrect, display "Incorrect!", move to the next question AND subtract additional 5 seconds from remaining time
// quiz ends when timer reaches 0 or all questions are answered
// after end of game, prompt user to enter initials for leaderboard. High scores ordered by remaining time.

// set manual timer variable for testing
var countDown = 5;

/* <h1>Coding Quiz Challenge</h1>
<p>Click the Start Quiz button to start the quiz!</p>
<input type="button" value="Start Quiz" id="startButton" onclick="quiz();" /> */

function buildGame() {
  // load quiz in to DOM and collapse / hide elements until they are called...
  var newNode = document.createElement("div");
  newNode.className = "gameBoard";
}

function gameOver() {
  // When game ends, display message and show button to restart the quiz (test)
  // Get first child of quizBoard
  var board = document.getElementById("quizBoard");

  // Create new child nodes
  var result = document.createTextNode("");
}

function quiz() {
  // set sec to test value
  var sec = countDown;

  buildQuiz();
  // start timer
  time = setInterval(function() {
    if (sec > 0) {
      document.getElementById("timer").innerHTML = sec--;
    } else {
      alert("GO");
      clearInterval(time);
      sec = countDown;
    }
  }, 1000);
}
