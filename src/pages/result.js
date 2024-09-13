import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from '../components/confetti'; // Ensure the path is correct

function Result() {
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  const handleConfetti = () => {
    setTriggerConfetti(true);

    // Reset confetti trigger after animation
    setTimeout(() => {
      setTriggerConfetti(false);
    }, 2000); // Match the duration of the confetti animation
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { userAnswers = [], questions = [], time = '00:00' } = location.state || {};

  // Calculate score
  const score = userAnswers.reduce((acc, answer) => {
    const question = questions.find(q => q.question === answer.question);
    if (question && answer.answer === question.correct_answer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  // Reset function
  const handleReset = () => {
    navigate('/quiz'); // Navigate back to the Quiz page
  };

  // Determine remarks and style based on score
  const totalQuestions = userAnswers.length;
  let remark, remarkClass, color;
  if (score === totalQuestions) {
    remark = 'Excellent work!';
    remarkClass = 'great-job';
    color = 'green';
  } else if (score >= totalQuestions * 0.8) {
    remark = 'Great job!';
    remarkClass = 'great-job';
    color = '#80ff00';
  } else if (score >= totalQuestions * 0.6) {
    remark = 'Good effort!';
    color = 'orange';
  } else if (score >= totalQuestions * 0.4) {
    remark = 'Not so bad';
    color = 'darkorange';
  } else {
    remark = 'Better luck next time';
    color = 'red';
  }

  return (
    <div className='result-container'>
      <div className='header'>
        <h3>Result</h3>
        <div className='timer'>
          {time}
        </div>
      </div>
      {userAnswers.length === 0 ? (
        <h2>No quiz taken</h2>
      ) : (
        <div className='result'>
          <hr />
          <h4>{`${score}/${totalQuestions} in ${time}`}</h4>
          <p className='remark' style={{ color }}>
            {remark}
            {remarkClass === 'great-job' && (
              <Confetti trigger={handleConfetti} />
            )}
          </p>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default Result;
