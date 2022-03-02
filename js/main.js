/* global data */
/* exported data */

var $mainHeading = document.querySelector('#main-heading');
var $gameForm = document.querySelector('form');
var $categoryWrapper = document.querySelector('#category-wrapper');
var $difficultyWrapper = document.querySelector('#difficulty-wrapper');
var $lengthWrapper = document.querySelector('#length-wrapper');
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
  data.view = 'difficulty-select';
  renderQuizDifficuly();
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

// GET GAME URL FROM API
function getGame(token) {
  var xhrGame = new XMLHttpRequest();
  xhrGame.open('GET', 'https://opentdb.com/api.php?amount=5' + '&' + 'category=' +
    categorySelection + '&' + 'difficulty=' + difficultySelection + '&' +
    'type=multiple' + '&' + 'token=' + token);
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

// EX LINK: https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple
