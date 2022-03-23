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
];

function anything() {
  
  
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
  var correctCountEl = document.getElementById("correctCount");
  var highScoreEl = document.getElementById("highScore");
  var storedHighScore = localStorage.getItem("highScoreEl");

  //Click the start button to begin the game
  //
  startGameEl.addEventListener("click", function (event) {
    console.log("start button pressed");
    hideInstructionsEl.style.display = "none";

    function handleButtonClick(event) {
      event.preventDefault();
      checkAnswer(event.target.innerText);
      console.log("a has been pressed");
      questionIndex++;
      askQuestion();
    }

    answerAEl.addEventListener("click", handleButtonClick);
    answerBEl.addEventListener("click", handleButtonClick);
    answerCEl.addEventListener("click", handleButtonClick);
    answerDEl.addEventListener("click", handleButtonClick);

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
    askQuestion();
    startTimer();
    restoreHighScore();
  });
  
    function updateCorrectCount() {
    correctCountEl.textContent = (correctAnswerCount++);
   correctAnswerCount++;
  
}
  function checkAnswer(answer) {
    console.log(answer, myQuestions[questionIndex].correctAnswer);
    document.querySelector(".correctWrapper").classList.toggle("hidden");
    if (answer === myQuestions[questionIndex].correctAnswer) {
      alert("Correct!!");
      updateCorrectCount();
      //document.querySelector(".correctWrapper").innerText = "correct";
    } else {
      alert("Nope! That's not right.");
      timeRemaining -= 10;
      //document.querySelector(".correctWrapper").innerText = "wrong";
      //timeRemaining--;
    }
    console.log("total answered correctly", correctAnswerCount);
    //document.querySelector(".quizContainer").classList.toggle("hidden");
    //setTimeout(() => {
    // document.querySelector(".quizContainer").classList.toggle("hidden");
    // document.querySelector(".correctWrapper").classList.toggle("hidden");
    //}, 1000);
  }

  function gameOver() {
    document.querySelector(".quizContainer").innerHTML +=
      "<div>Game Over</div>";
    clearInterval(timerInterval);
    localStorage.setItem("highScoreEl", correctAnswerCount);
    if(correctAnswerCount > storedHighScore){

    }   
  }

  function restoreHighScore(){
    var storedHighScore = localStorage.getItem("highScoreEl");
    console.log("high score is", storedHighScore);
    highScoreEl.textContent = storedHighScore;
  }

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
}
anything();
