import { useState, useRef, useEffect } from "react";
import QuestionsSection from "./QuestionsSection";
import Loading from "./Loading";
import ScoreTable from "./ScoreTable";
import { getRandomAnswer, URL } from "./utils";

const initialChoicesState = {
  A: false,
  B: false,
  C: false,
  D: false,
};

export default function App() {
  // Time Remaining
  const intervalHandleRef = useRef();
  const [timeLeft, setTimeLeft] = useState(30);

  // Update time left
  const updateTimeLeft = () => {
    if (timeLeft > 0) {
      setTimeLeft(timeLeft - 1);
    } else if (timeLeft === 0) {
      handleNextBtn();
    }
  };

  const startCountDownTimer = () => {
    intervalHandleRef.current = setInterval(updateTimeLeft, 1000);
  };

  const stopCountDownTimer = () => {
    clearInterval(intervalHandleRef.current);
  };

  const resetCountDownTimer = () => {
    stopCountDownTimer();
    setTimeLeft(30);
    intervalHandleRef.current = setInterval(updateTimeLeft, 1000);
  };

  useEffect(() => {
    // Start countdown timer
    if (currentQuestionIndex !== 10) {
      startCountDownTimer();
    }
    /*
    The function we return from the useEffect hook
    gets invoked when the component unmounts and can be used for cleanup purposes.
    */
    //  Runs on unmount, clear on every unmount
    return () => {
      clearInterval(intervalHandleRef.current);
    };
  });

  // Questions & Answers State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  // Choices State
  const [choiceStatus, setChoiceStatus] = useState(initialChoicesState);
  const handleSelection = (e) => {
    const value = e.target.value;
    setChoiceStatus({
      A: false,
      B: false,
      C: false,
      D: false,
      [value]: true,
    });
    // To update score & user answers
    handleUserAnswers(e);
  };

  const resetChoicesState = () => {
    setChoiceStatus(initialChoicesState);
  };

  // User's Choices
  const [userAnswers, setUserAnswers] = useState(Array(10).fill("-"));

  // This will prepare all the questions initially
  useEffect(() => {
    // Fetch & return questions
    async function getQuestions() {
      const response = await fetch(URL);
      const data = await response.json().then((data) => data.slice(0, 10));
      const questions = [];
      for (const obj of data) {
        const choices = obj.body.split(" ").slice(0, 4);
        const questionObject = {
          question: "What " + obj.title + " ?",
          answer: getRandomAnswer(),
          choices: {
            A: choices[0],
            B: choices[1],
            C: choices[2],
            D: choices[3],
          },
        };
        questions.push(questionObject);
      }
      // Initialize state with questions & answers
      setQuestions(questions);
      // Update current question
      setCurrentQuestion(questions[currentQuestionIndex]);
    }
    getQuestions();
  }, []);

  const handleNextBtn = () => {
    if (currentQuestionIndex !== 10) {
      setCurrentQuestionIndex((oldIndex) => oldIndex + 1);
      setCurrentQuestion(questions[currentQuestionIndex + 1]);
    }
    // Update Score
    setScore(
      (oldScore) =>
        oldScore +
        (userAnswers[currentQuestionIndex] ===
          questions[currentQuestionIndex].answer)
    );
    // Resets multiple-choices state
    resetChoicesState();
    // Resets countDownTimer for the next question
    resetCountDownTimer();
  };

  const handleResetBtn = () => {
    window.location.reload();
  };

  const handleUserAnswers = (e) => {
    const selectedAnswer = e.target.value;
    setUserAnswers((oldUserAnswers) => {
      const newUserAnswers = oldUserAnswers;
      newUserAnswers[currentQuestionIndex] = selectedAnswer;
      return newUserAnswers;
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {questions.length == 0 ? (
        <Loading />
      ) : (
        <>
          <h1 className="font-bold text-4xl my-10 underline">Quiz App</h1>
          {currentQuestionIndex !== 10 ? (
            <h2 className="font-semibold text-blue-600 text-2xl mb-5">
              Time Left: {timeLeft}
            </h2>
          ) : (
            <h2 className="font-semibold text-lime-600 text-2xl mb-5">
              Quiz Completed!
            </h2>
          )}
          <div className="flex flex-col justify-center items-center h-[400px] w-[600px] bg-orange-200 rounded-lg shadow-xl">
            {currentQuestionIndex === 10 ? (
              <ScoreTable
                questions={questions}
                userAnswers={userAnswers}
                score={score}
              />
            ) : (
              <QuestionsSection
                currentQuestion={currentQuestion}
                currentQuestionIndex={currentQuestionIndex}
                handleSelection={handleSelection}
                choiceStatus={choiceStatus}
                canClick={timeLeft > 20 ? true : false}
              />
            )}
          </div>
          {currentQuestionIndex === 10 ? (
            <button
              onClick={handleResetBtn}
              className="shadow-lg bg-green-300 font-medium h-10 w-40 rounded-lg mt-10">
              Reset Quiz
            </button>
          ) : (
            <button
              onClick={handleNextBtn}
              className="shadow-lg bg-blue-300 font-medium h-10 w-40 rounded-lg mt-10">
              Next Question
            </button>
          )}
        </>
      )}
    </div>
  );
}
