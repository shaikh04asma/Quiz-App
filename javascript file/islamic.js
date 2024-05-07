let currentQuestion = 0; // Variable to keep track of the current question index
let score = 0; // Variable to keep track of the user's score
let timeinterval; // Variable to store the setInterval ID for the timer

//arrays that storing objects od question and answer
const questions = [
  {
    question: "Which Surah does not start with bismillah?",
    answers: ["Surah Tawbah", "Surah Al-Imraan", "Suran Al-Fatiha", "Surah Rahman"],
    correctAnswer: "Surah Tawbah",
  },
  
  {

    question: "Question 2:In which city was Prophet Muhammad (pbuh) born?",
    answers: ["Jerusalam", "Medina", "Mecca", "Baghdad"],
    correctAnswer: "Medina",
  },
  {
    question: "Question 3:Who built the Kaaba in Mecca?",
    answers: [
      "Prophet Musa(as)",
      "Prophet Muhammed(saw)",
      "Prophet Adam(as)",
      "Prophet Ibrahim(as)and prophet Ismail(as)",
    ],
    correctAnswer: "Prophet Adam(as)",
  },
  {
    question:
      "Question 4:Which prophet is known for building the Ark to save believers and animals from a great flood?",
    answers: [
      "Prophet Nuh (as)",
      "Prophet Musa (as)",
      "Prophet Isa (as)",
      "Prophet Ibrahim (as)",
    ],
    correctAnswer: "Prophet Nuh (as)",
  },
  {
    question:
      "Question 5:How many years did Prophet Muhammad (pbuh) receive revelations from Allah? ",
    answers: ["7 Years", "23 Years", "10 Years", "40 Years"],
    correctAnswer: "40 Years",
  },
  {
    question: "Question 6:Laylatul Qadr is better than how many months?",
    answers: ["1000", "10000", "10", "100"],
    correctAnswer: "1000",
  },
  {
    question:
      " Question 7:What is the Arabic term for the act of supplication and communication with Allah?",
    answers: ["Salah", "Dua", "Tawhedd", "Zikr"],
    correctAnswer: "Salah",
  },
  {
    question: "Question 8:Pillar of Islam are called?",
    answers: ["Arkanal Islam", "Qadr ul Islam", "Fi Amanillah", "Yusuf Islam"],
    correctAnswer: "Arkanal Islam",
  },
  {
    question: "Question 9:How Many surah are in Quran ?",
    answers: ["114 Surahs", "115 Surahs", "116 Surahs", "117 Surahs"],
    correctAnswer: "114 Surahs",
  },
  {
    question: "Question 10:How many parah in Quran?",
    answers: ["26 Parahs", "33 Parahs", "114 Parahs", "30 Parahs"],
    correctAnswer: "30 Parahs",
  },
];

// Array to store the time taken for each question
const questionTimes = [];

// Function to check the selected answer and record the time taken
function checkAnswer(btn) {
  const selectedAnswer = btn.textContent;
  const correctAnswer = questions[currentQuestion].correctAnswer;
  const answerButtons = document.querySelectorAll(".btn");

  // Record the time taken for the current question
  const currentTime =
    10 - parseInt(document.getElementById("timer").textContent);
  questionTimes.push(currentTime);

  // Check the selected answer
  if (selectedAnswer === correctAnswer) {
    score++;
    document.querySelector(".score").textContent = score;
    btn.style.backgroundColor = "green";
  } else {
    for (let i = 0; i < answerButtons.length; i++) {
      if (answerButtons[i].textContent === correctAnswer) {
        answerButtons[i].style.backgroundColor = "green";
      }
    }
    btn.style.backgroundColor = "red";
  }

  // Disable buttons after an answer is selected
  answerButtons.forEach((button) => {
    button.disabled = true;
  });

  // After processing the answer, move to the next question
  // nextQuestion();
}

// Function to move to the next question
function nextQuestion() {
  // Check if there are more questions
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    // Update question text and answer buttons
    const questionElement = document.getElementById("question");
    questionElement.textContent = `${questions[currentQuestion].question}`;
    const answerButtons = document.querySelectorAll(".btn");
    for (let i = 0; i < answerButtons.length; i++) {
      answerButtons[i].textContent = questions[currentQuestion].answers[i];
      answerButtons[i].style.backgroundColor = "";
      answerButtons[i].disabled = false;
    }
    // Update the progress
    updateProgress();
    // Reset the timer
    clearInterval(timeinterval);
    startTimer(10); // Change the timer duration here (e.g., 10 seconds)
  } else {
    // Construct the result URL with query parameters
    let resultUrl = `Result.html?totalQuestions=${
      questions.length
    }&attemptedQuestions=${currentQuestion + 1}&passFail=${
      score >= questions.length / 2 ? "Pass" : "Fail"
    }&correctAnswers=${score}&wrongAnswers=${
      questions.length - score
    }&percentage=${((score / questions.length) * 100).toFixed(2)}`;

    // Append time taken for each question to the URL
    for (let i = 0; i < questionTimes.length; i++) {
      resultUrl += `&time${i}=${questionTimes[i]}`;
    }

    // Redirect to the result page
    window.location.href = resultUrl;
  }
}

// Function to update the progress display
function updateProgress() {
  const progressElement = document.getElementById("progress");
  progressElement.textContent = `${currentQuestion + 1}/${questions.length}`;
}

// Function to start the timer
function startTimer(duration) {
  let timeleft = duration;
  const timer = document.getElementById("timer");
  timer.textContent = `${timeleft}`;
  timeleft--;
  timeinterval = setInterval(function () {
    if (timeleft > 0) {
      timer.textContent = `${timeleft}`;
      timeleft--;
    } else {
      clearInterval(timeinterval);
      timer.innerHTML = `Time's up`;
      nextQuestion();
    }
  }, 1000);
}

// Initialize the quiz
updateProgress();
startTimer(10); // Start the timer with a duration of 10 seconds
