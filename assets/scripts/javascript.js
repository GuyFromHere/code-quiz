/* window.board = document.getElementById('gameBoard'); */
// Keep track of whether the game is still active.
var game = true;
var sec = questions.length * 30;

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
	// Working on a timeout for the result message...ideally it will fade out after two or three seconds.
	/* var showResult = 3;
	var time = setInterval(function() {
		if (correct) {
			messageArea.className = 'correct';
			messageArea.textContent = 'Correct!';
		} else {
			messageArea.className = 'incorrect';
			messageArea.textContent = 'Incorrect!';
		}
		if (showResult > 0) {
			showResult--;
		} else {
			messageArea.textContent = '';
			clearInterval(time);
		}
	}, 1000); */
}

function getScore() {
	var board = document.getElementById('gameBoard');
	// get highScores from localStorage
	// if it does not exist, create as an empty array
	var highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
	var playerName = document.getElementById('initialsInput').value;
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
	tableNode.setAttribute('id', 'tableScores');
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
	// When game ends, display message and show button to restart the quiz
	game = false;
	var board = document.getElementById('gameBoard');
	var gameOverContainer = document.createElement('div');
	var gameOverHeader = document.createElement('h3');
	var gameOverMessage = document.createElement('p');
	var initialsContainer = document.createElement('div');
	var initialsInput = document.createElement('input');
	var buttonScore = document.createElement('button');
	// clear #gameBoard
	while (board.firstChild) {
		board.firstChild.remove();
	}
	// Create new child nodes
	gameOverContainer.setAttribute('class', 'gameOver');
	gameOverHeader.textContent = 'All done!';
	gameOverContainer.appendChild(gameOverHeader);

	gameOverMessage.textContent = 'Your final score is ' + sec;
	gameOverContainer.appendChild(gameOverMessage);

	initialsContainer.setAttribute('id', 'initialsContainer');
	initialsContainer.innerHTML = '<label>Enter initials:</label>';
	initialsInput.setAttribute('type', 'text');
	initialsInput.setAttribute('id', 'initialsInput');
	initialsContainer.appendChild(initialsInput);
	gameOverContainer.appendChild(initialsContainer);

	buttonScore.innerHTML = 'Submit';
	buttonScore.setAttribute('id', 'buttonScore');
	buttonScore.setAttribute('onclick', 'getScore();');
	gameOverContainer.appendChild(buttonScore);
	board.appendChild(gameOverContainer);
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
		// Reached the end of the quiz.
		game = false;
	} else {
		// Create question elements
		var questionContainer = document.createElement('div');
		var questionTitle = document.createElement('h1');
		var questionList = document.createElement('ul');

		// Create div to hold question elements
		questionContainer.setAttribute('class', 'question-container');
		questionContainer.setAttribute('id', question);

		// Create title text
		questionTitle.textContent = questions[question].title;
		questionContainer.appendChild(questionTitle);

		// Create choices list
		questionContainer.appendChild(questionList);
		for (var x = 0; x < questions[question].choices.length; x++) {
			var questionChoice = document.createElement('li');
			var questionNumber = x + 1;
			questionChoice.setAttribute('class', 'question');
			questionChoice.setAttribute(
				'onclick',
				'nextQuestion(' + nextQuestion + ',' + x + ')'
			);
			questionChoice.textContent =
				questionNumber + '. ' + questions[question].choices[x];
			questionList.appendChild(questionChoice);
		}

		// Append completed container to board
		board.appendChild(questionContainer);

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
		}
	}, 1000);
}
