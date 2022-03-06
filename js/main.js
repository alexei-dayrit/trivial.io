/* global data */
/* exported data */

var $brandName = document.querySelector('#brand-name');
var $mainHeadingWrapper = document.querySelector('#main-heading-wrapper');
var $mainHeading = document.querySelector('#main-heading');
var $countdownWrapper = document.querySelector('#countdown-wrapper');
var $countdownText = document.querySelector('.countdown-text');
var $gameForm = document.querySelector('form[data-view="create-game"]');
var $categoryWrapper = document.querySelector('#category-wrapper');
var $difficultyWrapper = document.querySelector('#difficulty-wrapper');
var $timeLimitWrapper = document.querySelector('#time-limit-wrapper');
var $lengthWrapper = document.querySelector('#length-wrapper');
var $typeWrapper = document.querySelector('#type-wrapper');
var $beginButton = document.querySelector('input[type="submit"]');
var categorySelection = '';
var difficultySelection = '';
var timeSelection = '';
var lengthSelection = '';
var typeSelection = '';
var sessionCode = '';
var $scoreWrapper = document.querySelector('#score-wrapper');
var $quizHeadingWrapper = document.querySelector('#quiz-heading-wrapper');
var $quizForm = document.querySelector('form[data-view="quiz-form"]');
var $multipleChoiceWrapper = document.querySelector('#multiple-choice-wrapper');
var $trueFalseWrapper = document.querySelector('#true-or-false-wrapper');
var $responseMessageWrapper = document.querySelector('#response-message-wrapper');
var clickCounter = 0;
var countdownID;

// HANDLE BRAND CLICKS
function handleBrandClicks(event) {
  if (event.target.tagName === 'H1') {
    viewCategorySelection();
  }
}

// HANDLE BRAND LISTENER
$brandName.addEventListener('click', handleBrandClicks);

// HANDLE CATEGORY CLICKS
function handleCategoryClicks(event) {
  if (event.target.tagName !== 'INPUT') {
    return;
  }
  var $closestCategory = event.target.closest('[data-category-id]');
  var categoryID = $closestCategory.getAttribute('data-category-id');
  categorySelection = categoryID;
  viewDifficultySelection();
}

// CATEGORY CLICK LISTENER
$categoryWrapper.addEventListener('click', handleCategoryClicks);

// HANDLE DIFFICULTY CLICKS
function handleDifficultyClicks(event) {
  if (event.target.tagName !== 'INPUT') {
    return;
  } else if (event.target.name === 'easy') {
    difficultySelection = 'easy';
  } else if (event.target.name === 'med') {
    difficultySelection = 'medium';
  } else if (event.target.name === 'hard') {
    difficultySelection = 'hard';
  } else if (event.target.name === 'im-insane') {
    difficultySelection = '';
  }
  viewTimeLimitSelection();
}

// DIFFICULTY CLICK LISTENER
$difficultyWrapper.addEventListener('click', handleDifficultyClicks);

// HANDLE TIME LIMIT CLICKS
function handleTimeLimit(event) {
  if (event.target.tagName !== 'INPUT') {
    return;
  } else if (event.target.name === '5-sec') {
    // CHANGE BACK TO 5
    // CHANGE BACK TO 5
    data.selectedTimeLimit = 5;
    // CHANGE BACK TO 5
    // CHANGE BACK TO 5
    timeSelection = 5;
  } else if (event.target.name === '10-sec') {
    data.selectedTimeLimit = 10;
    timeSelection = 10;
  } else if (event.target.name === '15-sec') {
    data.selectedTimeLimit = 15;
    timeSelection = 15;
  } else if (event.target.name === '20-sec') {
    data.selectedTimeLimit = 20;
    timeSelection = 20;
  }
  viewLengthSelection();
}

// HANDLE LENGTH CLICKS
function handleQuizLength(event) {
  if (event.target.tagName !== 'INPUT') {
    return;
  } else if (event.target.name === 'five-qs') {
    // CHANGE BACK TO 5
    // CHANGE BACK TO 5
    // CHANGE BACK TO 5
    // CHANGE BACK TO 5
    lengthSelection = '5';
  } else if (event.target.name === 'ten-qs') {
    lengthSelection = '10';
  } else if (event.target.name === 'fifteen-qs') {
    lengthSelection = '15';
  } else if (event.target.name === 'twenty-qs') {
    lengthSelection = '20';
  }
  viewTypeSelection();
}

// HANDLE LENGTH LISTENER
$lengthWrapper.addEventListener('click', handleQuizLength);

// HANDLE TYPE CLICKS
function handleQuizType(event) {
  if (event.target.name === 'multiple-choice') {
    typeSelection = 'multiple';
  } else if (event.target.name === 'true-or-false') {
    typeSelection = 'boolean';
  } else if (event.target.name === 'any-type') {
    typeSelection = '';
  }
}

// HANDLE TYPE LISTENER
$typeWrapper.addEventListener('click', handleQuizType);

// ARRAY RANDOMIZER
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// DECODE HTML
function decodeEntity(inputStr) {
  var textarea = document.createElement('textarea');
  textarea.innerHTML = inputStr;
  return textarea.value;
}

// FUNCTION TO DISPLAY ONE MULTIPLE CHOICE QUESTION
function displayMultipleChoice(quizObject) {
  var answersArray = [];
  data.correctAnswer = quizObject.correct_answer;
  data.userAnswer = '';
  answersArray.push(quizObject.correct_answer);
  for (var i = 0; i < quizObject.incorrect_answers.length; i++) {
    answersArray.push(quizObject.incorrect_answers[i]);
  }
  for (var a = 0; a < answersArray.length; a++) {
    var decoded = decodeEntity(answersArray[a]);
    answersArray.splice(a, 1, decoded);
  }

  var randomizedArray = shuffle(answersArray);
  var $quizQuestionHeading = document.querySelector('#quiz-question-heading');
  $quizQuestionHeading.textContent = decodeEntity(quizObject.question);

  var $option1 = document.querySelector('input[name=option1-ans]');
  $option1.value = randomizedArray[0];
  var $option2 = document.querySelector('input[name=option2-ans]');
  $option2.value = randomizedArray[1];
  var $option3 = document.querySelector('input[name=option3-ans]');
  $option3.value = randomizedArray[2];
  var $option4 = document.querySelector('input[name=option4-ans]');
  $option4.value = randomizedArray[3];
  displayCountdown();
}

// FUNCTION TO DISPLAY NEXT QUESTION
function displayNextQuestion() {
  addAnswerClicks();
  $countdownText.setAttribute('class', 'countdown-text');
  data.currentQuestionNum++;
  var currentIndex = data.currentQuestionNum;

  if (timeSelection !== data.selectedTimeLimit) {
    resetCountdown();
  }

  if (data.quizArray[currentIndex] === undefined) {
    displayTotalScore();
  } else if (data.quizArray[currentIndex].type === 'multiple') {
    $multipleChoiceWrapper.setAttribute('class', 'row justify-center');
    renderMultipleChoice();
    displayMultipleChoice(data.quizArray[currentIndex]);
  } else if (data.quizArray[currentIndex].type === 'boolean') {
    $trueFalseWrapper.setAttribute('class', 'row justify-center');
    renderTrueOrFalse();
    displayTrueOrFalse(data.quizArray[currentIndex]);
  }
}

// FUNCTION TO DISPLAY ONE TRUE/FALSE QUESTION
function displayTrueOrFalse(quizObject) {
  data.correctAnswer = quizObject.correct_answer;
  data.userAnswer = '';
  $quizHeadingWrapper.setAttribute('class', 'row');
  var $quizQuestionHeading = document.querySelector('#quiz-question-heading');
  $quizQuestionHeading.textContent = decodeEntity(quizObject.question);

  var $trueAns = document.querySelector('input[name=true-ans]');
  $trueAns.value = 'True';
  var $falseAns = document.querySelector('input[name=false-ans]');
  $falseAns.value = 'False';
  displayCountdown();
}

// TIME LIMIT LISTENER
$timeLimitWrapper.addEventListener('click', handleTimeLimit);

// DISPLAY COUNTDOWN
function displayCountdown() {
  $countdownWrapper.removeAttribute('class');
  $countdownText.textContent = timeSelection + 's left';
  countdownID = setInterval(updateCountdown, 1000);
}

// START COUNTDOWN TIMER
function updateCountdown() {
  console.log('decremented time:', timeSelection);
  if (timeSelection > 0) {
    timeSelection--;
    $countdownText.textContent = timeSelection + 's left';
  } else if (timeSelection === 0) {
    renderResponseMessage("TIME'S UP");
    removeAnswerClicks();
    highlightCorrectAnswer();
    $countdownText.setAttribute('class', 'countdown-text incorrect');
    clearInterval(countdownID);
    setTimeout(function () { removeChildNodes($quizHeadingWrapper); }, 3000);
    setTimeout(function () { removeChildNodes($multipleChoiceWrapper); }, 3000);
    setTimeout(function () { removeChildNodes($trueFalseWrapper); }, 3000);
    setTimeout(function () { removeChildNodes($responseMessageWrapper); }, 3000);
    setTimeout(function () { displayNextQuestion(); }, 3000);
  }
}

// RESET COUNTDOWN
function resetCountdown() {
  timeSelection = data.selectedTimeLimit;
  console.log('reseted timeSelection:', timeSelection);
  clearInterval(countdownID);
}

// CHECKS IF USER ANSWER IS CORRECT
function checkAnswer(button) {
  if (data.userAnswer === data.correctAnswer) {
    data.correctScore++;
    button.setAttribute('class', 'right-answer');
    renderResponseMessage('Correct');
  } else if (data.userAnswer !== data.correctAnswer) {
    data.incorrectScore++;
    button.setAttribute('class', 'wrong-answer');
    renderResponseMessage('Incorrect');
    highlightCorrectAnswer();
  }
}

// DISPLAYS TOTAL SCORE
function displayTotalScore() {
  var passingScore = Math.round(0.7 * data.quizArray.length);
  var percentCorrect = Math.round(((data.correctScore / data.quizArray.length) * 100)) + '%';
  $countdownWrapper.setAttribute('class', 'hidden');
  $mainHeadingWrapper.setAttribute('class', 'row');
  $mainHeading.textContent = 'TOTAL SCORE';

  if (data.correctScore === data.quizArray.length) {
    renderQuizScore(percentCorrect);
    renderResponseMessage('AMAZING!');
  } else if (data.correctScore >= passingScore) {
    renderQuizScore(percentCorrect);
    renderResponseMessage('Good Job!');
  } else if (data.correctScore < passingScore) {
    renderQuizScore(percentCorrect);
    renderResponseMessage('Needs More Practice...');
  }
}

// HIGHLIGHTS CORRECT ANSWER
function highlightCorrectAnswer() {
  var $allAnswerButtons = document.querySelectorAll('.answer-button');
  for (var i = 0; i < $allAnswerButtons.length; i++) {
    if ($allAnswerButtons[i].value === data.correctAnswer) {
      $allAnswerButtons[i].setAttribute('class', 'right-answer');
    }
  }
}

// HANDLE MULTIPLE CHOICE ANSWER CLICKS
function handleMultipleChoiceClicks(event) {
  clickCounter++;
  if (event.target.tagName !== 'INPUT') {
    return;
  } else if (event.target.name === 'option1-ans') {
    data.userAnswer = event.target.value;
  } else if (event.target.name === 'option2-ans') {
    data.userAnswer = event.target.value;
  } else if (event.target.name === 'option3-ans') {
    data.userAnswer = event.target.value;
  } else if (event.target.name === 'option4-ans') {
    data.userAnswer = event.target.value;
  }
  removeAnswerClicks();
  resetCountdown();
  checkAnswer(event.target);
  setTimeout(function () { removeChildNodes($quizHeadingWrapper); }, 3000);
  setTimeout(function () { removeChildNodes($multipleChoiceWrapper); }, 3000);
  setTimeout(function () { removeChildNodes($responseMessageWrapper); }, 3000);
  setTimeout(function () { displayNextQuestion(); }, 3000);
}

// HANDLE TRUE FALSE ANSWER CLICKS
function handleTrueFalseClicks(event) {
  clickCounter++;
  if (event.target.tagName !== 'INPUT') {
    return;
  } else if (event.target.name === 'true-ans') {
    data.userAnswer = event.target.value;
  } else if (event.target.name === 'false-ans') {
    data.userAnswer = event.target.value;
  }
  removeAnswerClicks();
  resetCountdown();
  checkAnswer(event.target);
  setTimeout(function () { removeChildNodes($quizHeadingWrapper); }, 3000);
  setTimeout(function () { removeChildNodes($trueFalseWrapper); }, 3000);
  setTimeout(function () { removeChildNodes($responseMessageWrapper); }, 3000);
  setTimeout(function () { displayNextQuestion(); }, 3000);
}

// REMOVE CLICKS ON ANSWER BUTTONS
function removeAnswerClicks() {
  if (clickCounter > 0 || timeSelection === 0) {
    $multipleChoiceWrapper.removeEventListener('click', handleMultipleChoiceClicks);
    $trueFalseWrapper.removeEventListener('click', handleTrueFalseClicks);
  }
}

// ADD CLICKS ON ANSWER BUTTONS
function addAnswerClicks() {
  clickCounter = 0;
  $multipleChoiceWrapper.addEventListener('click', handleMultipleChoiceClicks);
  $trueFalseWrapper.addEventListener('click', handleTrueFalseClicks);
}

// MULTIPLE CHOICE CLICK LISTENER
$multipleChoiceWrapper.addEventListener('click', handleMultipleChoiceClicks);

// TRUE FALSE CLICK LISTENER
$trueFalseWrapper.addEventListener('click', handleTrueFalseClicks);

// GET GAME URL FROM API
function getGame(token) {
  var xhrGame = new XMLHttpRequest();
  xhrGame.open('GET', 'https://opentdb.com/api.php?amount=' + lengthSelection +
    '&' + 'category=' + categorySelection + '&' + 'difficulty=' + difficultySelection +
    '&' + 'type=' + typeSelection + '&' + 'token=' + token);
  xhrGame.responseType = 'json';
  xhrGame.addEventListener('load', function () {
    for (var i = 0; i < xhrGame.response.results.length; i++) {
      data.quizArray.push(xhrGame.response.results[i]);
    }
    console.log('xhrGame status:', xhrGame.status);
    console.log('xhrGame response:', xhrGame.response);
    console.log('xhrGame responseURL:', xhrGame.responseURL);
    viewQuiz();
  });
  xhrGame.send();
}

// HANDLE GAME FORM
function handleGameForm(event) {
  event.preventDefault();
  var xhrToken = new XMLHttpRequest();
  xhrToken.open('GET', 'https://opentdb.com/api_token.php?command=request');
  xhrToken.responseType = 'json';
  xhrToken.addEventListener('load', function getSessionToken() {
    var xhrTokenCode = xhrToken.response.token;
    sessionCode = xhrTokenCode;
    getGame(sessionCode);
  });
  xhrToken.send();
  $beginButton.setAttribute('class', 'submit-button text-upper active-button');
  $beginButton.setAttribute('disabled', 'true');
}

// GAME FORM SUBMIT LISTENER
$gameForm.addEventListener('submit', handleGameForm);

// REMOVES DOM TREE
function removeChildNodes(parent) {
  while (parent.childNodes.length > 0) {
    parent.removeChild(parent.firstChild);
  }
}

// RENDER MULTIPLE CHOICE QUESTION
function renderMultipleChoice() {
  var $quizQuestionDiv = document.createElement('div');
  $quizQuestionDiv.setAttribute('class', 'col-sm-full');
  $quizHeadingWrapper.appendChild($quizQuestionDiv);

  var $quizQuestionHeading = document.createElement('h3');
  $quizQuestionHeading.setAttribute('id', 'quiz-question-heading');
  $quizQuestionDiv.appendChild($quizQuestionHeading);

  var $option1Div = document.createElement('div');
  $option1Div.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $multipleChoiceWrapper.appendChild($option1Div);

  var $option1 = document.createElement('input');
  $option1.setAttribute('type', 'button');
  $option1.setAttribute('name', 'option1-ans');
  $option1.setAttribute('class', 'answer-button text-capitalize');
  $option1.setAttribute('value', 'Loading');
  $option1Div.appendChild($option1);

  var $option2Div = document.createElement('div');
  $option2Div.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $multipleChoiceWrapper.appendChild($option2Div);

  var $option2 = document.createElement('input');
  $option2.setAttribute('type', 'button');
  $option2.setAttribute('name', 'option2-ans');
  $option2.setAttribute('class', 'answer-button text-capitalize');
  $option2.setAttribute('value', 'Loading');
  $option2Div.appendChild($option2);

  var $option3Div = document.createElement('div');
  $option3Div.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $multipleChoiceWrapper.appendChild($option3Div);

  var $option3 = document.createElement('input');
  $option3.setAttribute('type', 'button');
  $option3.setAttribute('name', 'option3-ans');
  $option3.setAttribute('class', 'answer-button text-capitalize');
  $option3.setAttribute('value', 'Loading');
  $option3Div.appendChild($option3);

  var $option4Div = document.createElement('div');
  $option4Div.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $multipleChoiceWrapper.appendChild($option4Div);

  var $option4 = document.createElement('input');
  $option4.setAttribute('type', 'button');
  $option4.setAttribute('name', 'option4-ans');
  $option4.setAttribute('class', 'answer-button text-capitalize');
  $option4.setAttribute('value', 'Loading');
  $option4Div.appendChild($option4);
}

// RENDER TRUE/FALSE QUESTION
function renderTrueOrFalse() {
  var $quizQuestionDiv = document.createElement('div');
  $quizQuestionDiv.setAttribute('class', 'col-sm-full');
  $quizHeadingWrapper.appendChild($quizQuestionDiv);

  var $quizQuestionHeading = document.createElement('h3');
  $quizQuestionHeading.setAttribute('id', 'quiz-question-heading');
  $quizQuestionHeading.textContent = '';
  $quizQuestionDiv.appendChild($quizQuestionHeading);

  var $trueDiv = document.createElement('div');
  $trueDiv.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $trueFalseWrapper.appendChild($trueDiv);

  var $trueAns = document.createElement('input');
  $trueAns.setAttribute('type', 'button');
  $trueAns.setAttribute('name', 'true-ans');
  $trueAns.setAttribute('class', 'answer-button text-capitalize');
  $trueAns.setAttribute('value', 'Loading');
  $trueDiv.appendChild($trueAns);

  var $falseDiv = document.createElement('div');
  $falseDiv.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $trueFalseWrapper.appendChild($falseDiv);

  var $falseAns = document.createElement('input');
  $falseAns.setAttribute('type', 'button');
  $falseAns.setAttribute('name', 'false-ans');
  $falseAns.setAttribute('class', 'answer-button text-capitalize');
  $falseAns.setAttribute('value', 'Loading');
  $falseDiv.appendChild($falseAns);
}

// RENDER CORRECT/INCORRECT RESULT
function renderResponseMessage(message) {
  var $responseMessageDiv = document.createElement('div');
  $responseMessageDiv.setAttribute('class', 'col-sm-full');
  $responseMessageWrapper.appendChild($responseMessageDiv);

  var $responseMessageHeader = document.createElement('h2');
  $responseMessageHeader.setAttribute('id', 'response-message');
  $responseMessageDiv.appendChild($responseMessageHeader);
  $responseMessageHeader.textContent = message;

  if (message === 'Correct') {
    $responseMessageHeader.setAttribute('class', 'accent-message');
  } else if (message === 'Incorrect' || message === "TIME'S UP") {
    $responseMessageHeader.setAttribute('class', 'incorrect');
  } else if (message === 'AMAZING!' || message === 'Good Job!' || message === 'Needs More Practice...') {
    $responseMessageHeader.setAttribute('class', 'score-message');
  }
  return message;
}

// RENDER QUIZ SCORE
function renderQuizScore(score) {
  var $scoreDiv = document.createElement('div');
  $scoreDiv.setAttribute('class', 'col-sm-full');
  $scoreWrapper.appendChild($scoreDiv);

  var $scoreHeading = document.createElement('h1');
  $scoreHeading.setAttribute('id', 'score-heading');
  $scoreDiv.appendChild($scoreHeading);
  $scoreHeading.textContent = score;
}

// CLEAR DATA MODEL
function clearData(data) {
  data.quizArray = [];
  data.correctAnswer = '';
  data.userAnswer = '';
  data.currentQuestionNum = 0;
  data.correctScore = 0;
  data.incorrectScore = 0;
}

// VIEW SWAP TO HOME/CATEGORY SELECT
function viewCategorySelection() {
  $categoryWrapper.setAttribute('class', 'row');
  $mainHeadingWrapper.setAttribute('class', 'row');
  $mainHeading.textContent = 'Select Category';
  $countdownWrapper.setAttribute('class', 'hidden');
  $difficultyWrapper.setAttribute('class', 'row justify-center hidden');
  $timeLimitWrapper.setAttribute('class', 'row justify-center hidden');
  $typeWrapper.setAttribute('class', 'row justify-center hidden');
  $lengthWrapper.setAttribute('class', 'row justify-center hidden');
  removeChildNodes($quizHeadingWrapper);
  removeChildNodes($multipleChoiceWrapper);
  removeChildNodes($trueFalseWrapper);
  removeChildNodes($scoreWrapper);
  removeChildNodes($responseMessageWrapper);
  clearData(data);
  $beginButton.removeAttribute('disabled');
  $beginButton.setAttribute('class', 'submit-button text-upper');
  $gameForm.reset();
  $quizForm.reset();
}

// VIEW SWAP TO DIFFICULTY SELECT
function viewDifficultySelection() {
  $difficultyWrapper.setAttribute('class', 'row justify-center');
  $categoryWrapper.setAttribute('class', 'row hidden');
  $mainHeading.textContent = 'Select Difficulty';
}

// VIEW SWAP TO TIME LIMIT SELECT
function viewTimeLimitSelection() {
  $timeLimitWrapper.setAttribute('class', 'row justify-center');
  $difficultyWrapper.setAttribute('class', 'row justify-center hidden');
  $mainHeading.textContent = 'Select Time Limit';
}

// VIEW SWAP TO LENGTH SELECT
function viewLengthSelection() {
  $lengthWrapper.setAttribute('class', 'row justify-center');
  $timeLimitWrapper.setAttribute('class', 'row justify-center hidden');
  $mainHeading.textContent = 'Select Quiz Length';
}

// VIEW SWAP TO TYPE SELECT
function viewTypeSelection() {
  $typeWrapper.setAttribute('class', 'row justify-center');
  $lengthWrapper.setAttribute('class', 'row justify-center hidden');
  $mainHeading.textContent = 'Select Quiz Type';
}

// VIEW SWAP TO QUIZ
function viewQuiz() {
  if (data.quizArray[0].type === 'multiple') {
    $multipleChoiceWrapper.setAttribute('class', 'row justify-center');
    renderMultipleChoice();
    displayMultipleChoice(data.quizArray[0]);
  } else if (data.quizArray[0].type === 'boolean') {
    $trueFalseWrapper.setAttribute('class', 'row justify-center');
    renderTrueOrFalse();
    displayTrueOrFalse(data.quizArray[0]);
  }
  $quizHeadingWrapper.setAttribute('class', 'row');
  $typeWrapper.setAttribute('class', 'row justify-center hidden');
  $mainHeadingWrapper.setAttribute('class', 'row hidden');
}
