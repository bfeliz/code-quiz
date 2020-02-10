var timer = document.getElementById('countdown');
var questionSpot = document.querySelector('.question');
var choicesSpot = document.querySelector('.buttons');
var resultSpot = document.querySelector('.result');
var finalScore = document.querySelector('#showResults');
var initialsInput = document.querySelector('#userInput');
var addScore = document.querySelector('#highScoreList');
var scoreButton = document.querySelector('#button-addon2');

var highScores = [];
var timeInterval;
var time = 20;

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
                timer.textContent = 'Your score is ' + time;
                resultSpot.textContent = '';
                while (choicesSpot.hasChildNodes()) {
                    choicesSpot.removeChild(choicesSpot.firstChild);
                }
                while (questionSpot.hasChildNodes()) {
                    questionSpot.removeChild(questionSpot.firstChild);
                }
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
                    timer.textContent = 'Your score is ' + time;
                    resultSpot.textContent = '';
                    while (questionSpot.hasChildNodes()) {
                        questionSpot.removeChild(questionSpot.firstChild);
                    }
                }
            }
            if (questions.length > 1) {
                questions.shift();
                console.log(questions);
                insertQuestion();
            } else {
                clearInterval(timeInterval);
                timer.textContent = 'Your score is ' + time;
                resultSpot.textContent = '';
                while (questionSpot.hasChildNodes()) {
                    questionSpot.removeChild(questionSpot.firstChild);
                }
            }
        });

        insertQuestion();
    }
}
// if (document.getElementById('resultsPage')) {
//     finalScore.textContent = time;

//     renderHighscore();

//     function renderHighscore() {
//         for (let i = 0; i < highScores.length; i++) {
//             var score = highScores[i];

//             var li = document.createElement('li');
//             li.textContent = score;
//             todoList.appendChild(li);
//         }
//     }

//     scoreButton.addEventListener('click', function(event) {
//         event.preventDefault();

//         var initialsText = initialsInput.value.trim();

//         if (initialsText === '') {
//             return;
//         }
//         highScores.push(initialsText);
//         initialsInput.value = '';

//         renderHighscore();
//     });
// }
onQuestionsLoad();
