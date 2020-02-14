// hidden at startup
document.getElementById("userInput").style.display = "none";
document.getElementById("highscoreTitle").style.display = "none";
document.querySelector(".scoreBtn").style.display = "none";

// global variables
var initialsForm = document.querySelector("#initials-form");
var scoreList = document.querySelector("#score-list");
var initialsInput = document.getElementById("initials-text");
var timer = document.getElementById("countdown");
var questionSpot = document.querySelector(".question");
var choicesSpot = document.querySelector(".buttons");
var resultSpot = document.querySelector(".result");
var resultsTitleEl = document.querySelector("#resultsTitle");
var clearBtn = document.querySelector("#clear-btn");
var submitBtn = document.querySelector("#submit-btn");

var highScores = [];
var timeInterval;
var time = 50;

var questions = [
    {
        question: "Empty strings are:",
        options: ["Empty", "Truthy", "Boring", "Falsy"],
        correct: 3
    },
    {
        question: "Objects are enclosed within __________.",
        options: ["Quotes", "Parentheses", "Curly Brackets", "Square Brackets"],
        correct: 2
    },
    {
        question: "Arrays are enclosed within ____________.",
        options: ["Quotes", "Parentheses", "Curly Brackets", "Square Brackets"],
        correct: 3
    },
    {
        question: "Under what HTML tag does one write the JavaScript code?",
        options: ["<JavaScript>", "<script>", "<h1>", "<p>"],
        correct: 1
    },
    {
        question:
            "What is the correct syntax for adding comments in JavaScript?",
        options: ["// comment", "<! comment", "** comment", "- comment"],
        correct: 0
    },
    {
        question: "What is the correct syntax for printing to the console?",
        options: ["console()", "log.console", "print()", "console.log()"],
        correct: 3
    },
    {
        question: "What would you use to cycle through an array?",
        options: ["return", "for loop", "eventListener", "console.log()"],
        correct: 1
    }
];

// start questions page
function onQuestionsLoad() {
    if (document.getElementById("questionsPage")) {
        resultSpot.textContent = "You can do it!";
        var timeInterval = setInterval(function() {
            time--;
            timer.textContent = "You have " + time + " seconds left";
            if (time === 0) {
                clearInterval(timeInterval);
                resultsPage();
            }
        }, 1000);

        function insertQuestion() {
            for (let j = 0; j < 1; j++) {
                questionSpot.textContent = questions[j].question;
                for (var i = 0; i < questions[j].options.length; i++) {
                    var button = document.createElement("button");
                    button.textContent = questions[j].options[i];
                    button.setAttribute("class", i);
                    button.style.outlineColor = "#122414";
                    choicesSpot.appendChild(button);
                }
            }
        }

        choicesSpot.addEventListener("click", function(event) {
            if (event.target.classList.contains(questions[0].correct)) {
                resultSpot.textContent = "Previous question was correct";
                remove();
            } else {
                resultSpot.textContent = "Previous question was wrong";
                if (time > 5) {
                    time = time - 5;
                    remove();
                } else if (time <= 5) {
                    time = 0;
                }
            }
            if (questions.length > 1) {
                questions.shift();
                insertQuestion();
            } else {
                clearInterval(timeInterval);
                resultsPage();
            }
        });

        insertQuestion();
    }
}

// start results page
function resultsPage() {
    clearInterval(timeInterval);
    document.getElementById("userInput").style.display = "block";
    document.getElementById("highscoreTitle").style.display = "block";
    document.querySelector(".scoreBtn").style.display = "inline";

    timer.textContent = "Your score is " + time;
    resultSpot.textContent = "";
    remove();
    while (questionSpot.hasChildNodes()) {
        questionSpot.removeChild(questionSpot.firstChild);
    }
    var h1 = document.createElement("h1");
    h1.textContent = "Results";
    resultsTitleEl.appendChild(h1);
    var p = document.createElement("p");
    p.textContent =
        "Add your score to the list below and see if you can beat it next time!";
    questionSpot.appendChild(p);

    submitBtn.addEventListener("click", function() {
        initialsForm.style.display = "none";
    });
}
function remove() {
    while (choicesSpot.hasChildNodes()) {
        choicesSpot.removeChild(choicesSpot.firstChild);
    }
}

// highscore list and storage
function renderScores() {
    scoreList.innerHTML = "";
    for (var i = 0; i < highScores.length; i++) {
        var addedInitials = highScores[i];
        var li = document.createElement("li");
        li.textContent = addedInitials;
        li.setAttribute("data-index", i);
        scoreList.appendChild(li);
    }
}
function resetHighscore() {
    highScores = [];
    renderScores();
    storeScores();
}
function storage() {
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedScores !== null) {
        highScores = storedScores;
        renderScores();
    }
}
function storeScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

initialsForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var initialsText = initialsInput.value.trim();
    if (initialsText === "") {
        return;
    }
    highScores.push(initialsText + " | Score: " + time);
    initialsInput.value = "";
    storeScores();
    renderScores();
});

clearBtn.addEventListener("click", resetHighscore);

// function calls
onQuestionsLoad();
renderScores();
storage();
