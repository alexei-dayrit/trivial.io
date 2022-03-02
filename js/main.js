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

// CLEAR DOM TREE FOR GAME RESET
function removeChildNodes(parent) {
  while (parent.childNodes.length > 0) {
    parent.removeChild(parent.firstChild);
  }
}
// RESET GAME AND RETURN TO CATEGORY SELECT
function resetGame() {
  $categoryWrapper.setAttribute('class', 'row');
  removeChildNodes($difficultyWrapper);
  removeChildNodes($typeWrapper);
  removeChildNodes($lengthWrapper);
  data.view = 'category-select';
  $gameForm.reset();
}
// HANDLE BRAND CLICKS
function handleBrandClicks(event) {
  if (event.target.tagName === 'H1') {
    resetGame();
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
  } else if (event.target.name === 'fiteen-qs') {
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
    console.log('xhr status:', xhrGame.status);
    console.log('xhr response:', xhrGame.response);
    console.log('xhr response:', xhrGame.responseURL);
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

// RENDER DIFFICULTY
function renderQuizDifficuly() {
  $mainHeading.textContent = 'Select Difficulty';

  var $easyDiv = document.createElement('div');
  $easyDiv.setAttribute('class', 'col-sm-fourth col-lg-15 flex justify-center');
  $difficultyWrapper.appendChild($easyDiv);

  var $medDiv = document.createElement('div');
  $medDiv.setAttribute('class', 'col-sm-fourth col-lg-15 flex justify-center');
  $difficultyWrapper.appendChild($medDiv);

  var $hardDiv = document.createElement('div');
  $hardDiv.setAttribute('class', 'col-sm-fourth col-lg-15 flex justify-center');
  $difficultyWrapper.appendChild($hardDiv);

  var $insaneDiv = document.createElement('div');
  $insaneDiv.setAttribute('class', 'col-sm-full flex justify-center');
  $difficultyWrapper.appendChild($insaneDiv);

  var $easyButton = document.createElement('input');
  $easyButton.setAttribute('type', 'button');
  $easyButton.setAttribute('name', 'easy');
  $easyButton.setAttribute('class', 'difficulty-button text-capitalize');
  $easyButton.setAttribute('value', 'easy');
  $easyDiv.appendChild($easyButton);

  var $medButton = document.createElement('input');
  $medButton.setAttribute('type', 'button');
  $medButton.setAttribute('name', 'med');
  $medButton.setAttribute('class', 'difficulty-button text-capitalize');
  $medButton.setAttribute('value', 'med');
  $medDiv.appendChild($medButton);

  var $hardButton = document.createElement('input');
  $hardButton.setAttribute('type', 'button');
  $hardButton.setAttribute('name', 'hard');
  $hardButton.setAttribute('class', 'difficulty-button text-capitalize');
  $hardButton.setAttribute('value', 'hard');
  $hardDiv.appendChild($hardButton);

  var $insaneButton = document.createElement('input');
  $insaneButton.setAttribute('type', 'button');
  $insaneButton.setAttribute('name', 'im-insane');
  $insaneButton.setAttribute('class', 'difficulty-button text-capitalize');
  $insaneButton.setAttribute('value', 'i\'m insane');
  $insaneDiv.appendChild($insaneButton);

  data.view = 'difficulty-select';
}

function renderQuizLength() {
  var $tenQdiv = document.createElement('div');
  $tenQdiv.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $lengthWrapper.appendChild($tenQdiv);

  var $tenQButton = document.createElement('input');
  $tenQButton.setAttribute('type', 'button');
  $tenQButton.setAttribute('name', 'ten-qs');
  $tenQButton.setAttribute('class', 'length-button text-capitalize');
  $tenQButton.setAttribute('value', '10 q\'s');
  $tenQdiv.appendChild($tenQButton);

  var $fifteenQdiv = document.createElement('div');
  $fifteenQdiv.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $lengthWrapper.appendChild($fifteenQdiv);

  var $fifteenQButton = document.createElement('input');
  $fifteenQButton.setAttribute('type', 'button');
  $fifteenQButton.setAttribute('name', 'fifteen-qs');
  $fifteenQButton.setAttribute('class', 'length-button text-capitalize');
  $fifteenQButton.setAttribute('value', '15 q\'s');
  $fifteenQdiv.appendChild($fifteenQButton);

  var $twentyQdiv = document.createElement('div');
  $twentyQdiv.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $lengthWrapper.appendChild($twentyQdiv);

  var $twentyQButton = document.createElement('input');
  $twentyQButton.setAttribute('type', 'button');
  $twentyQButton.setAttribute('name', 'twenty-qs');
  $twentyQButton.setAttribute('class', 'length-button text-capitalize');
  $twentyQButton.setAttribute('value', '20 q\'s');
  $twentyQdiv.appendChild($twentyQButton);

  var $thirtyQdiv = document.createElement('div');
  $thirtyQdiv.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $lengthWrapper.appendChild($thirtyQdiv);

  var $thirtyQButton = document.createElement('input');
  $thirtyQButton.setAttribute('type', 'button');
  $thirtyQButton.setAttribute('name', 'thirty-qs');
  $thirtyQButton.setAttribute('class', 'length-button text-capitalize');
  $thirtyQButton.setAttribute('value', '30 q\'s');
  $thirtyQdiv.appendChild($thirtyQButton);

  data.view = 'length-select';
}

function renderQuizType() {
  var $anyTypeDiv = document.createElement('div');
  $anyTypeDiv.setAttribute('class', 'col-sm-full flex justify-center');
  $typeWrapper.appendChild($anyTypeDiv);

  var $anyTypeButton = document.createElement('input');
  $anyTypeButton.setAttribute('type', 'button');
  $anyTypeButton.setAttribute('name', 'any-type');
  $anyTypeButton.setAttribute('class', 'type-button text-capitalize');
  $anyTypeButton.setAttribute('value', 'any type');
  $anyTypeDiv.appendChild($anyTypeButton);

  var $multipleTypeDiv = document.createElement('div');
  $multipleTypeDiv.setAttribute('class', 'col-sm-full flex justify-center');
  $typeWrapper.appendChild($multipleTypeDiv);

  var $multipleTypeButton = document.createElement('input');
  $multipleTypeButton.setAttribute('type', 'button');
  $multipleTypeButton.setAttribute('name', 'multiple-choice');
  $multipleTypeButton.setAttribute('class', 'type-button text-capitalize');
  $multipleTypeButton.setAttribute('value', 'multiple choice');
  $multipleTypeDiv.appendChild($multipleTypeButton);

  var $trueOrFalseDiv = document.createElement('div');
  $trueOrFalseDiv.setAttribute('class', 'col-sm-full flex justify-center');
  $typeWrapper.appendChild($trueOrFalseDiv);

  var $trueOrFalseButton = document.createElement('input');
  $trueOrFalseButton.setAttribute('type', 'button');
  $trueOrFalseButton.setAttribute('name', 'true-or-false');
  $trueOrFalseButton.setAttribute('class', 'type-button text-capitalize');
  $trueOrFalseButton.setAttribute('value', 'true or false');
  $trueOrFalseDiv.appendChild($trueOrFalseButton);

  var $submitDiv = document.createElement('div');
  $submitDiv.setAttribute('class', 'col-sm-full flex justify-center');
  $typeWrapper.appendChild($submitDiv);

  var $submitButton = document.createElement('input');
  $submitButton.setAttribute('type', 'submit');
  $submitButton.setAttribute('name', 'submit');
  $submitButton.setAttribute('class', 'submit-button text-upper');
  $submitButton.setAttribute('value', 'begin');
  $submitDiv.appendChild($submitButton);

  data.view = 'type-select';
}

// VIEW SWAP TO DIFFICULTY SELECT
function viewDifficultySelection() {
  $difficultyWrapper.setAttribute('class', 'row justify-center');
  $categoryWrapper.setAttribute('class', 'row hidden');
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  data.view = 'difficulty-select';
  renderQuizDifficuly();
}

// VIEW SWAP TO LENGTH SELECT
function viewLengthSelection() {
  $lengthWrapper.setAttribute('class', 'row justify-center');
  $difficultyWrapper.setAttribute('class', 'row justify-center hidden');
  data.view = 'length-select';
  renderQuizLength();
}

// VIEW SWAP TO TYPE SELECT
function viewTypeSelection() {
  $typeWrapper.setAttribute('class', 'row justify-center');
  $lengthWrapper.setAttribute('class', 'row justify-center hidden');
  data.view = 'type-select';
  renderQuizType();
}

// EX LINK: https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple
