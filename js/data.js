/* exported data */

let data = {
  correctAnswer: '',
  correctScore: 0,
  currentQuestionNum: 0,
  incorrectScore: 0,
  quizArray: [],
  selectedTimeLimit: 0,
  token: '',
  totalQuestions: 0,
  userAnswer: ''
};

const previousData = localStorage.getItem('trivial.io-local-storage');
if (previousData !== null) data = JSON.parse(previousData);

const handleBeforeUnload = () => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('trivial.io-local-storage', dataJSON);
};

window.addEventListener('beforeunload', handleBeforeUnload);
