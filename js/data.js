/* exported data */
/* exported tokens */

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

const tokens = {
  session: ''
};

// const handleBeforeUnload = event => {
//   const tokensJSON = JSON.stringify(tokens);
//   localStorage.setItem('trivial.io-local-storage', tokensJSON);
// };

// window.addEventListener('beforeunload', handleBeforeUnload);
