// startQuiz starts a timer which counts down from the max time
// max time is determined by length of quiz...questions.length * 15 seconds
// if correct, display "Correct!" and move to next question
// if incorrect, display "Incorrect!", move to the next question AND subtract additional 5 seconds from remaining time
// quiz ends when timer reaches 0 or all questions are answered
// after end of game, prompt user to enter initials for leaderboard. High scores ordered by remaining time.
// DOM Object Style Guide:
// https://www.w3schools.com/jsref/dom_obj_style.asp

/* window.board = document.getElementById('gameBoard'); */

// Keep track of whether the game is still active.
var game = true;
var sec = questions.length * 10;

function getResult(correct) {
	var messageArea = document.getElementById('messageArea');
	if (correct) {
		messageArea.className = 'correct';
		messageArea.textContent = 'Correct!';
	} else {
		messageArea.className = 'incorrect';
		messageArea.textContent = 'Incorrect!';
		sec -= 10;
	}
}

function getScore() {
	var board = document.getElementById('gameBoard');
	// HIGH SCORES
	// get highScores from localStorage
	// if it does not exist, create as an empty array
	var highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
	var playerName = document.getElementById('inputInitials').value;
	// Store score info in this copy of the array
	highScores.push({ name: playerName, score: sec });
	// Sort the scores
	// prettier-ignore
	highScores.sort((a, b) => (a.score > b.score) ? -1 : 1);
	// Put the updated array back in local storage for next time.
	localStorage.setItem('highScores', JSON.stringify(highScores));

	// High Score table
	var tableNode = document.createElement('table');
	var thInitials = document.createElement('th');
	var thScores = document.createElement('th');
	var reset = document.createElement('button');
	thInitials.innerHTML = 'Initials:';
	thScores.innerHTML = 'Scores:';
	tableNode.appendChild(thInitials);
	tableNode.appendChild(thScores);
	for (var i = 0; i < highScores.length; i++) {
		var newRow = document.createElement('tr');
		var tdScore = document.createElement('td');
		var tdInitials = document.createElement('td');
		tdScore.textContent = highScores[i].score;
		tdInitials.textContent = highScores[i].name;
		newRow.appendChild(tdScore);
		newRow.appendChild(tdInitials);
		tableNode.appendChild(newRow);
	}
	board.appendChild(tableNode);
	reset.setAttribute('id', 'buttonReset');
	reset.innerHTML = 'Reset';
	reset.setAttribute('onclick', 'location.reload();');
	board.appendChild(reset);
}

function gameOver() {
	// When game ends, display message and show button to restart the quiz (test)
	game = false;
	var board = document.getElementById('gameBoard');
	// clear #gameBoard
	while (board.firstChild) {
		board.firstChild.remove();
	}
	// Create new child nodes
	var newNode = document.createElement('div');
	newNode.setAttribute('class', 'gameOver');
	newNode.innerHTML = '<label>Enter initials:</label>';
	board.appendChild(newNode);

	newNode = document.createElement('input');
	newNode.setAttribute('type', 'text');
	newNode.setAttribute('id', 'inputInitials');
	board.appendChild(newNode);

	newNode = document.createElement('button');
	newNode.innerHTML = 'Submit';
	newNode.setAttribute('onclick', 'getScore();');
	board.appendChild(newNode);
}

// Replaces current question with the specified item from the question array
function nextQuestion(question, answer) {
	// Clear gameBoard
	var board = document.getElementById('gameBoard');
	while (board.firstChild) {
		board.firstChild.remove();
	}

	var nextQuestion = question + 1;
	var lastQuestion = question - 1;

	if (nextQuestion > questions.length) {
		game = false;
	} else {
		// Create div to hold question
		var newNode = document.createElement('div');
		newNode.setAttribute('id', question);
		board.appendChild(newNode);

		// Question
		newNode = document.createElement('h1');
		newNode.textContent = questions[question].title;
		board.children[0].appendChild(newNode);

		// Answers
		newNode = document.createElement('ul');
		newNode.setAttribute('id', 'list_' + question);
		board.lastChild.appendChild(newNode);

		var questionList = document.getElementById('list_' + question);
		for (var x = 0; x < questions[question].choices.length; x++) {
			questionList.insertAdjacentHTML(
				'afterbegin',
				"<li class='question' onclick='nextQuestion(" +
					nextQuestion +
					',' +
					x +
					")')>" +
					questions[question].choices[x] +
					'</li>'
			);
		}
		newNode = document.createElement('div');
		newNode.setAttribute('id', 'messageArea');
		board.lastChild.appendChild(newNode);

		// Score last question
		if (answer > -1) {
			if (
				questions[lastQuestion].answer ===
				questions[lastQuestion].choices[answer]
			) {
				getResult(true);
			} else if (
				questions[lastQuestion].answer !=
				questions[lastQuestion].choices[answer]
			) {
				getResult(false);
			}
		}
	}
}

function quiz() {
	// Set timer
	document.getElementById('timer').textContent = sec;

	// Show first question
	nextQuestion(0, -1);

	// Start timer
	var time = setInterval(function() {
		if (sec > 0 && game) {
			sec--;
			document.getElementById('timer').textContent = sec;
		} else {
			gameOver();
			clearInterval(time);
			/* return; */
			/* sec = questions.length * 10; */
		}
	}, 1000);
}
