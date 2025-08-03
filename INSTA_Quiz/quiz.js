const quizData = {
  history: [
    {
      question: "Who was the first President of the USA?",
      options: ["Lincoln", "Washington", "Adams", "Jefferson"],
      answer: "Washington"
    },
    {
      question: "In which year did World War II end?",
      options: ["1945", "1939", "1918", "1965"],
      answer: "1945"
    }
  ],
  science: [
    {
      question: "What planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Saturn"],
      answer: "Mars"
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "HO"],
      answer: "H2O"
    }
  ]
};

let currentQuestion = 0;
let score = 0;
let selectedQuiz = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreBox = document.getElementById("score-box");

const menu = document.getElementById("menu");
const quiz = document.getElementById("quiz");

// 🚀 Start quiz with random questions from all topics
function startRandomQuiz() {
  const allQuestions = Object.values(quizData).flat();
  selectedQuiz = allQuestions.sort(() => Math.random() - 0.5).slice(0, 5); // Pick 5 random

  menu?.classList.add("hidden");
  quiz.classList.remove("hidden");
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  const q = selectedQuiz[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => selectOption(li, q.answer));
    optionsEl.appendChild(li);
  });

  nextBtn.disabled = true;
}

function selectOption(selected, correctAnswer) {
  const options = optionsEl.querySelectorAll("li");
  options.forEach(li => {
    li.removeEventListener("click", () => {});
    if (li.textContent === correctAnswer) {
      li.classList.add("correct");
    } else {
      li.classList.add("incorrect");
    }
    li.style.pointerEvents = "none";
  });

  if (selected.textContent === correctAnswer) {
    score++;
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < selectedQuiz.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.classList.add("hidden");
  scoreBox.textContent = `Your Score: ${score} / ${selectedQuiz.length}`;
  scoreBox.classList.remove("hidden");
}

// 🎯 Auto-start quiz on page load
window.onload = () => {
  startRandomQuiz();
};
