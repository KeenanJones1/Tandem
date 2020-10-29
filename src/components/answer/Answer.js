import React from 'react'
import './Answer.css'

const Answer = (props) => {
 
 let answers

 if( props.incorrect && props.correct ){
    answers = props.incorrect.concat(props.correct)

    answers = answers.map(
    answer => <li 
    className=
         {
             props.correctAnswer === answer ?
             'correct' : 
             props.clickedAnswer === answer ? 
             'incorrect' : ''
         }
         onClick={() => props.checkAnswer(answer)}>{answer}</li>
    )
 }else{
  answers = <li>Please wait for answers to load</li>
 }

 console.log(props)

 return (
  <>
  <ul disabled={props.clickedAnswer ? true : false} className="answers">
      {answers}
  </ul>
  <div>
      {
          props.correctAnswer ?
          'Correct Answer!' : 
          props.clickedAnswer ? 'Incorrect Answer!' : ''
      }
  </div>
</>
 )
}

export default Answer
