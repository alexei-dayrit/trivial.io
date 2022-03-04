/* exported data */

var data = {
  view: 'category-select',
  quizArray: [],
  correctAnswer: '',
  userAnswer: '',
  currentQuestion: 0
};

function handleBeforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('quiz-crack-local-storage', dataJSON);
}

window.addEventListener('beforeunload', handleBeforeUnload);
