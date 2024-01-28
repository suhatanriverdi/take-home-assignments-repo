import SelectionsSection from "./SelectionsSection";

export default function QuestionsSection({
  currentQuestion,
  currentQuestionIndex,
  handleSelection,
  choiceStatus,
  handleTimeLeft
}) {

  // Start timing for each question
  setInterval(handleTimeLeft, 1000);

  return (
    <div className="flex flex-col text-center h-[300px] w-[500px] bg-green-100 rounded-lg p-5">
      <h1 className="text-xl font-bold text-cyan-800 underline mb-5">
        Question {currentQuestionIndex + 1}
      </h1>
      <h1 className="text-xl mb-5">{currentQuestion.question}</h1>

      <SelectionsSection
        choiceStatus={choiceStatus}
        choices={currentQuestion.choices}
        onHandleSelection={(e) => handleSelection(e)}
      />
    </div>
  );
}
