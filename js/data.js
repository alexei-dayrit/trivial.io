/* exported data */

const data = {
  correctAnswer: '',
  correctScore: 0,
  currentQuestionNum: 0,
  incorrectScore: 0,
  quizArray: [],
  selectedTimeLimit: 0,
  totalQuestions: 0,
  userAnswer: ''
};

function handleBeforeUnload(event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('quiz-crack-local-storage', dataJSON);
}

window.addEventListener('beforeunload', handleBeforeUnload);
