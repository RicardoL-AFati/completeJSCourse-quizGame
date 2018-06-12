// points is declared in global scope and initialized to 0
let points = 0;
// lastQuestion is the previous question that was asked. To ensure the same question is not asked twice. 
let lastQuestion;
// Question function constructor. Takes a string, an array of strings, and a number
function Question(question, answers, correctIndex) {
  // Question to ask  
  this.question = question;
  // Array of possible answer strings
  this.answers = answers;
  // Index of the correct answer
  this.correctIndex = correctIndex;
  // Prototype function that logs the question and each possible answer
  this.ask = function () {
    console.log(this.question);
    this.answers.forEach(answer => {
     console.log(answer);
    });
  };
  // Prototype function that compares a given number against the correctIndex number
  this.checkAnswer = function(answer) {
      // If answer is equivalent to correctIndex of this question - return true, else false
      return (answer === this.correctIndex) ? true : false; 
  }
}
// Creating instances of the Question constructor
const question1 = new Question('What is the meta character that matches any digit?', ['0: \\d', '1: \\w', '2: \\s', '3: \\D', '4: \\W'], 0);
const question2 = new Question('Which of the following isn\'t a data-type in javascript?', ['0: Array', '1: Boolean', '2: Object', '3: Integer', '4: String'], 3);
const question3 = new Question('How do you write a multi-line comment in Javascript?', ['0: //comment//', '1: /*comment*/', '2: <!-- comment -->', '3: << comment >>', '4: \\ comment \\'], 1);
const question4 = new Question('Which of the following is the right way to create a new array?', ['0: let myArray = {};', '1: let myArray = ();', '2: let myArray = [];', '3: let myArray = new Array;', '4: let myArray = [...];'], 2);
const question5 = new Question('Which of the following is not a Javascript framework?', ['0: Angular', '1: React', '2: Vue', '3: Ember', '4: Chakra'], 4);
// Storing the instance variables in an array
const questionsArray = [question1, question2, question3, question4, question5];
// Determines a random question, asks it, takes in answer, and runs again if appropriate.
function quiz() {
  // question is return from randomQuestion with the questionsArray as parameter  
  const question = randomQuestion(questionsArray);
  // calling the ask method on the returned question
  question.ask();
  // Prompting user for answer or exit to end game
  const answer = prompt('Enter the number of the correct answer. \nor enter \'exit\' to end the quiz.');
  // if answer was exit - clears console, thanks user, resets points, and returns
  if (answer === 'exit') {
    console.clear();
    console.log('Thanks for playing!');
    points = 0;  
    return;
  }
  // Else calling checkAnswer with answer to check correctness. Passing returned boolean to handleAnswer
  handleAnswer(question.checkAnswer(parseInt(answer)));
  // Calling this function again to ask another question
  quiz();
}
// Pick a random question from passed array. Returns itself if question picked is the same as the last one
function randomQuestion(questionsArray) {
  const index = Math.floor(Math.random() * questionsArray.length);
  const question = questionsArray[index];
  if (question === lastQuestion) return randomQuestion(questionsArray);
  lastQuestion = question;
  return question;    
}
// Logs whether or not answer was correct, adds or subtracts points and displays current points
function handleAnswer(answer) {
  // if checkAnswer returned true - answer is correct  
  if (answer) {
    console.log('Yes! That is correct!');
    points++;
   } else {
    // Else - answer is false   
    console.log('Not the correct answer!');
    points--;
   }
   console.log('-------------------------------------');
   console.log(`Your current points are: ${points}`);
   console.log('-------------------------------------');
}
// Calling quiz() on page load
quiz();