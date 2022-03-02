/* global data */
/* exported data */

var $mainHeading = document.querySelector('#main-heading');
var $gameForm = document.querySelector('form');
var $categoryWrapper = document.querySelector('#category-wrapper');
var $difficultyWrapper = document.querySelector('#difficulty-wrapper');
var categorySelection = '';
var difficultySelection = '';
var sessionCode = '';

// HANDLE CATEGORY CLICKS
function handleCategoryClicks(event) {
  if (event.target.tagName !== 'INPUT') {
    return;
  }
  var $closestCategory = event.target.closest('[data-category-id]');
  var categoryID = $closestCategory.getAttribute('data-category-id');
  categorySelection = categoryID.toString();
  $categoryWrapper.setAttribute('class', 'row hidden');
  renderDifficuly();
}

// CATEGORY CLICK LISTENER
$categoryWrapper.addEventListener('click', handleCategoryClicks);

// HANDLE DIFFICULTY CLICKS
function handleDifficultyClicks(event) {
  if (event.target.tagName !== 'INPUT') {
    return;
  }
  if (event.target.name === 'easy') {
    difficultySelection = 'easy';
  } else if (event.target.name === 'med') {
    difficultySelection = 'medium';
  } else if (event.target.name === 'hard') {
    difficultySelection = 'hard';
  }
}

$difficultyWrapper.addEventListener('click', handleDifficultyClicks);

// HANDLE FORM
function handleGameForm(event) {
  event.preventDefault();
  // GET SESSION TOKEN AND GET GAME URL
  var xhrToken = new XMLHttpRequest();
  xhrToken.open('GET', 'https://opentdb.com/api_token.php?command=request');
  xhrToken.responseType = 'json';
  xhrToken.addEventListener('load', function getSessionToken() {
    var xhrTokenCode = xhrToken.response.token;
    sessionCode = xhrTokenCode;
    var xhrGame = new XMLHttpRequest();
    xhrGame.open('GET', 'https://opentdb.com/api.php?amount=5' + '&' + 'category=' +
      categorySelection + '&' + 'difficulty=' + difficultySelection + '&' +
      'type=multiple' + '&' + 'token=' + sessionCode);
    xhrGame.responseType = 'json';
    xhrGame.addEventListener('load', function () {
    });
    xhrGame.send();
  });
  xhrToken.send();
}

// FORM SUBMIT LISTENER
$gameForm.addEventListener('submit', handleGameForm);

// RENDER DIFFICULTY
function renderDifficuly() {
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
  $medButton.setAttribute('type', 'submit');
  $medButton.setAttribute('name', 'med');
  $medButton.setAttribute('class', 'difficulty-button text-capitalize');
  $medButton.setAttribute('value', 'med');
  $medDiv.appendChild($medButton);

  // CHANGE BACK TYPE
  // CHANGE BACK TYPE

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
}

// EX LINK: https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple
