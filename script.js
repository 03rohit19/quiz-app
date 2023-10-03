const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: " Which is the largest fresh water Lake in India ?",
    answers: [
      { text: "Wullar Lake, Jammu and Kashmir", correct: true },
      { text: "Pulikat Lake, Andhra Pradesh", correct: false },
      { text: "Dal Lake, Jammu and Kashmir", correct: false },
      { text: "Kuttanad Lake, Kerala", correct: false },
    ],
  },

  {
    question: "Which is the largest Delta in India ?",
    answers: [
      { text: "Hugli River, West Bengal", correct: false },
      { text: "Sundarbans, West Bengal", correct: true },
      { text: "Kaveri Delta, Karnataka", correct: false },
      { text: " Krishna Delta, Andhra Pradesh", correct: false },
    ],
  },
  {
    question: "Which is the largest Dome in India ?",
    answers: [
      { text: "Tajmahal, Agra", correct: false },
      { text: "Fatehpur Sikri, Agra", correct: false },
      { text: "Gol Gumbaz, Bijapur, Karnataka", correct: true },
      { text: "Amber Palace, Amer, Rajasthan", correct: false },
    ],
  },
  {
    question: "Which is the largest Museum in India ?",
    answers: [
      { text: "Nehru Museum, New Delhi", correct: false },
      { text: "Indian Museum, Kolkata", correct: true },
      { text: "Sararjang Museum, Hyderabad", correct: false },
      { text: "None of these", correct: false },
    ],
  },
];

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answerbutton");
const nextButtonEl = document.getElementById("btn-nxt");

let currentQuesIndex = 0;
let score = 0;

function startQuiz() {
  currentQuesIndex = 0;
  score = 0;
  nextButtonEl.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currQues = questions[currentQuesIndex];
  let quesNum = currentQuesIndex + 1;
  questionEl.innerHTML = quesNum + "." + currQues.question;

  currQues.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerEl.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButtonEl.style.display = "none";
  while (answerEl.firstChild) {
    answerEl.removeChild(answerEl.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerEl.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButtonEl.style.display = "block";
}

function showScore() {
  resetState();
  questionEl.innerHTML = `You scored ${score} out of the ${questions.length}!`;
  nextButtonEl.innerHTML = "Start Quiz Again";
  nextButtonEl.style.display = "block";
}

function handleNextBtn() {
  currentQuesIndex++;
  if (currentQuesIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButtonEl.addEventListener("click", () => {
  if (currentQuesIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();
