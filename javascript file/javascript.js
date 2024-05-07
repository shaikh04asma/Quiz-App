let currentQuestion = 0; // Variable to keep track of the current question index
let score = 0; // Variable to keep track of the user's score
let timeinterval; // Variable to store the setInterval ID for the timer

//arrays that storing objects od question and answer
// Array of questions
const questions = [
  {
    question: " Which of the following is not a valid JavaScript variable name?",
    answers: ["myVar","123Var","_myVar","$var"],
    correctAnswer: "123Var",
  },
  {
    question: "What is the result of 2 + 2?",
    answers: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  {
    question: "Which of the following keyword is not used to declare a variable?",
    answers: ["var", "let", "const", "variable"],
    correctAnswer: "variable",
  },
  {
    question: "What does 'NaN' stand for?",
    answers: [
      "Not a Number",
      "New Assignment",
      "No Action Needed",
      "Not Another Name",
    ],
    correctAnswer: "Not a Number",
  },
  {
    question: "What is the typeof operator used for in JavaScript?",
    answers: [
      "To check if a value is a number",
      "To check if a value is undefined",
      "To check the type of a value",
      "To convert a value to a string",
    ],
    correctAnswer: "To check the type of a value",
  },
  {
    question: "What does 'DOM' stand for?",
    answers: [
      "Document Object Model",
      "Data Object Model",
      "Dynamic Output Manipulation",
      "Designated Operating Memory",
    ],
    correctAnswer: "Document Object Model",
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    answers: ["//", "/*", "*/", "#"],
    correctAnswer: "//",
  },
  {
    question: "What is the result of '5' + 3 in JavaScript?",
    answers: ["8", "'53'", "53", "NaN"],
    correctAnswer: "'53'",
  },
  {
    question:
      "Which built-in method reverses the order of the elements of an array?",
    answers: [".reverse()", ".sort()", ".shift()", ".join()"],
    correctAnswer: ".reverse()",
  },
  {
    question: "What is the result of 10 == '10' in JavaScript?",
    answers: ["true", "false", "undefined", "NaN"],
    correctAnswer: "true",
  },
  {
    question:
      "Which function is used to print content to the console in JavaScript?",
    answers: ["console.log()", "print()", "display()", "log()"],
    correctAnswer: "console.log()",
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
