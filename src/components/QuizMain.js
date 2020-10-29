import React, { Component } from 'react'
import './QuizMain.css'
import Question from './question/Question'
import Answer from './answer/Answer'
import tandemQuestions from '../TandemQuestions'

export default class QuizMain extends Component {
 constructor(){
  super()
  this.state = {
   questions: [],
   answers: [],
   correctAnswers: [],
   correctAnswer: 0,
   clickedAnswer: 0,
   step: 1,
   score: 0
  }
 }


 componentDidMount(){  

  let list = tandemQuestions.sort(function(a,b){
   return Math.random() * 2-1;
});

  let half = Math.floor(list.length / 2)

  let firstHalf = list.splice(0, half)

  firstHalf.map( question => {
   this.setState(prevState => ({
    questions: [...prevState.questions, question.question],
    answers: [...prevState.answers, question.incorrect],
    correctAnswers: [...prevState.correctAnswers, question.correct]
   }))
  })
 }
 
 checkAnswer = answer => {
  const { correctAnswers, correctAnswer, step, score} = this.state;
  if(answer === correctAnswers[step - 1]){
   this.setState({
       score: score + 1,
       correctAnswer: correctAnswers[step - 1],
       clickedAnswer: answer
   });
}else{
   this.setState({
       correctAnswer: 0,
       clickedAnswer: answer
   });
}
 }


// moving to the next question
 nextStep = (step) => {
  this.setState({
      step: step + 1,
      correctAnswer: 0,
      clickedAnswer: 0
  });
}
 
 
 
 render() {
  let { questions, correctAnswers, answers, step, clickedAnswer, correctAnswer, score } = this.state

  return (
   <div className="content">
    {
     step <= questions.length ? 
     (<>
         <Question
             question={questions[step - 1]}
         />
         <Answer
             incorrect={answers[step - 1]}
             correct={correctAnswers[step -1]}
             step={step}
             checkAnswer={this.checkAnswer}
             correctAnswer={correctAnswer}
             clickedAnswer={clickedAnswer}
         />
         <button
         className="NextStep"
         disabled={
             clickedAnswer && questions.length >= step ? false : true
         }
         onClick={() => this.nextStep(step)}>Next</button>
     </>) : (<div className="finalPage">
             <h1>You have completed the quiz!</h1>
             <p>Your score is: {score} of {questions.length}</p>
             <p>Thank you!</p>
         </div>
     )
    }
   </div>
  )
 }
}
