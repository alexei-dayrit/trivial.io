/* global data */
/* exported data */
/* exported tokens */

const $htmlHeader = document.querySelector('header');
const $mainHeadingWrapper = document.querySelector('#main-heading-wrapper');
const $mainHeading = document.querySelector('#main-heading');
const $userSelectionWrapper = document.querySelector('#user-selection-wrapper');
const $questionCountText = document.querySelector('.question-count-text');
const $questionTypeText = document.querySelector('.question-type-text');
const $questionDifficultyText = document.querySelector('.question-difficulty-text');
const $countdownWrapper = document.querySelector('#countdown-wrapper');
const $countdownText = document.querySelector('.countdown-text');
const $loadSpinner = document.querySelector('#load-spinner');
const $gameForm = document.querySelector('form[data-view="create-game"]');
const $categoryWrapper = document.querySelector('#category-wrapper');
const $difficultyWrapper = document.querySelector('#difficulty-wrapper');
const $timeLimitWrapper = document.querySelector('#time-limit-wrapper');
const $lengthWrapper = document.querySelector('#length-wrapper');
const $typeWrapper = document.querySelector('#type-wrapper');
const $beginWrapper = document.querySelector('#begin-wrapper');
const $beginButton = document.querySelector('input[type="submit"]');
const $skippedWrapper = document.querySelector('#skipped-selections-wrapper');
const $emptyResultWrapper = document.querySelector('#empty-result-wrapper');
const $scoreWrapper = document.querySelector('#score-wrapper');
const $quizHeadingWrapper = document.querySelector('#quiz-heading-wrapper');
const $quizForm = document.querySelector('form[data-view="quiz-form"]');
const $multipleChoiceWrapper = document.querySelector('#multiple-choice-wrapper');
const $trueFalseWrapper = document.querySelector('#true-or-false-wrapper');
const $responseMessageWrapper = document.querySelector('#response-message-wrapper');
const $creditsWrapper = document.querySelector('#credits-wrapper');
const $creditsButton = document.querySelector('#credits-btn');
let categorySelection = '';
let difficultySelection = '';
let timeSelection = '';
let lengthSelection = '';
let typeSelection = '';
let clickCounter = 0;
let countdownID;

const handleHomeClick = event => {
  if (event.target.tagName === 'BUTTON' || event.target.tagName === 'IMG') {
    viewCategorySelection();
  }
};

$htmlHeader.addEventListener('click', handleHomeClick);

const handleCreditsClick = event => {
  viewCredits();
};

$creditsButton.addEventListener('click', handleCreditsClick);

const fetchCategory = async categorySelection => {
  try {
    const response = await fetch(`https://opentdb.com/api_count.php?category=${categorySelection}`);
    if (response.status !== 200) {
      displaySearchError();
    }
    const category = await response.json();
    const totalQuestionCount = category.category_question_count.total_question_count;
    data.totalQuestions += totalQuestionCount;
  } catch (err) {
    console.error(err);
  }
};

const handleCategoryClicks = event => {
  if (event.target.tagName !== 'INPUT') {
    return;
  }
  $mainHeading.textContent = 'LOADING...';
  $mainHeading.setAttribute('class', 'active-button');
  $loadSpinner.setAttribute('class', 'lds-dual-ring');
  const $closestCategory = event.target.closest('[data-category-id]');
  categorySelection = $closestCategory.getAttribute('data-category-id');
  fetchCategory(categorySelection);
  removeClicks($categoryWrapper, handleCategoryClicks);
  removeClicks($creditsButton, handleCreditsClick);
  removeClicks($htmlHeader, handleHomeClick);
  setTimeout(() => { skipSelections(); }, 1000);
};

$categoryWrapper.addEventListener('click', handleCategoryClicks);

const handleDifficultyClicks = event => {
  if (event.target.tagName !== 'INPUT') {
    return;
  } else if (event.target.name === 'easy') {
    difficultySelection = 'easy';
  } else if (event.target.name === 'med') {
    difficultySelection = 'medium';
  } else if (event.target.name === 'hard') {
    difficultySelection = 'hard';
  } else if (event.target.name === 'im-insane') {
    difficultySelection = '';
  }
  $questionDifficultyText.textContent = 'Difficulty: ' + difficultySelection;
  viewTimeLimitSelection();
};

$difficultyWrapper.addEventListener('click', handleDifficultyClicks);

const handleTimeLimit = event => {
  if (event.target.tagName !== 'INPUT') {
    return;
  }
  if (event.target.name === '5-sec') {
    data.selectedTimeLimit = 5;
    timeSelection = 5;
  } else if (event.target.name === '10-sec') {
    data.selectedTimeLimit = 10;
    timeSelection = 10;
  } else if (event.target.name === '15-sec') {
    data.selectedTimeLimit = 15;
    timeSelection = 15;
  } else if (event.target.name === '20-sec') {
    data.selectedTimeLimit = 20;
    timeSelection = 20;
  }
  viewReadyScreen();
};

$timeLimitWrapper.addEventListener('click', handleTimeLimit);

const skipSelections = () => {
  $mainHeading.removeAttribute('class');
  addClicks($categoryWrapper, handleCategoryClicks);
  removeClicks($htmlHeader, handleHomeClick);
  removeClicks($creditsButton, handleCreditsClick);
  if (lengthSelection === '') {
    lengthSelection = 10;
  }
  if (data.totalQuestions < 100 || lengthSelection === '15' || lengthSelection === '20') {
    $loadSpinner.setAttribute('class', 'lds-dual-ring');
    $lengthWrapper.setAttribute('class', 'row justify-center hidden');
    $categoryWrapper.setAttribute('class', 'row hidden');
    $userSelectionWrapper.setAttribute('class', 'row justify-center');
    $mainHeading.textContent = 'Default Values Selected';
    $mainHeading.setAttribute('class', 'decrease-margin-bottom');
    $questionCountText.textContent = 'Questions: ' + lengthSelection;
    $questionTypeText.textContent = 'Type: Any';
    $questionDifficultyText.textContent = 'Difficulty: Any';
    $skippedWrapper.setAttribute('class', 'row');
    setTimeout(() => { viewTimeLimitSelection(); }, 3000);
  } else {
    $loadSpinner.setAttribute('class', 'lds-dual-ring hidden');
    viewLengthSelection();
  }
};

const handleQuizLength = event => {
  if (event.target.name === 'five-qs') {
    lengthSelection = '5';
    $questionCountText.textContent = 'Questions: ' + lengthSelection;
    $loadSpinner.setAttribute('class', 'lds-dual-ring');
    viewTypeSelection();
  } else if (event.target.name === 'ten-qs') {
    lengthSelection = '10';
    $questionCountText.textContent = 'Questions: ' + lengthSelection;
    $loadSpinner.setAttribute('class', 'lds-dual-ring');
    viewTypeSelection();
  } else if (event.target.name === 'fifteen-qs') {
    lengthSelection = '15';
    skipSelections();
  } else if (event.target.name === 'twenty-qs') {
    lengthSelection = '20';
    skipSelections();
  }
};

$lengthWrapper.addEventListener('click', handleQuizLength);

const handleQuizType = event => {
  if (event.target.tagName !== 'INPUT') {
    return;
  } else if (event.target.name === 'multiple-choice') {
    typeSelection = 'multiple';
  } else if (event.target.name === 'true-or-false') {
    typeSelection = 'boolean';
  } else if (event.target.name === 'any-type') {
    typeSelection = '';
  }
  $questionTypeText.textContent = 'Type: ' + event.target.value;
  viewDifficultySelection();
};

$typeWrapper.addEventListener('click', handleQuizType);

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const decodeEntity = inputStr => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = inputStr;
  return textarea.value;
};

const displayMultipleChoice = quizObject => {
  const answersArray = [];
  data.correctAnswer = quizObject.correct_answer;
  answersArray.push(quizObject.correct_answer);
  for (let i = 0; i < quizObject.incorrect_answers.length; i++) {
    answersArray.push(quizObject.incorrect_answers[i]);
  }
  for (let a = 0; a < answersArray.length; a++) {
    const decoded = decodeEntity(answersArray[a]);
    answersArray.splice(a, 1, decoded);
  }
  const randomizedArray = shuffle(answersArray);
  const $quizQuestionHeading = document.querySelector('#quiz-question-heading');
  $quizQuestionHeading.textContent = decodeEntity(quizObject.question);

  const $option1 = document.querySelector('input[name=option1-ans]');
  $option1.value = randomizedArray[0];
  const $option2 = document.querySelector('input[name=option2-ans]');
  $option2.value = randomizedArray[1];
  const $option3 = document.querySelector('input[name=option3-ans]');
  $option3.value = randomizedArray[2];
  const $option4 = document.querySelector('input[name=option4-ans]');
  $option4.value = randomizedArray[3];
  displayCountdown();
};

const displayNextQuestion = () => {
  addAnswerClicks();
  $countdownText.setAttribute('class', 'countdown-text');
  data.currentQuestionNum++;
  data.userAnswer = '';
  const currentIndex = data.currentQuestionNum;
  if (timeSelection !== data.selectedTimeLimit) {
    resetCountdown();
  }
  if (data.quizArray[currentIndex] === undefined) {
    displayTotalScore();
  } else if (data.quizArray[currentIndex].type === 'multiple') {
    $multipleChoiceWrapper.setAttribute('class', 'row justify-center');
    renderMultipleChoice();
    displayMultipleChoice(data.quizArray[currentIndex]);
  } else if (data.quizArray[currentIndex].type === 'boolean') {
    $trueFalseWrapper.setAttribute('class', 'row justify-center');
    renderTrueOrFalse();
    displayTrueOrFalse(data.quizArray[currentIndex]);
  }
};

const displayTrueOrFalse = quizObject => {
  data.correctAnswer = quizObject.correct_answer;
  $quizHeadingWrapper.setAttribute('class', 'row');
  const $quizQuestionHeading = document.querySelector('#quiz-question-heading');
  $quizQuestionHeading.textContent = decodeEntity(quizObject.question);

  const $trueAns = document.querySelector('input[name=true-ans]');
  $trueAns.value = 'True';
  const $falseAns = document.querySelector('input[name=false-ans]');
  $falseAns.value = 'False';
  displayCountdown();
};

const displayCountdown = () => {
  $countdownWrapper.removeAttribute('class');
  $countdownText.textContent = timeSelection + 's left';
  countdownID = setInterval(updateCountdown, 1000);
};

const updateCountdown = () => {
  if (timeSelection > 0) {
    timeSelection--;
    $countdownText.textContent = timeSelection + 's left';
  } else if (timeSelection === 0) {
    renderResponseMessage("TIME'S UP");
    removeAnswerClicks();
    highlightCorrectAnswer();
    $countdownText.setAttribute('class', 'countdown-text incorrect');
    clearInterval(countdownID);
    displayNextQuestionTimeout();
  }
};

const resetCountdown = () => {
  timeSelection = data.selectedTimeLimit;
  clearInterval(countdownID);
};

const displayNextQuestionTimeout = () => {
  setTimeout(() => { removeChildNodes($quizHeadingWrapper); }, 3000);
  setTimeout(() => { removeChildNodes($multipleChoiceWrapper); }, 3000);
  setTimeout(() => { removeChildNodes($trueFalseWrapper); }, 3000);
  setTimeout(() => { removeChildNodes($responseMessageWrapper); }, 3000);
  setTimeout(() => { displayNextQuestion(); }, 3000);
};

const checkAnswer = button => {
  if (data.userAnswer === data.correctAnswer) {
    data.correctScore++;
    button.setAttribute('class', 'right-answer');
    renderResponseMessage('Correct');
  } else if (data.userAnswer !== data.correctAnswer) {
    data.incorrectScore++;
    button.setAttribute('class', 'wrong-answer');
    renderResponseMessage('Incorrect');
    highlightCorrectAnswer();
  }
};

const displayTotalScore = () => {
  if ($mainHeading.textContent === 'Select Category') {
    return;
  }
  const passingScore = Math.round(0.7 * data.quizArray.length);
  const percentCorrect = Math.round(((data.correctScore / data.quizArray.length) * 100)) + '%';
  $countdownWrapper.setAttribute('class', 'hidden');
  $mainHeadingWrapper.setAttribute('class', 'row');
  $mainHeading.textContent = 'TOTAL SCORE';
  if (data.correctScore === data.quizArray.length) {
    renderQuizScore(percentCorrect);
    renderResponseMessage('AMAZING!');
  } else if (data.correctScore >= passingScore) {
    renderQuizScore(percentCorrect);
    renderResponseMessage('Good Job!');
  } else if (data.correctScore < passingScore) {
    renderQuizScore(percentCorrect);
    renderResponseMessage('Needs More Practice...');
  }
};

const highlightCorrectAnswer = () => {
  const $allAnswerButtons = document.querySelectorAll('.answer-button');
  for (let i = 0; i < $allAnswerButtons.length; i++) {
    if ($allAnswerButtons[i].value === data.correctAnswer) {
      $allAnswerButtons[i].setAttribute('class', 'right-answer');
    }
  }
};

const handleMultipleChoiceClicks = event => {
  clickCounter++;
  if (event.target.tagName !== 'INPUT') {
    return;
  } else if (event.target.name === 'option1-ans') {
    data.userAnswer = event.target.value;
  } else if (event.target.name === 'option2-ans') {
    data.userAnswer = event.target.value;
  } else if (event.target.name === 'option3-ans') {
    data.userAnswer = event.target.value;
  } else if (event.target.name === 'option4-ans') {
    data.userAnswer = event.target.value;
  }
  removeAnswerClicks();
  resetCountdown();
  checkAnswer(event.target);
  setTimeout(() => { removeChildNodes($quizHeadingWrapper); }, 3000);
  setTimeout(() => { removeChildNodes($multipleChoiceWrapper); }, 3000);
  setTimeout(() => { removeChildNodes($responseMessageWrapper); }, 3000);
  setTimeout(() => { displayNextQuestion(); }, 3000);
};

const handleTrueFalseClicks = event => {
  clickCounter++;
  if (event.target.tagName !== 'INPUT') {
    return;
  } else if (event.target.name === 'true-ans') {
    data.userAnswer = event.target.value;
  } else if (event.target.name === 'false-ans') {
    data.userAnswer = event.target.value;
  }
  removeAnswerClicks();
  resetCountdown();
  checkAnswer(event.target);
  setTimeout(() => { removeChildNodes($quizHeadingWrapper); }, 3000);
  setTimeout(() => { removeChildNodes($trueFalseWrapper); }, 3000);
  setTimeout(() => { removeChildNodes($responseMessageWrapper); }, 3000);
  setTimeout(() => { displayNextQuestion(); }, 3000);
};

const removeAnswerClicks = () => {
  if (clickCounter > 0 || timeSelection === 0) {
    $multipleChoiceWrapper.removeEventListener('click', handleMultipleChoiceClicks);
    $trueFalseWrapper.removeEventListener('click', handleTrueFalseClicks);
  }
};

const addAnswerClicks = () => {
  clickCounter = 0;
  $multipleChoiceWrapper.addEventListener('click', handleMultipleChoiceClicks);
  $trueFalseWrapper.addEventListener('click', handleTrueFalseClicks);
};

$multipleChoiceWrapper.addEventListener('click', handleMultipleChoiceClicks);
$trueFalseWrapper.addEventListener('click', handleTrueFalseClicks);

const fetchGame = async token => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${lengthSelection}` +
    `&category=${categorySelection}&difficulty=${difficultySelection}&type=${typeSelection}` +
    `&token=${token}`);
    const questions = await response.json();
    for (let i = 0; i < questions.results.length; i++) {
      data.quizArray.push(questions.results[i]);
    }
    $userSelectionWrapper.setAttribute('class', 'row justify-center hidden');
    viewQuiz();
  } catch (err) {
    console.error(err);
  }
};

const fetchGameToken = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenObj = await response.json();
    tokens.session = tokenObj.token;
    const tokenJSON = JSON.stringify(tokens);
    localStorage.setItem('trivial.io-local-storage', tokenJSON);
    fetchGame(tokens.session);
  } catch (err) {
    console.error(err);
  }
};

const handleGameForm = event => {
  event.preventDefault();
  if (data.selectedTimeLimit === 0) {
    return;
  }
  $loadSpinner.setAttribute('class', 'lds-dual-ring');
  removeClicks($htmlHeader, handleHomeClick);
  removeClicks($creditsButton, handleCreditsClick);
  $beginButton.setAttribute('value', 'LOADING..');
  if (!tokens.session) {
    fetchGameToken();
  }
  $beginButton.setAttribute('class', 'submit-button text-upper active-button');
  $beginButton.setAttribute('disabled', 'true');
};

$gameForm.addEventListener('submit', handleGameForm);

const removeChildNodes = parent => {
  while (parent.childNodes.length > 0) {
    parent.removeChild(parent.firstChild);
  }
};

const renderMultipleChoice = () => {
  const $quizQuestionDiv = document.createElement('div');
  $quizQuestionDiv.setAttribute('class', 'col-sm-full');
  $quizHeadingWrapper.appendChild($quizQuestionDiv);

  const $quizQuestionHeading = document.createElement('h3');
  $quizQuestionHeading.setAttribute('id', 'quiz-question-heading');
  $quizQuestionDiv.appendChild($quizQuestionHeading);

  const $option1Div = document.createElement('div');
  $option1Div.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $multipleChoiceWrapper.appendChild($option1Div);

  const $option1 = document.createElement('input');
  $option1.setAttribute('type', 'button');
  $option1.setAttribute('name', 'option1-ans');
  $option1.setAttribute('class', 'answer-button text-capitalize');
  $option1.setAttribute('value', 'Loading');
  $option1Div.appendChild($option1);

  const $option2Div = document.createElement('div');
  $option2Div.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $multipleChoiceWrapper.appendChild($option2Div);

  const $option2 = document.createElement('input');
  $option2.setAttribute('type', 'button');
  $option2.setAttribute('name', 'option2-ans');
  $option2.setAttribute('class', 'answer-button text-capitalize');
  $option2.setAttribute('value', 'Loading');
  $option2Div.appendChild($option2);

  const $option3Div = document.createElement('div');
  $option3Div.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $multipleChoiceWrapper.appendChild($option3Div);

  const $option3 = document.createElement('input');
  $option3.setAttribute('type', 'button');
  $option3.setAttribute('name', 'option3-ans');
  $option3.setAttribute('class', 'answer-button text-capitalize');
  $option3.setAttribute('value', 'Loading');
  $option3Div.appendChild($option3);

  const $option4Div = document.createElement('div');
  $option4Div.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $multipleChoiceWrapper.appendChild($option4Div);

  const $option4 = document.createElement('input');
  $option4.setAttribute('type', 'button');
  $option4.setAttribute('name', 'option4-ans');
  $option4.setAttribute('class', 'answer-button text-capitalize');
  $option4.setAttribute('value', 'Loading');
  $option4Div.appendChild($option4);
};

const renderTrueOrFalse = () => {
  const $quizQuestionDiv = document.createElement('div');
  $quizQuestionDiv.setAttribute('class', 'col-sm-full');
  $quizHeadingWrapper.appendChild($quizQuestionDiv);

  const $quizQuestionHeading = document.createElement('h3');
  $quizQuestionHeading.setAttribute('id', 'quiz-question-heading');
  $quizQuestionHeading.textContent = '';
  $quizQuestionDiv.appendChild($quizQuestionHeading);

  const $trueDiv = document.createElement('div');
  $trueDiv.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $trueFalseWrapper.appendChild($trueDiv);

  const $trueAns = document.createElement('input');
  $trueAns.setAttribute('type', 'button');
  $trueAns.setAttribute('name', 'true-ans');
  $trueAns.setAttribute('class', 'answer-button text-capitalize');
  $trueAns.setAttribute('value', 'Loading');
  $trueDiv.appendChild($trueAns);

  const $falseDiv = document.createElement('div');
  $falseDiv.setAttribute('class', 'col-sm-full col-lg-half flex justify-center');
  $trueFalseWrapper.appendChild($falseDiv);

  const $falseAns = document.createElement('input');
  $falseAns.setAttribute('type', 'button');
  $falseAns.setAttribute('name', 'false-ans');
  $falseAns.setAttribute('class', 'answer-button text-capitalize');
  $falseAns.setAttribute('value', 'Loading');
  $falseDiv.appendChild($falseAns);
};

const renderResponseMessage = message => {
  const $responseMessageDiv = document.createElement('div');
  $responseMessageDiv.setAttribute('class', 'col-sm-full');
  $responseMessageWrapper.appendChild($responseMessageDiv);

  const $responseMessageHeader = document.createElement('h2');
  $responseMessageHeader.setAttribute('id', 'response-message');
  $responseMessageDiv.appendChild($responseMessageHeader);
  $responseMessageHeader.textContent = message;

  if (message === 'Correct') {
    $responseMessageHeader.setAttribute('class', 'accent-message');
  } else if (message === 'Incorrect' || message === "TIME'S UP") {
    $responseMessageHeader.setAttribute('class', 'incorrect');
  } else if (message === 'AMAZING!' || message === 'Good Job!' || message === 'Needs More Practice...') {
    $responseMessageHeader.setAttribute('class', 'score-message');
  }
  return message;
};

const renderQuizScore = score => {
  const $scoreDiv = document.createElement('div');
  $scoreDiv.setAttribute('class', 'col-sm-full');
  $scoreWrapper.appendChild($scoreDiv);

  const $scoreHeading = document.createElement('h1');
  $scoreHeading.setAttribute('id', 'score-heading');
  $scoreDiv.appendChild($scoreHeading);
  $scoreHeading.textContent = score;
};

const displaySearchError = () => {
  $mainHeading.textContent = 'ERROR';
  $mainHeading.setAttribute('class', 'incorrect decrease-margin-bottom');
  $emptyResultWrapper.setAttribute('class', 'row');
  $beginWrapper.setAttribute('class', 'row justify-center hidden');
  $loadSpinner.setAttribute('class', 'lds-dual-ring hidden');
  $categoryWrapper.setAttribute('class', 'row hidden');
  $lengthWrapper.setAttribute('class', 'row justify-center hidden');
  $timeLimitWrapper.setAttribute('class', 'row justify-center hidden');
  $skippedWrapper.setAttribute('class', 'row hidden');
  addClicks($htmlHeader, handleHomeClick);
  addClicks($creditsButton, handleCreditsClick);
};

const clearDataModel = data => {
  data.correctAnswer = '';
  data.correctScore = 0;
  data.currentQuestionNum = 0;
  data.incorrectScore = 0;
  data.quizArray = [];
  data.selectedTimeLimit = 0;
  data.totalQuestions = 0;
  data.userAnswer = '';
};

const clearVarsMainJS = () => {
  categorySelection = '';
  difficultySelection = '';
  timeSelection = '';
  lengthSelection = '';
  typeSelection = '';
};

const resetDOM = () => {
  removeChildNodes($quizHeadingWrapper);
  removeChildNodes($multipleChoiceWrapper);
  removeChildNodes($trueFalseWrapper);
  removeChildNodes($scoreWrapper);
  removeChildNodes($responseMessageWrapper);
};

const resetUserSelectionText = () => {
  $questionCountText.textContent = 'Questions: 10';
  $questionTypeText.textContent = 'Type: Any';
  $questionDifficultyText.textContent = 'Difficulty: Any';
};

const resetPage = () => {
  $countdownWrapper.setAttribute('class', 'hidden');
  $userSelectionWrapper.setAttribute('class', 'row justify-center hidden');
  $difficultyWrapper.setAttribute('class', 'row justify-center hidden');
  $timeLimitWrapper.setAttribute('class', 'row justify-center hidden');
  $typeWrapper.setAttribute('class', 'row justify-center hidden');
  $lengthWrapper.setAttribute('class', 'row justify-center hidden');
  $beginWrapper.setAttribute('class', 'row justify-center hidden');
  $emptyResultWrapper.setAttribute('class', 'row hidden');
  $beginButton.removeAttribute('disabled');
  $beginButton.setAttribute('value', 'begin');
  $beginButton.setAttribute('class', 'submit-button text-upper');
  clearDataModel(data);
  clearVarsMainJS();
  resetCountdown();
  resetUserSelectionText();
  resetDOM();
  $gameForm.reset();
  $quizForm.reset();
};

const addClicks = (element, handler) => {
  element.addEventListener('click', handler);
};

const removeClicks = (element, handler) => {
  element.removeEventListener('click', handler);
};

const viewCategorySelection = () => {
  $categoryWrapper.setAttribute('class', 'row');
  $mainHeadingWrapper.setAttribute('class', 'row');
  $mainHeading.removeAttribute('class');
  $mainHeading.textContent = 'Select Category';
  $creditsWrapper.setAttribute('class', 'row hidden');
  addClicks($creditsButton, handleCreditsClick);
  resetPage();
};

const viewCredits = () => {
  $creditsWrapper.setAttribute('class', 'row');
  $categoryWrapper.setAttribute('class', 'row hidden');
  $mainHeadingWrapper.setAttribute('class', 'row');
  $mainHeading.removeAttribute('class');
  $mainHeading.textContent = 'Credits Page';
  resetPage();
};

const viewDifficultySelection = () => {
  $difficultyWrapper.setAttribute('class', 'row justify-center');
  $typeWrapper.setAttribute('class', 'row hidden');
  $mainHeading.textContent = 'Select Difficulty';
};

const viewTimeLimitSelection = () => {
  addClicks($htmlHeader, handleHomeClick);
  addClicks($creditsButton, handleCreditsClick);
  $timeLimitWrapper.setAttribute('class', 'row justify-center');
  $userSelectionWrapper.setAttribute('class', 'row justify-center');
  $difficultyWrapper.setAttribute('class', 'row justify-center hidden');
  $lengthWrapper.setAttribute('class', 'row justify-center hidden');
  $skippedWrapper.setAttribute('class', 'row hidden');
  $loadSpinner.setAttribute('class', 'lds-dual-ring hidden');
  $mainHeading.textContent = 'Select Time Limit';
  $mainHeading.setAttribute('class', 'decrease-margin-bottom');
};

const viewReadyScreen = () => {
  $mainHeading.textContent = 'Ready to start?';
  $mainHeading.setAttribute('class', 'accent-color decrease-margin-bottom font-size-30');
  $beginWrapper.setAttribute('class', 'row justify-center');
  $timeLimitWrapper.setAttribute('class', 'row justify-center hidden');
};

const viewLengthSelection = () => {
  addClicks($htmlHeader, handleHomeClick);
  addClicks($creditsButton, handleCreditsClick);
  $loadSpinner.setAttribute('class', 'lds-dual-ring hidden');
  $lengthWrapper.setAttribute('class', 'row justify-center');
  $categoryWrapper.setAttribute('class', 'row hidden');
  $mainHeading.textContent = 'Select Quiz Length';
};

const viewTypeSelection = () => {
  $loadSpinner.setAttribute('class', 'lds-dual-ring hidden');
  $typeWrapper.setAttribute('class', 'row justify-center');
  $lengthWrapper.setAttribute('class', 'row justify-center hidden');
  $mainHeading.textContent = 'Select Quiz Type';
};

const viewQuiz = () => {
  if (data.quizArray[0].type === 'multiple') {
    $multipleChoiceWrapper.setAttribute('class', 'row justify-center');
    renderMultipleChoice();
    displayMultipleChoice(data.quizArray[0]);
  } else if (data.quizArray[0].type === 'boolean') {
    $trueFalseWrapper.setAttribute('class', 'row justify-center');
    renderTrueOrFalse();
    displayTrueOrFalse(data.quizArray[0]);
  }
  $quizHeadingWrapper.setAttribute('class', 'row');
  $loadSpinner.setAttribute('class', 'lds-dual-ring hidden');
  $timeLimitWrapper.setAttribute('class', 'row justify-center hidden');
  $beginWrapper.setAttribute('class', 'row justify-center hidden');
  $mainHeadingWrapper.setAttribute('class', 'row hidden');
  addClicks($htmlHeader, handleHomeClick);
  addClicks($creditsButton, handleCreditsClick);
};
