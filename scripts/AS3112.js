let lesson1Score = 0;
let lesson2Score = 0;

function checkProb(answer, q) {
  const correct = [2, 2, 2, 1, 1];
  let result = document.getElementById("probResult" + q);

  if (answer === correct[q - 1]) {
    result.innerHTML = "✅ Correct!";
    lesson1Score += 10;
  } else {
    result.innerHTML = "❌ Incorrect! Try again.";
  }
}

function checkRatio(answer, q) {
  const correct = [1, 1, 2, 1, 1];
  let result = document.getElementById("ratioResult" + q);

  if (answer === correct[q - 1]) {
    result.innerHTML = "✅ Correct!";
    lesson2Score += 10;
  } else {
    result.innerHTML = "❌ Incorrect! Try again.";
  }
}

function showQuiz(event) {
  let quiz = document.getElementById("quizSection");
  let button = event.target;

  if (quiz.style.display === "none" || quiz.style.display === "") {
    quiz.style.display = "block";
    button.innerHTML = "Hide Quiz";
  } else {
    quiz.style.display = "none";
    button.innerHTML = "Take Quiz";
  }
}

function showRatioQuiz(event) {
  let quiz = document.getElementById("ratioQuizSection");
  let button = event.target;

  if (quiz.style.display === "none" || quiz.style.display === "") {
    quiz.style.display = "block";
    button.innerHTML = "Hide Quiz";
  } else {
    quiz.style.display = "none";
    button.innerHTML = "Take Quiz";
  }
}

function toggleLearningActivity(event) {
  let section = document.getElementById("learningActivitySection");
  let button = event.target;

  if (section.style.display === "none" || section.style.display === "") {
    section.style.display = "block";
    button.innerHTML = "Hide Tutorials";
  } else {
    section.style.display = "none";
    button.innerHTML = "Tutorials";
  }
}

function toggleRatioLearningActivity(event) {
  let section = document.getElementById("ratioLearningActivitySection");
  let button = event.target;

  if (section.style.display === "none" || section.style.display === "") {
    section.style.display = "block";
    button.innerHTML = "Hide Tutorials";
  } else {
    section.style.display = "none";
    button.innerHTML = "Tutorials";
  }
}

function checkProbActivity() {
  let input = document.getElementById("probInput").value.trim();
  let result = document.getElementById("probActivityResult");

  if (input === "2/5" || input === "4/10") {
    result.innerHTML = "✅ Correct! Great work.";
  } else {
    result.innerHTML = "❌ Incorrect. Hint: Simplify 4/10.";
  }
}

function checkRatioActivity() {
  let input = document.getElementById("ratioInput").value;
  let result = document.getElementById("ratioActivityResult");

  if (parseInt(input) === 6) {
    result.innerHTML = "✅ Correct! Well done.";
  } else {
    result.innerHTML = "❌ Incorrect. Hint: Use ratio parts (2+3).";
  }
}