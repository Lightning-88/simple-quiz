const questions = [
  {
    question:
      "Manakah elemen semantic HTML5 yang paling tepat untuk mendefinisikan area navigasi utama pada sebuah halaman web?",
    options: ["&lt;div&gt;", "&lt;section&gt;", "&lt;nav&gt;", "&lt;aside&gt;"],
    answer: 2,
  },
  {
    question: "Dalam penggunaan <canvas> di HTML5, apa tujuan utamanya?",
    options: [
      "Menyusun layout halaman secara responsif",
      "Menggambar grafik dinamis menggunakan JavaScript",
      "Menampilkan konten video secara streaming",
      "Mengintegrasikan file SVG ke dalam halaman",
    ],
    answer: 1,
  },
  {
    question: "Elemen <figure> dan <figcaption> digunakan bersamaan untuk?",
    options: [
      "Menyematkan video dan keterangan",
      "Menampilkan gambar atau ilustrasi beserta keterangan",
      "Membuat layout grid responsif",
      "Menyimpan data dinamis",
    ],
    answer: 1,
  },
  {
    question:
      "Manakah dari berikut ini yang merupakan elemen baru pada HTML5 untuk mendefinisikan artikel independen?",
    options: [
      "&lt;main&gt;",
      "&lt;section&gt;",
      "&lt;aside&gt;",
      "&lt;article&gt;",
    ],
    answer: 3,
  },
  {
    question: "Elemen <svg> digunakan untuk?",
    options: [
      "Menyisipkan video",
      "Menggambar grafik vektor langsung dalam dokumen HTML",
      "Menyimpan data XML",
      "Menggabungkan file CSS dan JavaScript",
    ],
    answer: 1,
  },
  {
    question: "Apa kegunaan atribut placeholder pada elemen <input> di HTML5?",
    options: [
      "Menentukan tipe data input",
      "Menyimpan nilai default permanen",
      "Menghubungkan input dengan label tertentu",
      "Menyediakan teks petunjuk sementara di dalam kotak input",
    ],
    answer: 3,
  },
  {
    question:
      "Manakah atribut yang wajib ada pada tag <img> agar gambar tetap dapat diakses oleh pengguna yang koneksinya jelek?",
    options: ["alt", "srcset", "title", "src"],
    answer: 0,
  },
  {
    question: "Dibawah ini yang termasuk element sematic HTML5 adalah...",
    options: ["&lt;aside&gt;", "&lt;div&gt;", "&lt;bottom&gt;", "Semua Salah"],
    answer: 0,
  },
  {
    question:
      "Di HTML5, elemen mana yang sebaiknya digunakan untuk menandai konten yang berisi navigasi tambahan atau sekunder?",
    options: [
      "&lt;nav&gt;",
      "&lt;aside&gt;",
      "&lt;footer&gt;",
      "&lt;section&gt;",
    ],
    answer: 0,
  },
  {
    question: "Apa fungsi dari elemen <mark> di HTML5?",
    options: [
      "Untuk menyisipkan komentar",
      "Untuk membuat teks menjadi italic",
      "Untuk menambahkan hyperlink",
      "Untuk menandai bagian teks yang penting atau relevan dengan konteks",
    ],
    answer: 3,
  },
];

document.addEventListener("visibilitychange", function () {
  if (!document.hidden) {
    alert("jangan keluar dari browser😡");
    window.location.reload();
  }
});

function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
window.addEventListener("resize", setVh);
setVh();

let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let timeLeft = 120;
let timeOver = false;
let timerInterval;

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
  const sticker = document.getElementById("sticker");
  if (score >= 9) {
    document.getElementById("score").innerHTML = score;
    sticker.setAttribute(
      "src",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwPnLJVw515woobpzlR807J_wxOsbgksvagQzdEDV7-8bQ85CeWXbTgSE&s=10"
    );
  } else if (score >= 7) {
    document.getElementById("score").innerHTML = score;
    sticker.setAttribute(
      "src",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwPnLJVw515woobpzlR807J_wxOsbgksvagQzdEDV7-8bQ85CeWXbTgSE&s=10"
    );
  } else if (score >= 3) {
    document.getElementById("score").innerHTML = score;
    sticker.setAttribute(
      "src",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGZa9e0hhgnIvdCbcsEKv4PZkAcvWPJaFPSBig8y9At8oAWy-AnvIuu8LH&s=10"
    );
  } else if (score >= 0) {
    document.getElementById("score").innerHTML = score;
    sticker.setAttribute(
      "src",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzFz20-8UngpUpmTiqVrmTTkZp79Q06hg_HOMq0cvTqK-USiwmk6pVdSw&s=10"
    );
  }
}

function showScore() {
  document.getElementById("quiz").style.display = "none";
  document.querySelector(".navigation").style.display = "none";
  document.getElementById("scoreContainer").style.display = "block";
}

document.getElementById("nextBtn").addEventListener("click", function () {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  } else {
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

startTimer();
loadQuestion(currentQuestion);
