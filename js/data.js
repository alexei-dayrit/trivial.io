/* exported data */

var data = {
  view: 'category-select'
};

var previousData = localStorage.getItem('quiz-crack-local-storage');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

function handleBeforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('entries-local-storage', dataJSON);
}

window.addEventListener('beforeunload', handleBeforeUnload);
