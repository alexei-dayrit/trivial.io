/* global data */
/* exported data */

var $mainHeading = document.querySelector('#main-heading');
var $gameForm = document.querySelector('form');
var $categoryWrapper = document.querySelector('#category-wrapper');

// HANDLE CATEGORY CLICKS
function handleCategoryClicks(event) {
  if (event.target.tagName === 'INPUT') {
    $categoryWrapper.setAttribute('class', 'row hidden');
    renderDifficuly();
  }
}
// CATEGORY CLICK LISTENER
$categoryWrapper.addEventListener('click', handleCategoryClicks);

// HANDLE FORM
function handleGameForm(event) {
  event.preventDefault();
}
// FORM SUBMIT LISTENER
$gameForm.addEventListener('submit', handleGameForm);

// RENDER DIFFICULTY
function renderDifficuly() {
  $mainHeading.textContent = 'Select Difficulty';

  var $difficultyWrapper = document.createElement('div');
  $difficultyWrapper.setAttribute('id', 'difficulty-wrapper');
  $difficultyWrapper.setAttribute('class', 'row justify-center');
  $gameForm.appendChild($difficultyWrapper);

  var $easyDiv = document.createElement('div');
  $easyDiv.setAttribute('class', 'col-sm-fifth flex justify-center');
  $difficultyWrapper.appendChild($easyDiv);

  var $medDiv = document.createElement('div');
  $medDiv.setAttribute('class', 'col-sm-fifth flex justify-center');
  $difficultyWrapper.appendChild($medDiv);

  var $hardDiv = document.createElement('div');
  $hardDiv.setAttribute('class', 'col-sm-fifth flex justify-center');
  $difficultyWrapper.appendChild($hardDiv);

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

}
