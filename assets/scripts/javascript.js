// startQuiz starts a timer which counts down from the max time
// max time is determined by length of quiz...questions.length * 15 seconds
// if correct, display "Correct!" and move to next question
// if incorrect, display "Incorrect!", move to the next question AND subtract additional 5 seconds from remaining time
// quiz ends when timer reaches 0 or all questions are answered
// after end of game, prompt user to enter initials for leaderboard. High scores ordered by remaining time.

/* var board = document.getElementById('gameBoard'); */

// set manual timer variable for testing
var countDown = 50;

var questions = [
	{
		title: 'Commonly used data types DO NOT include:',
		choices: ['strings', 'booleans', 'alerts', 'numbers'],
		answer: 'alerts'
	},
	{
		title:
			'The condition in an if / else statement is enclosed within ____.',
		choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
		answer: 'parentheses'
	}
	///etc.
];

// DOM Object Style Guide:
// https://www.w3schools.com/jsref/dom_obj_style.asp

function setProperties(element, props) {
	for (var key in props) {
		element.style.key = props[key];
		console.log(key + ' ' + props[key]);
	}
}

function buildGame() {
	// load quiz in to DOM and collapse / hide elements until they are called...
	var board = document.getElementById('gameBoard');
	board.style.textAlign = 'center';

	var newNode = document.createElement('h1');
	newNode.innerHTML = 'Coding Quiz Challenge';
	board.appendChild(newNode);

	newNode = document.createElement('p');
	newNode.innerHTML = 'Click the Start Quiz button to start the quiz!';
	board.appendChild(newNode);

	newNode = document.createElement('input');
	newNode.setAttribute('type', 'button');
	newNode.setAttribute('value', 'Start Quiz');
	newNode.setAttribute('id', 'startButton');
	newNode.setAttribute('onclick', 'quiz();');
	board.appendChild(newNode);
}

function gameOver() {
	// When game ends, display message and show button to restart the quiz (test)
	var board = document.getElementById('gameBoard');
	while (board.firstChild) {
		board.firstChild.remove();
	}
	// Create new child nodes
	var newNode = document.createElement('div');
	newNode.innerHTML = 'New Node!';
	board.appendChild(newNode);
}

function playGame() {
	console.log(questions.length);
	var board = document.getElementById('gameBoard');
	for (var i = 0; i < questions.length; i++) {
		var newNode = document.createElement('div');
		newNode.setAttribute('class', 'question');
		newNode.setAttribute('id', i);
		board.appendChild(newNode);
		console.log(questions[i].title);
		newNode = document.createElement('h1');
		newNode.innerHTML = questions[i].title;
		board.appendChild(newNode);
		newNode = document.createElement('ul');
		board.appendChild(newNode);

		for (var x = 0; x < questions[i].choices.length; x++) {
			newNode = document.createElement('li');
			newNode.innerHTML = questions[i].choices[x];
			board.appendChild(newNode);
		}
	}
}

function quiz() {
	// set sec to test value
	var sec = countDown;
	playGame();
	// start timer
	time = setInterval(function() {
		if (sec > 0) {
			document.getElementById('timer').innerHTML = sec--;
		} else {
			/*alert("Game Over");*/
			gameOver();
			clearInterval(time);
			sec = countDown;
		}
	}, 1000);
}
