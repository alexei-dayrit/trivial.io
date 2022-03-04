/* exported data */

var data = {
  quizArray: [],
  correctAnswer: '',
  userAnswer: '',
  currentQuestionNum: 0,
  currentScore: 0,
  incorrectScore: 0
};

function handleBeforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('quiz-crack-local-storage', dataJSON);
}

window.addEventListener('beforeunload', handleBeforeUnload);
