/* exported data */

var data = {
  quizArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  correctAnswer: '',
  userAnswer: '',
  currentQuestionNum: 0,
  correctScore: 11,
  incorrectScore: 0
};

function handleBeforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('quiz-crack-local-storage', dataJSON);
}

window.addEventListener('beforeunload', handleBeforeUnload);
