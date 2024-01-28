import { useState } from "react";
import QuestionsSection from "./QuestionsSection";
import Loading from "./Loading";
import ScoreTable from "./ScoreTable";
import { useEffect } from "react";
import { getRandomAnswer, URL } from "./utils";

export default function App() {
  // Questions & Answers State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

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
    setScore((oldScore) => (oldScore + (userAnswers[currentQuestionIndex] === questions[currentQuestionIndex].answer)));
  };

  const handleResetBtn = () => {
    // TODO refresh page
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
          <h1 className="font-bold text-4xl my-10">Quiz App</h1>
          <div className="flex flex-col justify-center items-center h-[400px] w-[600px] bg-orange-200 rounded-lg p-5">
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
                handleUserAnswers={handleUserAnswers}
              />
            )}
          </div>
          {currentQuestionIndex === 10 ? (
            <button
              onClick={handleResetBtn}
              className="bg-green-300 font-medium h-10 w-40 rounded-lg mt-10">
              Reset Quiz
            </button>
          ) : (
            <button
              onClick={handleNextBtn}
              className="bg-blue-300 font-medium h-10 w-40 rounded-lg mt-10">
              Next Question
            </button>
          )}
        </>
      )}
    </div>
  );
}
