import React, { useState, useEffect } from 'react';
import Qcard from '../components/questionCard';
import { useNavigate } from 'react-router-dom';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const navigate = useNavigate();

    // Function to shuffle an array
    const shuffleArray = (array) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    // Fetch questions from API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('https://opentdb.com/api.php?amount=10&category=18');
                const data = await response.json();

                // Process questions and answers
                const processedQuestions = data.results.map(question => {
                    const answers = [question.correct_answer, ...question.incorrect_answers];
                    const shuffledAnswers = shuffleArray(answers);

                    return {
                        ...question,
                        answers: shuffledAnswers
                    };
                });

                setQuestions(data.results);
                setShuffledQuestions(processedQuestions); 
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchQuestions();
    }, []);

    // Timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds === 59) {
                    setMinutes(prevMinutes => prevMinutes + 1);
                    return 0;
                }
                return prevSeconds + 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    const handleAnswer = (answer) => {
        if (answered) return;
        setSelectedAnswer(answer);
        setAnswered(true);
        setUserAnswers(prev => [...prev, { question: shuffledQuestions[currentIndex].question, answer }]); // Track answer
    };

    
    const handleNext = () => {
        if (currentIndex + 1 >= shuffledQuestions.length) {
            navigate('/result', { state: { userAnswers, questions, time: `${minutes}:${seconds.toString().padStart(2, '0')}` } });
        } else {
            setCurrentIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer(null);
            setAnswered(false);
        }
    };

    const currentQuestion = shuffledQuestions[currentIndex];
    const proIndex = currentIndex + 1;
    const progressPercentage = (proIndex / shuffledQuestions.length) * 100;

    return (
        <div className='quiz-container'>
            <div>
                <div className='header'>
                    <h3>Quiz</h3>
                    <div className='timer'>
                        {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
                    </div>
                </div>
                <div className='progress-bar'>
                    <div className='bar' style={{ width: `${progressPercentage}%`, backgroundColor: "hotpink", height: '100%', borderRadius: 'inherit' }}></div>
                </div>
            </div>
            {currentQuestion ? (
                <Qcard 
                    index={currentIndex + 1} 
                    question={currentQuestion.question.replace(/&quot;/gi, '"').replace(/&#039;/gi, "'")} 
                    correctAnswer={currentQuestion.correct_answer}
                    answers={currentQuestion.answers}
                    handleAnswer={handleAnswer} 
                    selectedAnswer={selectedAnswer}
                    answered={answered}
                    setNext={handleNext}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Quiz;
