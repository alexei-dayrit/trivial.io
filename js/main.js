/* global data */
/* exported data */

var $brandName = document.querySelector('#brand-name');
var $mainHeading = document.querySelector('#main-heading');
var $gameForm = document.querySelector('form[data-view="create-game"]');
var $categoryWrapper = document.querySelector('#category-wrapper');
var $difficultyWrapper = document.querySelector('#difficulty-wrapper');
var $lengthWrapper = document.querySelector('#length-wrapper');
var $typeWrapper = document.querySelector('#type-wrapper');
var categorySelection = '';
var difficultySelection = '';
var lengthSelection = '';
var typeSelection = '';
var sessionCode = '';
var $quizForm = document.querySelector('form[data-view="quiz-form"]');
var $multipleChoiceWrapper = document.querySelector('#multiple-choice-wrapper');
var $trueFalseWrapper = document.querySelector('#true-or-false-wrapper');

// HANDLE BRAND CLICKS
function handleBrandClicks(event) {
  if (event.target.tagName === 'H1') {
    $gameForm.reset();
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
  viewLengthSelection();
}

// DIFFICULTY CLICK LISTENER
$difficultyWrapper.addEventListener('click', handleDifficultyClicks);

// HANDLE LENGTH CLICKS
function handleQuizLength(event) {
  if (event.target.tagName !== 'INPUT') {
    return;
  } else if (event.target.name === 'ten-qs') {
    lengthSelection = '10';
  } else if (event.target.name === 'fifteen-qs') {
    lengthSelection = '15';
  } else if (event.target.name === 'twenty-qs') {
    lengthSelection = '20';
  } else if (event.target.name === 'thirty-qs') {
    lengthSelection = '30';
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

// VAR TO HOLD DATA FROM API REQUEST
var quizArray = [];
// GET GAME URL FROM API
function getGame(token) {
  var xhrGame = new XMLHttpRequest();
  xhrGame.open('GET', 'https://opentdb.com/api.php?amount=' + lengthSelection +
      '&' + 'category=' + categorySelection + '&' + 'difficulty=' + difficultySelection +
      '&' + 'type=' + typeSelection + '&' + 'token=' + token);
  xhrGame.responseType = 'json';
  xhrGame.addEventListener('load', function () {
    console.log('xhrGame status:', xhrGame.status);
    console.log('xhrGame response:', xhrGame.response);
    // BRINGS UP OBJECT OF ONE QUESTION
    console.log('xhrGame response:', xhrGame.responseURL);
    for (var i = 0; i < xhrGame.response.results.length; i++) {
      quizArray.push(xhrGame.response.results[i]);
    }
    console.log('Useable array:', quizArray);
    displayOneMultipleChoice(quizArray);
  });
  xhrGame.send();
}

// FUNCTION TO DISPLAY ONE QUESTION
function displayOneMultipleChoice(quizArray) {
  $mainHeading.textContent = quizArray[0].question;
  var $option1 = document.querySelector('input[name=option1-ans]');
  $option1.value = quizArray[0].correct_answer;
  var $option2 = document.querySelector('input[name=option2-ans]');
  $option2.value = quizArray[0].incorrect_answers[0];
  var $option3 = document.querySelector('input[name=option3-ans]');
  $option3.value = quizArray[0].incorrect_answers[1];
  var $option4 = document.querySelector('input[name=option4-ans]');
  $option4.value = quizArray[0].incorrect_answers[2];
}

// HANDLE FORM
function handleGameForm(event) {
  event.preventDefault();
  // GET SESSION TOKEN FROM API
  var xhrToken = new XMLHttpRequest();
  xhrToken.open('GET', 'https://opentdb.com/api_token.php?command=request');
  xhrToken.responseType = 'json';
  xhrToken.addEventListener('load', function getSessionToken() {
    var xhrTokenCode = xhrToken.response.token;
    sessionCode = xhrTokenCode;
    getGame(sessionCode);
  });
  xhrToken.send();
  viewQuiz();
}

// GAME FORM SUBMIT LISTENER
$gameForm.addEventListener('submit', handleGameForm);

// USER QUIZ FORM SUBMIT LISTENER
$quizForm.addEventListener('submit', function () {});

function renderMultipleChoice() {
  var $option1Div = document.createElement('div');
  $option1Div.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $multipleChoiceWrapper.appendChild($option1Div);

  var $option1 = document.createElement('input');
  $option1.setAttribute('type', 'button');
  $option1.setAttribute('name', 'option1-ans');
  $option1.setAttribute('class', 'answer-button text-capitalize');
  $option1.setAttribute('value', '');
  $option1Div.appendChild($option1);

  var $option2Div = document.createElement('div');
  $option2Div.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $multipleChoiceWrapper.appendChild($option2Div);

  var $option2 = document.createElement('input');
  $option2.setAttribute('type', 'button');
  $option2.setAttribute('name', 'option2-ans');
  $option2.setAttribute('class', 'answer-button text-capitalize');
  $option2.setAttribute('value', '');
  $option2Div.appendChild($option2);

  var $option3Div = document.createElement('div');
  $option3Div.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $multipleChoiceWrapper.appendChild($option3Div);

  var $option3 = document.createElement('input');
  $option3.setAttribute('type', 'button');
  $option3.setAttribute('name', 'option3-ans');
  $option3.setAttribute('class', 'answer-button text-capitalize');
  $option3.setAttribute('value', '');
  $option3Div.appendChild($option3);

  var $option4Div = document.createElement('div');
  $option4Div.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $multipleChoiceWrapper.appendChild($option4Div);

  var $option4 = document.createElement('input');
  $option4.setAttribute('type', 'button');
  $option4.setAttribute('name', 'option4-ans');
  $option4.setAttribute('class', 'answer-button text-capitalize');
  $option4.setAttribute('value', '');
  $option4Div.appendChild($option4);
}

function renderTrueOrFalse() {
  var $trueDiv = document.createElement('div');
  $trueDiv.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $trueFalseWrapper.appendChild($trueDiv);

  var $trueAns = document.createElement('input');
  $trueAns.setAttribute('type', 'button');
  $trueAns.setAttribute('name', 'true-ans');
  $trueAns.setAttribute('class', 'answer-button text-capitalize');
  $trueAns.setAttribute('value', 'true');
  $trueDiv.appendChild($trueAns);

  var $falseDiv = document.createElement('div');
  $falseDiv.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $trueFalseWrapper.appendChild($falseDiv);

  var $falseAns = document.createElement('input');
  $falseAns.setAttribute('type', 'button');
  $falseAns.setAttribute('name', 'false-ans');
  $falseAns.setAttribute('class', 'answer-button text-capitalize');
  $falseAns.setAttribute('value', 'false');
  $falseDiv.appendChild($falseAns);
}

// VIEW SWAP TO CATEGORY SELECT
function viewCategorySelection() {
  $categoryWrapper.setAttribute('class', 'row');
  $difficultyWrapper.setAttribute('class', 'row justify-center hidden');
  $typeWrapper.setAttribute('class', 'row justify-center hidden');
  $lengthWrapper.setAttribute('class', 'row justify-center hidden');
  $mainHeading.textContent = 'Select Category';
}

// VIEW SWAP TO DIFFICULTY SELECT
function viewDifficultySelection() {
  $difficultyWrapper.setAttribute('class', 'row justify-center');
  $categoryWrapper.setAttribute('class', 'row hidden');
  $mainHeading.textContent = 'Select Difficulty';
}

// VIEW SWAP TO LENGTH SELECT
function viewLengthSelection() {
  $lengthWrapper.setAttribute('class', 'row justify-center');
  $difficultyWrapper.setAttribute('class', 'row justify-center hidden');
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
  $multipleChoiceWrapper.setAttribute('class', 'row justify-center');
  renderMultipleChoice();
  $typeWrapper.setAttribute('class', 'row justify-center hidden');
}
