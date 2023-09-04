document.addEventListener("DOMContentLoaded", function () {
    let score = 0;
    let time = 30;
    let gameInterval;
    let targetInterval;
    let isGameStarted = false;
    let targetSpeed = 1000;
    let isTargetClickable = true;
    let defaultTargetSpeed = 1000;

    const target = document.getElementById("target");
    const background = document.getElementById("background");
    const scoreDisplay = document.getElementById("score");
    const timeDisplay = document.getElementById("time");
    const startButton = document.getElementById("start-button");
    const stopButton = document.getElementById("stop-button");
    const saveButton = document.getElementById("save-button");
    const increaseDifficultyButton = document.getElementById("increase-difficulty");
    const decreaseDifficultyButton = document.getElementById("decrease-difficulty");
    const setDefaultDifficultyButton = document.getElementById("set-default-difficulty");
    const gameContainer = document.getElementById("game-container");
    const scoreList = document.getElementById("score-list");

    startButton.addEventListener("click", startGame);
    stopButton.addEventListener("click", stopGame);
    saveButton.addEventListener("click", saveScore);
    increaseDifficultyButton.addEventListener("click", increaseDifficulty);
    decreaseDifficultyButton.addEventListener("click", decreaseDifficulty);
    setDefaultDifficultyButton.addEventListener("click", setDefaultDifficulty);

    function startGame() {
        if (!isGameStarted) {
            isGameStarted = true;
            score = 0;
            time = 30;
            startButton.disabled = true;
            stopButton.disabled = false;
            target.style.backgroundColor = "red";
            updateScore();
            updateTime();
            gameInterval = setInterval(decreaseTime, 1000);
            targetInterval = setInterval(moveTarget, targetSpeed);
            target.addEventListener("click", handleTargetClick);
            gameContainer.addEventListener("click", handleEmptyAreaClick);
        }
    }

    function stopGame() {
        isGameStarted = false;
        clearInterval(gameInterval);
        clearInterval(targetInterval);
        startButton.disabled = false;
        stopButton.disabled = true;
        target.style.backgroundColor = "red";
        target.removeEventListener("click", handleTargetClick);
        gameContainer.removeEventListener("click", handleEmptyAreaClick);
    }

    function saveScore() {
        const listItem = document.createElement("li");
        listItem.textContent = `Score: ${score}`;
        scoreList.appendChild(listItem);
    }

    function decreaseTime() {
        time -= 1;
        updateTime();
        if (time === 0) {
            stopGame();
        }
    }

    function moveTarget() {
        const maxX = 750;
        const maxY = 550;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;
        isTargetClickable = true;
        target.style.backgroundColor = "red";
    }

    function handleTargetClick() {
        if (isTargetClickable) {
            score += 1;
            updateScore();
            target.style.backgroundColor = "green";
            isTargetClickable = false;
            setTimeout(() => {
                target.style.backgroundColor = "red";
            }, 500);
        } else {
            score -= 0.5;
            if (score < 0) {
                score = 0;
            }
            updateScore();
        }
    }

    function handleEmptyAreaClick(event) {
        if (isGameStarted && event.target === gameContainer) {
            score -= 0.5;
            if (score < 0) {
                score = 0;
            }
            updateScore();
        }
    }

    function updateScore() {
        scoreDisplay.textContent = score.toFixed(1);
    }

    function updateTime() {
        timeDisplay.textContent = time;
    }

    function increaseDifficulty() {
        if (!isGameStarted) {
            targetSpeed -= 100;
            if (targetSpeed < 100) {
                targetSpeed = 100;
            }
            clearInterval(targetInterval);
            targetInterval = setInterval(moveTarget, targetSpeed);
        }
    }

    function decreaseDifficulty() {
        if (!isGameStarted) {
            targetSpeed += 100;
            clearInterval(targetInterval);
            targetInterval = setInterval(moveTarget, targetSpeed);
        }
    }

    function setDefaultDifficulty() {
        if (!isGameStarted) {
            targetSpeed = defaultTargetSpeed;
            clearInterval(targetInterval);
            targetInterval = setInterval(moveTarget, targetSpeed);
        }
    }
});
