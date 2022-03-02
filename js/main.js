/* global data */
/* exported data */

var $mainHeading = document.querySelector('#main-heading');
var $gameForm = document.querySelector('form');
var $categoryWrapper = document.querySelector('#category-wrapper');
var $difficultyWrapper = document.querySelector('#difficulty-wrapper');
var categorySelection = '';
var difficultySelection = '';

// API FETCH TESTER
// API FETCH TESTER

/*
var $test = document.querySelector('#test');
var xhr = new XMLHttpRequest();
// API LINK FOR LIST OF CATEGORY NAMES AND THEIR ID
xhr.open('GET', 'https://opentdb.com/api' + '_category.php');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  console.log('xhr status:', xhr.status);
  console.log('xhr response:', xhr.response);
  for (var i = 0; i < xhr.response.trivia_categories.length; i++) {
    var categoryListItem = document.createElement('li');
    categoryListItem.textContent = 'ID:' + xhr.response.trivia_categories[i].id +
    ' Name:' + xhr.response.trivia_categories[i].name;
    $test.append(categoryListItem);
  }
});
xhr.send();
*/

// HANDLE CATEGORY CLICKS
function handleCategoryClicks(event) {
  if (event.target.tagName !== 'INPUT') {
    return;
  }

  if (event.target.name === 'i\'m crazy') {
    categorySelection = '';
  } else if (event.target.name === 'general knowledge') {
    categorySelection = 'category=9';
  } else if (event.target.name === 'books') {
    categorySelection = 'category=10';
  } else if (event.target.name === 'film') {
    categorySelection = 'category=11';
  } else if (event.target.name === 'music') {
    categorySelection = 'category=12';
  }
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
  // EX LINK: https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://opentdb.com/api.php?amount=5' + '&' + 'category=' +
          categorySelection + '&' + 'difficulty=' + difficultySelection + '&' +
          'type=multiple');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log('xhr status:', xhr.status);
    console.log('xhr response:', xhr.response);
  });
  xhr.send();
}

// FORM SUBMIT LISTENER
$gameForm.addEventListener('submit', handleGameForm);

// RENDER DIFFICULTY
function renderDifficuly() {
  $mainHeading.textContent = 'Select Difficulty';

  var $easyDiv = document.createElement('div');
  $easyDiv.setAttribute('class', 'col-sm-fifth flex justify-center');
  $difficultyWrapper.appendChild($easyDiv);

  var $medDiv = document.createElement('div');
  $medDiv.setAttribute('class', 'col-sm-fifth flex justify-center');
  $difficultyWrapper.appendChild($medDiv);

  var $hardDiv = document.createElement('div');
  $hardDiv.setAttribute('class', 'col-sm-fifth flex justify-center');
  $difficultyWrapper.appendChild($hardDiv);

  var $crazyDiv = document.createElement('div');
  $crazyDiv.setAttribute('class', 'col-sm-full flex justify-center');
  $difficultyWrapper.appendChild($crazyDiv);

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

  var $crazyButton = document.createElement('input');
  $crazyButton.setAttribute('type', 'button');
  $crazyButton.setAttribute('name', 'i\'m-crazy2');
  $crazyButton.setAttribute('class', 'difficulty-button text-capitalize');
  $crazyButton.setAttribute('value', 'i\'m crazy');
  $crazyDiv.appendChild($crazyButton);
}
