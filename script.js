var timer = document.getElementById('countdown');
var questionSpot = document.querySelector('.question');
var choicesSpot = document.querySelector('.buttons');
var resultSpot = document.querySelector('.result');

var timeLeft = 74;

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
questions.shift();

function onQuestionsLoad() {
    if (document.getElementById('questionsPage')) {
        function scoreTimer() {
            var timeInterval = setInterval(function() {
                timer.textContent = 'You have ' + timeLeft + ' seconds left';
                timeLeft--;
                if (timeLeft === -1) {
                    clearInterval(timeInterval);
                    window.location.replace('results.html');
                }
            }, 1000);
        }

        scoreTimer();

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
                if (timeLeft > 4) {
                    timeLeft = timeLeft - 5;
                    while (choicesSpot.hasChildNodes()) {
                        choicesSpot.removeChild(choicesSpot.firstChild);
                    }
                } else {
                    window.location.replace('results.html');
                }
            }
            if (questions.length > 1) {
                questions.shift();
                console.log(questions);
                insertQuestion();
            } else {
                window.location.replace('results.html');
            }
        });

        insertQuestion();
    }
}
onQuestionsLoad();
