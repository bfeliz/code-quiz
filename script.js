var timer = document.getElementById('countdown');
var questionSpot = document.querySelector('.question');

var questions = {
    question: 'Commonly used data types do NOT include:',
    options: ['Strings', 'Booleans', 'Alerts', 'Numbers'],
    correct: 3
};

function onQuestionsLoad() {
    if (document.getElementById('questionsPage')) {
        function scoreTimer() {
            var timeLeft = 9;

            var timeInterval = setInterval(function() {
                timer.textContent = timeLeft;
                timeLeft--;

                if (timeLeft === -2) {
                    timer.textContent = '';
                    clearInterval(timeInterval);
                    window.location.replace('results.html');
                }
            }, 1000);
        }

        scoreTimer();

        function insertQuestion() {
            var h4 = document.createElement('h4');
            h4.textContent = questions.question;
            questionSpot.appendChild(h4);

            for (var i = 0; i < questions.options.length; i++) {
                var button = document.createElement('button');
                button.textContent = questions.options[i];
                questionSpot.appendChild(button);
            }
        }
        insertQuestion();
    }
}
onQuestionsLoad();
