let currentQuestion = 0; // Variable to keep track of the current question index
let score = 0; // Variable to keep track of the user's score
let timeinterval; // Variable to store the setInterval ID for the timer

//arrays that storing objects od question and answer
const questions = [
  {
    question:
      "  Question 1:Which elements take up their own line of space and do not overlap with each other ?",
    answers: ["Block Level", "Floating", "Inline Level", "All of the above"],
    correctAnswer: "Block Level",
  },

  {
    question:
      "Question 2:The CSS position property can take which of the following values? ",
    answers: ["Sticky", "Absolute", "Relative", "All of the above"],
    correctAnswer: "All of the above",
  },
  {
    question:
      "Question 3:Which CSS property is used to make an element float to the left or right?",
    answers: ["Position", "Float", "Display", "Margin"],
    correctAnswer: "Float",
  },
  {
    question:
      "Question 4:which tag can contain different elements for collecting username, password, email id,Date of birth, check box, radio buttons ?",
    answers: ["body", "main", "form", "header"],
    correctAnswer: "form",
  },
  {
    question:
      " Question 5:what from the following Specifies a short hint of the expected value in html ?",
    answers: ["Title", "Value", "Placeholder", "Name"],
    correctAnswer: "Placeholder",
  },
  {
    question:
      " Question 6:Which of the following often used in a form to collect user information like comments,messages, reviews, etc ?",
    answers: ["Text", "Input", "Label", "Textarea"],
    correctAnswer: "Textarea",
  },
  {
    question:
      " Question 7:Which of following attributes  are used to specify the size of the text area ?",
    answers: ["Rows and Cols", "Width and Height", "Padding", "Both a and b"],
    correctAnswer: "Rows and Cols",
  },
  {
    question:
      "Question 8:Which of the following is a two-dimensional layout model with rows and columns to design webpages. ?",
    answers: ["Flex", "Grid", "Position", "Bo Model"],
    correctAnswer: "Grid",
  },
  {
    question:
      "Question 9: Which CSS property is used to specify the type of cursor to be displayed when hovering over an element?",
    answers: ["mouse-pointer", "hover-cursor", "cursor-type", "cursor"],
    correctAnswer: "cursor",
  },
  {
    question:
      " Question 10:After submission of form, form values will be visible in the address bar of the browser tab. So for sending sensitive information the which method should not be used ?",
    answers: ["Action", "Get", "Post", "None of the above"],
    correctAnswer: "Get",
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
