var timer = document.getElementById('countdown');

function onQuestionsLoad() {
    if (document.getElementById('questionsPage')) {
        function scoreTimer() {
            var timeLeft = 10;

            var timeInterval = setInterval(function() {
                timer.textContent = timeLeft;
                timeLeft--;

                if (timeLeft === 0) {
                    timer.textContent = '';
                    clearInterval(timeInterval);
                    window.location.replace('results.html');
                }
            }, 1000);
        }

        scoreTimer();
    }
}
onQuestionsLoad();
