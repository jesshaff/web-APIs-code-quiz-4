// Elements
var timerEL = document.querySelector('#time');
var startBtn = document.querySelector('#start');
var questionsEL = document.querySelector('#questions');
var choicesEL = document.querySelector('#choices');
var initialsEl = document.querySelector('#initials');
var submitBtn = document.querySelector('#submit');
var feedbackEl = document.querySelector("#feedback");

var currentQuestionIn = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
    // hide from start screen
    var startingPageEl = document.getElementById("starting-page");
    startingPageEl.setAttribute("class", "hidden");

    // un-hiding questions
    questionsEL.removeAttribute("class");

    // start timer
    timerId = setInterval(clockTick, 1000);

    timerEL.textContent = time;

    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIn];

// update to current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

// clear previous question
    choicesEL.innerHTML = "";

// loop choices
    currentQuestion.choices.forEach(function(choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;

        choiceNode.onclick = questionClick;

        choicesEL.appendChild(choiceNode);
    });
}

function questionClick() {
    // check if question answered incorrectly
    if (this.value !== questions[currentQuestionIn].answer) {
        time -= 10;

        if(time < 0) {
            time = 0;
        }

            timerEL.textContent = time;
            feedbackEl.textContent = "Incorrect!";
            feedbackEl.style.color = "red";
            feedbackEl.style.fontSize = "200%";
    }   else {
            feedbackEl.textContent = "Correct!";
            feedbackEl.style.color = "green";
            feedbackEl.style.fontSize = "200%";
    }

    // flash "correct" when answered correctly 
    // flash "incorrect" when answered incorrectly
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hidden");
    }, 1000);

    currentQuestionIn++;

    if (currentQuestionIn === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    // stop the timer
    clearInterval(timerId);

    var endingPageEl = document.getElementById("ending-page");
    endingPageEl.removeAttribute("class");

    // display final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    // hide questions
    questionsEL.setAttribute("class", "hidden");
}

function clockTick() {
    // time updating
    time--;
    timerEL.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        // get saved scores from local storage

        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            score: time,
            initials: initials
        };

        // save to local storage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        window.location.href = "scores.html";
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}

// submit initials 
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;