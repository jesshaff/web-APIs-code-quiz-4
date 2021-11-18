// Start Button

// Timer starts - presented with 1st question

// Question is answered - presented with 2nd question

// Answer incorrectly time is subtracted from clock

// All questions answered or timer reaches zero then the game is over

// Save my initials and score

// Elements
var timerEL = document.querySelector('#time');
var startBtn = document.querySelector('#start');
var questionsEL = document.querySelector('#questions');
var choicesEL = document.querySelector('#choices');
var initialsEl = document.querySelector('#initials');
var submitBtn = document.querySelector('#submit');

var currentQuestionIn = 0;
var time = questions.length * 15;
var timerId = '';

function startQuiz() {
    // hide from start screen
    var startPageEl = document.getElementById("start-page");
    startPageEl.setAttribute("class", "hidden");

    // un-hiding questions
    questionsEL.removeAttribute("class");

    // start timer
    timerId = setInterval(clockTick, 1000);
    timerEL.textContent = time;

    getQuestion();
}