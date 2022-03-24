//These are the game questions
var myQuestions = [
  {
    question: "Which primitive type returns a True/False response?",
    a: "String",
    b: "Boolean",
    c: "Number",
    d: "None of these",
    correctAnswer: "Boolean",
  },
  {
    question:
      "How would you check the console.log to verify what type a varible is?",
    a: "console.log(typeof)",
    b: "console.log(saywhat)",
    c: "consolelog.(typeof)",
    d: "console.log(return)",
    correctAnswer: "console.log(typeof)",
  },
  {
    question:
      "What is the best definition of a varible as it pertains to JavaScript?",
    a: "A collection of properties in the form of name and value pairs.",
    b: "A conainer for storing data",
    c: "An action that can be preformed on an object",
    d: "All of the above",
    correctAnswer: "A conainer for storing data",
  },
  {
    question:
      "A list of related values separated by a , and is enclosed with []",
    a: "Function",
    b: "Loop",
    c: "Array",
    d: "randomIndex",
    correctAnswer: "Array",
  },
  {
    question:
      "How would you find a randomIndex assuming the name of your array is myArray?",
    a: "Math.floor(Math.random() * myArray.length",
    b: "Math.roof(Math.random() * myArray.length",
    c: "Science.floor(Science.random() * myArray.length",
    d: "None of the above",
    correctAnswer: "Math.floor(Math.random() * myArray.length",
  },
  {
    question: "Using conditional statments you can",
    a: "Use an if statement when a condition is met",
    b: "Use an else statement when a condition is false",
    c: "Use an else if statement when another condition is true",
    d: "all are true",
    correctAnswer: "all are true",
  },
  {
    question: "Functions,",
    a: "Make parts of code reusable",
    b: "Must be invoked to start",
    c: "Can calculate values",
    d: "All of these are correct",
    correctAnswer: "All of these are correct",
  },
  {
    question: "A function is invoked with",
    a: "[]",
    b: "(())",
    c: "()",
    d: "{}",
    correctAnswer: "()",
  },
  {
    question: "How many sections do for loops have?",
    a: "5",
    b: "2",
    c: "42",
    d: "3",
    correctAnswer: "3",
  },
  {
    question:
      "Which of the following is not one of the three sections of a for loop?",
    a: "Initialing a value for the counter variable",
    b: "Defines the exit condition",
    c: "Defines how the counter variable is to be changed after each loop is run",
    d: "Defines the array variable",
    correctAnswer: "Defines the array variable",
  },
];

//These are the global variables
var questionIndex = 0;
var answerIndex = 0;
var score = 0;
var correctAnswerCount = 0;

let timerInterval;

var startGameEl = document.getElementById("startGame");
var hideInstructionsEl = document.getElementById("startContainer");
var questionsEl = document.getElementById("questions");
var answerAEl = document.getElementById("answerA");
var answerBEl = document.getElementById("answerB");
var answerCEl = document.getElementById("answerC");
var answerDEl = document.getElementById("answerD");
var gameStatsEl = document.getElementById("gamestats");
var correctCountEl = document.getElementById("correctCount");
var highScoreEl = document.getElementById("highScore");
var storedHighScore = localStorage.getItem("highScoreEl");
var highScoreInitialsEl = document.getElementById("initials");
var initialsSubmitButtonEl = document.getElementById("submit");
var leaderBoardInitialsEl = document.getElementById("leaderBoardInitials");
var liMaker = (text) => {
  var li = document.createElement("li");
  li.textContent = highScoreInitialsEl;
  leaderBoardInitialsEl.appendChild(li);
};

//Event listener attached to start button to begin game
//Hides the instructions paragraph
//Displays the questions and answers
startGameEl.addEventListener("click", function (event) {
  console.log("start button pressed");
  hideInstructionsEl.style.display = "none";
  questionsEl.style.display = "block";
  answerAEl.style.display = "block";
  answerBEl.style.display = "block";
  answerCEl.style.display = "block";
  answerDEl.style.display = "block";
  gameStatsEl.style.display = "block";


    //Allows user to click on an answer choice, have the answer checked and then moves on to the next question
  function handleButtonClick(event) {
    event.preventDefault();
    checkAnswer(event.target.innerText);
    console.log("a choice has been pressed");
    questionIndex++;
    askQuestion();
  }

  answerAEl.addEventListener("click", handleButtonClick);
  answerBEl.addEventListener("click", handleButtonClick);
  answerCEl.addEventListener("click", handleButtonClick);
  answerDEl.addEventListener("click", handleButtonClick);

  
  //Goes through all questions til questions run out
  function askQuestion() {
    console.log(questionIndex);
    if (questionIndex >= myQuestions.length) {
      gameOver();
    } else {
      questionsEl.textContent = myQuestions[questionIndex].question;
      answerAEl.textContent = myQuestions[questionIndex].a;
      answerBEl.textContent = myQuestions[questionIndex].b;
      answerCEl.textContent = myQuestions[questionIndex].c;
      answerDEl.textContent = myQuestions[questionIndex].d;
    }
  }
  //Invokes these functions
  askQuestion();
  startTimer();
  restoreHighScore();
 });

//Keeps track to correct answers
function updateCorrectCount() {
  correctCountEl.textContent = correctAnswerCount;
  correctAnswerCount++;
}

//Alerts user if their answer is correct or not
function checkAnswer(answer) {
  console.log(answer, myQuestions[questionIndex].correctAnswer);
  if (answer === myQuestions[questionIndex].correctAnswer) {
    alert("Correct!!");
    updateCorrectCount();
  } else {
    alert("Nope! That's not right.");
    timeRemaining -= 10;
    if (timeRemaining <=0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }
  console.log("total answered correctly", correctAnswerCount);
}

//Ends the gmae and sends high score to local storage
function gameOver() {
  alert("Thank you for playing!");
  clearInterval(timerInterval);
  localStorage.setItem("highScoreEl", correctAnswerCount);
  if (correctAnswerCount > storedHighScore) {
  }
}

function restoreHighScore() {
  var storedHighScore = localStorage.getItem("highScoreEl");
  console.log("high score is", storedHighScore);
  highScoreEl.textContent = storedHighScore;
}
initialsSubmitButtonEl.addEventListener("click", function (event) {
  console.log("initials submited", highScoreInitialsEl);
  liMaker(highScoreInitialsEl.value);
  input.value = "";
});

//timer vars and function to run the timer
var timeRemaining = 60;
var timeRemainingEl = document.getElementById("countdown");

function startTimer() {
  timerInterval = setInterval(function () {
    timeRemaining--;
    if (timeRemaining === 0) {
      clearInterval(timerInterval);
      gameOver();
    }
    document.getElementById("countdown").textContent = timeRemaining;
    console.log("interval running");
  }, 1000);
}
