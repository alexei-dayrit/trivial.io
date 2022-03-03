/* global data */
/* exported data */

var $brandName = document.querySelector('#brand-name');
var $mainHeading = document.querySelector('#main-heading');
var $gameForm = document.querySelector('form');
var $categoryWrapper = document.querySelector('#category-wrapper');
var $difficultyWrapper = document.querySelector('#difficulty-wrapper');
var $lengthWrapper = document.querySelector('#length-wrapper');
var $typeWrapper = document.querySelector('#type-wrapper');
var categorySelection = '';
var difficultySelection = '';
var lengthSelection = '';
var typeSelection = '';
var sessionCode = '';

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

// GET GAME URL FROM API
function getGame(token) {
  var xhrGame = new XMLHttpRequest();
  xhrGame.open('GET', 'https://opentdb.com/api.php?amount=' + lengthSelection +
      '&' + 'category=' + categorySelection + '&' + 'difficulty=' + difficultySelection +
      '&' + 'type=' + typeSelection + '&' + 'token=' + token);
  xhrGame.responseType = 'json';
  xhrGame.addEventListener('load', function () {
  });
  xhrGame.send();
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
}

// FORM SUBMIT LISTENER
$gameForm.addEventListener('submit', handleGameForm);

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

// EX LINK: https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple
