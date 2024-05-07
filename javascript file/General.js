let currentQuestion = 0; // Variable to keep track of the current question index
let score = 0; // Variable to keep track of the user's score
let timeinterval; // Variable to store the setInterval ID for the timer

//arrays that storing objects od question and answer
// Array of questions

const questions = [
  {
    question:"What is the goal of artificial intelligence?",
    answer:["To simulate human intelligence","To replace human intelligence","To enhance human intelligence","To mimic animal intelligence"],
    correctAnswer:"To simulate human intelligence",
  },
  {
    question:
      "Which programming language is commonly used for developing AI applications?",
    answers: ["Python", "Java", "C++", "JavaScript"],
    correctAnswer: "Python",
  },

  {
    question:
      "What type of AI system can perform tasks that typically require human intelligence?",
    answers: [
      "Strong AI",
      "Weak AI",
      "Artificial general intelligence (AGI)",
      "Narrow AI",
    ],
    correctAnswer: "Strong AI",
  },

  {
    question: "Which company's AI assistant is known as Siri?",
    answers: ["Apple", "Google", "Microsoft", "Amazon"],
    correctAnswer: "Apple",
  },
  {
    question:
      "What is the term for the process of an AI system learning from its mistakes?",
    answers: [
      "Reinforcement learning",
      "Deep learning",
      "Unsupervised learning",
      "Neural learning",
    ],
    correctAnswer: "Reinforcement learning",
  },

  {
    question:
      "Which branch of AI focuses on the development of systems that can understand, interpret, and respond to human language?",
    answers: [
      "Natural Language Processing",
      "Computer Vision",
      "Robotics",
      "Expert Systems",
    ],
    correctAnswer: "Natural Language Processing",
  },

  {
    question:
      "Which AI technique involves dividing a problem into subproblems and solving them independently before combining the results?",
    answers: [
      "Divide and conquer",
      "Heuristic search",
      "Backtracking",
      "Brute force",
    ],
    correctAnswer: "Divide and conquer",
  },

  {
    question:
      "Which AI technique involves predicting future events based on historical data?",
    answers: [
      "Time series forecasting",
      "Sequence generation",
      "Clustering",
      "Dimensionality reduction",
    ],
    correctAnswer: "Time series forecasting",
  },
  {
    question:
      "What is the term for an AI system's ability to explain its reasoning and decision-making process?",
    answers: [
      "Interpretability",
      "Transparency",
      "Explainability",
      "Accountability",
    ],
    correctAnswer: "Explainability",
  },
  {
    question:
      "Which AI application involves training computers to interpret and understand visual information from the environment?",
    answers: [
      "Computer Vision",
      "Natural Language Processing",
      "Speech Recognition",
      "Recommender Systems",
    ],
    correctAnswer: "Computer Vision",
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
