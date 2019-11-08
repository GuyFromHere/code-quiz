// startQuiz starts a timer which counts down from the max time
// max time is determined by length of quiz...questions.length * 15 seconds
// if correct, display "Correct!" and move to next question
// if incorrect, display "Incorrect!", move to the next question AND subtract additional 5 seconds from remaining time
// quiz ends when timer reaches 0 or all questions are answered
// after end of game, prompt user to enter initials for leaderboard. High scores ordered by remaining time.
// DOM Object Style Guide:
// https://www.w3schools.com/jsref/dom_obj_style.asp

/* var board = document.getElementById('gameBoard'); */

// Keep track of whether the game is still active.
var game = true;
var sec = questions.length * 10;
var scores = {
  players: [],
  playerScores: []
};

function buildGame() {
  // Called on body load. Creates the start page for the quiz.
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

function getScore(correct) {
  var messageArea = document.getElementById("messageArea");
  if (correct) {
    messageArea.className = "correct";
    messageArea.textContent = "Correct!";
  } else {
    messageArea.className = "false";
    messageArea.textContent = "False!";
    sec -= 5;
  }
}

function gameOver() {
  // When game ends, display message and show button to restart the quiz (test)
  game = false;
  var board = document.getElementById("gameBoard");
  while (board.firstChild) {
    board.firstChild.remove();
  }

  // Create new child nodes
  var newNode = document.createElement("div");
  newNode.setAttribute("class", "gameOver");
  newNode.innerHTML = "<h1>Game Over</h1><h4>High Scores:</h4>" + sec;
  board.appendChild(newNode);

  newNode = document.createElement("table");
  newNode.setAttribute("class", "highScores");
  board.lastChild.appendChild(newNode);
}

// Replaces current question with the specified item from the question array
function nextQuestion(question, answer) {
  // Clear gameBoard
  var board = document.getElementById("gameBoard");
  while (board.firstChild) {
    board.firstChild.remove();
  }

  var nextQuestion = question + 1;
  var lastQuestion = question - 1;

  if (nextQuestion > questions.length) {
    gameOver();
  } else {
    // Create div to hold question
    var newNode = document.createElement("div");
    newNode.setAttribute("id", question);
    board.appendChild(newNode);

    // Question
    newNode = document.createElement("h1");
    newNode.textContent = questions[question].title;
    board.children[0].appendChild(newNode);

    // Answers
    newNode = document.createElement("ul");
    newNode.setAttribute("id", "list_" + question);
    board.lastChild.appendChild(newNode);

    var questionList = document.getElementById("list_" + question);
    for (var x = 0; x < questions[question].choices.length; x++) {
      questionList.insertAdjacentHTML(
        "afterbegin",
        "<li class='question' onclick='nextQuestion(" +
          nextQuestion +
          "," +
          x +
          ")')>" +
          questions[question].choices[x] +
          "</li>"
      );
    }
    newNode = document.createElement("div");
    newNode.setAttribute("id", "messageArea");
    board.lastChild.appendChild(newNode);

    // Score last question
    if (answer > -1) {
      if (
        questions[lastQuestion].answer ===
        questions[lastQuestion].choices[answer]
      ) {
        getScore(true);
      } else if (
        questions[lastQuestion].answer !=
        questions[lastQuestion].choices[answer]
      ) {
        getScore(false);
      }
    }
  }
}

function quiz() {
  document.getElementById("timer").textContent = sec;

  // Show first question
  nextQuestion(0, -1);

  // start timer
  time = setInterval(function() {
    if (sec > 0 && game) {
      sec--;
      document.getElementById("timer").textContent = sec;
    } else {
      gameOver();
      clearInterval(time);
      sec = questions.length * 10;
    }
  }, 1000);
}
