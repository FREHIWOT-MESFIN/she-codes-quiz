import React from 'react';
import './questions.css';

function Qcard(props) {
  const { answers, correctAnswer, handleAnswer, selectedAnswer, answered, setNext, index, question } = props;

  return (
    <div className='qCard'>
      <p>{`${index}. ${question}`}</p>
      <ul>
        {answers.map((ans, idx) => (
          <li key={idx}>
            <i
              className={`ri-checkbox-blank-circle-line 
                ${answered ? (ans === correctAnswer ? 'ri-checkbox-circle-line' : ans === selectedAnswer ? 'ri-close-circle-line' : 'disabled') : ''}
                ${answered && ans === selectedAnswer ? 'selected' : ''}
              `}
              onClick={() => handleAnswer(ans)}
            ></i>
            {ans}
          </li>
        ))}
      </ul>
      <button onClick={setNext} disabled={!answered}>Next</button>
    </div>
  );
}

export default Qcard;
