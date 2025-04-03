function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
window.addEventListener("resize", setVh);
setVh();

let userInBrowser = false;
let userStart = false;
let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let timeLeft = 120;
let timeOver = false;
let timerInterval;

function startQuiz() {
  const quizContainer = document.querySelector(".quiz-container");
  const buttonStartContainer = document.querySelector(".button-start");
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", function () {
    userStart = true;
    buttonStartContainer.style.display = "none";
    quizContainer.classList.remove("none");
    startTimer();
    loadQuestion(currentQuestion);
  });
}


function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer").innerHTML = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;

    if (timeLeft <= 0 && !timeOver) {
      timeOver = true;
      clearInterval(timerInterval);
      document.getElementById("timer").innerHTML = "0:00";
      alert("Waktu habis!");
      calculateScore();
      showScore();
    }

    if (timeLeft > 0) timeLeft--;
  }, 1000);
}

function loadQuestion(index) {
  document.getElementById("question-number").textContent = `Quiz ${index + 1}/${
    questions.length
  }`;
  document.getElementById("question-text").textContent =
    questions[index].question;

  const optionsEl = document.getElementById("options");
  optionsEl.textContent = "";

  questions[index].options.forEach((option, i) => {
    const div = document.createElement("div");
    div.className = "option-box";
    div.innerHTML = option;
    div.onclick = function () {
      userAnswers[index] = i;
      document
        .querySelectorAll(".option-box")
        .forEach((el) => el.classList.remove("selected"));
      div.classList.add("selected");
      document.getElementById("nextBtn").disabled = false;
    };

    document.getElementById("resetBtn").addEventListener("click", function () {
      div.classList.remove("selected");
      document.getElementById("nextBtn").disabled = true;
    });

    if (userAnswers[index] === i) {
      div.classList.add("selected");
    }

    optionsEl.appendChild(div);
  });

  document.getElementById("nextBtn").disabled = userAnswers[index] === null;
}

function calculateScore() {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });
  document.getElementById("score").innerHTML = score;

  const sticker = document.getElementById("sticker");
  if (score >= 9) {
    sticker.setAttribute(
      "src",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwPnLJVw515woobpzlR807J_wxOsbgksvagQzdEDV7-8bQ85CeWXbTgSE&s=10"
    );
  } else if (score >= 7) {
    sticker.setAttribute(
      "src",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwPnLJVw515woobpzlR807J_wxOsbgksvagQzdEDV7-8bQ85CeWXbTgSE&s=10"
    );
  } else if (score >= 3) {
    sticker.setAttribute(
      "src",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGZa9e0hhgnIvdCbcsEKv4PZkAcvWPJaFPSBig8y9At8oAWy-AnvIuu8LH&s=10"
    );
  } else if (score >= 0) {
    sticker.setAttribute(
      "src",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzFz20-8UngpUpmTiqVrmTTkZp79Q06hg_HOMq0cvTqK-USiwmk6pVdSw&s=10"
    );
  }
}

function showScore() {
  userInBrowser = true;
  document.getElementById("quiz").style.display = "none";
  document.querySelector(".navigation").style.display = "none";
  document.getElementById("scoreContainer").style.display = "block";
}

document.getElementById("nextBtn").addEventListener("click", function () {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  } else {
    clearInterval(timerInterval);
    calculateScore();
    showScore();
  }
});

document.getElementById("prevBtn").addEventListener("click", function () {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
});

document.addEventListener("visibilitychange", function () {
  if (!document.hidden && !userInBrowser && userStart) {
    alert("jangan keluar dari browser😡");
    userAnswers = new Array(questions.length).fill(null);
    currentQuestion = 0;
    loadQuestion(currentQuestion);
  }
});

startQuiz();
