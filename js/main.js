/* global data */
/* exported data */

var $gameForm = document.querySelector('form');
var $categoryWrapper = document.querySelector('#category-wrapper');

// TESTING
function handleCategoryClicks(event) {
  // console.log('event:', event);
  // console.log('event.target:', event.target);
  // console.log('event.target.tagName:', event.target.tagName);
  if (event.target.tagName === 'INPUT') {
    // console.log('INPUT BUTTON:', event.target);
  }
}

$categoryWrapper.addEventListener('click', handleCategoryClicks);

function handleGameForm(event) {
  event.preventDefault();
}

$gameForm.addEventListener('submit', handleGameForm);
