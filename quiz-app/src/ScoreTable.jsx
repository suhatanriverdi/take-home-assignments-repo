export default function ScoreTable({ questions, userAnswers, score }) {
  const rows = questions.map((q, index) => {
    const { answer, choices } = q;
    const answerTextStyle = (userAnswers[index] === answer) ? 
                            "border border-slate-600 font-bold text-green-500" :
                            "border border-slate-600 font-bold text-red-500"
    return (
      <tr key={index}>
        <td className="text-center border border-slate-600">{index + 1}</td>
        <td className="border border-slate-600">&nbsp;&nbsp;&nbsp;{answer + " (" + choices[answer] + ")"}</td>
        <td className={answerTextStyle}>&nbsp;&nbsp;&nbsp;{userAnswers[index]}</td>
      </tr>
    );
  });

  return (
    <div className="bg-lime-100">
      <table className="w-[500px] text-xl border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border-collapse border border-slate-500">Questions</th>
            <th className="border-collapse border border-slate-500">Answers</th>
            <th className="border-collapse border border-slate-500">Your Answer</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <p className="text-xl text-center">Your Score: {score}/10</p>
    </div>
  );
}
