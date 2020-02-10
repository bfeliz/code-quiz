document.getElementById('userInput').style.display = 'none';
document.getElementById('highscoreTitle').style.display = 'none';
document.querySelector('.scoreBtn').style.display = 'none';

var initialsForm = document.querySelector('#initials-form');
var scoreList = document.querySelector('#score-list');
var initialsInput = document.getElementById('initials-text');
var timer = document.getElementById('countdown');
var questionSpot = document.querySelector('.question');
var choicesSpot = document.querySelector('.buttons');
var resultSpot = document.querySelector('.result');
var resultsTitleEl = document.querySelector('#resultsTitle');
var clearBtn = document.querySelector('#clear-btn');

var highScores = [];
var timeInterval;
var time = 75;

var questions = [
    {
        question: 'Commonly used data types do NOT include:',
        options: ['Strings', 'Booleans', 'Alerts', 'Numbers'],
        correct: 2
    },
    {
        question:
            'The condition in an if/else statement is enclosed within __________.',
        options: ['Quotes', 'Parentheses', 'Curly Brackets', 'Square Brackets'],
        correct: 1
    },
    {
        question: 'Arrays in JavaScript can be used to store ___________.',
        options: [
            'Numbers and Strings',
            'Booleans',
            'Other Arrays',
            'All of the Above'
        ],
        correct: 3
    },
    {
        question:
            'String values must be enclosed within ________ when being assigned to variables.',
        options: ['Quotes', 'Commas', 'Curly Brackets', 'Parentheses'],
        correct: 0
    },
    {
        question:
            'A very useful tool during development and debugging for printing content to the debugger is:',
        options: ['JavaScript', 'Terminal', 'For Loops', 'Console Log'],
        correct: 3
    }
];

function onQuestionsLoad() {
    if (document.getElementById('questionsPage')) {
        var timeInterval = setInterval(function() {
            time--;
            timer.textContent = 'You have ' + time + ' seconds left';
            if (time === 0) {
                clearInterval(timeInterval);
                resultsPage();
            }
        }, 1000);

        function insertQuestion() {
            for (let j = 0; j < 1; j++) {
                questionSpot.textContent = questions[j].question;
                for (var i = 0; i < questions[j].options.length; i++) {
                    var button = document.createElement('button');
                    button.textContent = questions[j].options[i];
                    button.setAttribute('class', i);
                    choicesSpot.appendChild(button);
                }
            }
        }

        choicesSpot.addEventListener('click', function(event) {
            if (event.target.classList.contains(questions[0].correct)) {
                resultSpot.textContent = 'Previous question was correct';
                while (choicesSpot.hasChildNodes()) {
                    choicesSpot.removeChild(choicesSpot.firstChild);
                }
            } else {
                resultSpot.textContent = 'Previous question was wrong';
                if (time > 4) {
                    time = time - 5;
                    while (choicesSpot.hasChildNodes()) {
                        choicesSpot.removeChild(choicesSpot.firstChild);
                    }
                } else {
                    clearInterval(timeInterval);
                    resultsPage();
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

function resultsPage() {
    clearInterval(timeInterval);
    document.getElementById('userInput').style.display = 'block';
    document.getElementById('highscoreTitle').style.display = 'block';
    document.querySelector('.scoreBtn').style.display = 'inline';

    timer.textContent = 'Your score is ' + time;
    resultSpot.textContent = '';
    while (choicesSpot.hasChildNodes()) {
        choicesSpot.removeChild(choicesSpot.firstChild);
    }
    while (questionSpot.hasChildNodes()) {
        questionSpot.removeChild(questionSpot.firstChild);
    }
    var h1 = document.createElement('h1');
    h1.textContent = 'Results';
    resultsTitleEl.appendChild(h1);
    var p = document.createElement('p');
    p.textContent =
        'Add your score to the list below and see if you can beat it next time!';
    questionSpot.appendChild(p);
}

function renderScores() {
    scoreList.innerHTML = '';

    for (var i = 0; i < highScores.length; i++) {
        var addedInitials = highScores[i];

        var li = document.createElement('li');
        li.textContent = addedInitials;
        li.setAttribute('data-index', i);
        scoreList.appendChild(li);
    }
}

function resetHighscore() {
    highScores = [];
    renderScores();
    storeScores();
}

function storage() {
    var storedScores = JSON.parse(localStorage.getItem('highScores'));
    if (storedScores !== null) {
        highScores = storedScores;
        renderScores();
    }
}
function storeScores() {
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

initialsForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var initialsText = initialsInput.value.trim();

    if (initialsText === '') {
        return;
    }

    highScores.push(initialsText + ' | Score: ' + time);
    initialsInput.value = '';
    storeScores();
    renderScores();
});

clearBtn.addEventListener('click', resetHighscore);

onQuestionsLoad();
renderScores();
storage();
