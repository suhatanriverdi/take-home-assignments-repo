export default function SelectionsSection({
  choiceStatus,
  choices,
  onHandleSelection,
  canClick
}) {
  return (
    <>
      <div className={`${canClick && "bg-slate-300"} ${choiceStatus["A"] && "border-2 border-blue-500"} w-fit rounded-lg m-1 px-3 py-1`}>
        <input
          type="radio"
          name="choice"
          id="A"
          value="A"
          disabled={canClick}
          checked={choiceStatus["A"]}
          onChange={onHandleSelection}
        />
        <label className={`${canClick && "text-slate-400"}`} htmlFor="A"> A) {choices.A}</label>
      </div>

      <div className={`${canClick && "bg-slate-300"} ${choiceStatus["B"] && "border-2 border-blue-500"} w-fit rounded-lg m-1 px-3 py-1`}>
        <input
          type="radio"
          name="choice"
          id="B"
          value="B"
          disabled={canClick}
          checked={choiceStatus["B"]}
          onChange={onHandleSelection}
        />
        <label className={`${canClick && "text-slate-400"}`} htmlFor="B"> B) {choices.B}</label>
      </div>

      <div className={`${canClick && "bg-slate-300"} ${choiceStatus["C"] && "border-2 border-blue-500"} w-fit rounded-lg m-1 px-3 py-1`}>
        <input
          type="radio"
          name="choice"
          id="C"
          value="C"
          disabled={canClick}
          checked={choiceStatus["C"]}
          onChange={onHandleSelection}
        />
        <label className={`${canClick && "text-slate-400"}`} htmlFor="C"> C) {choices.C}</label>
      </div>

      <div className={`${canClick && "bg-slate-300"} ${choiceStatus["D"] && "border-2 border-blue-500"} w-fit rounded-lg m-1 px-3 py-1`}>
        <input
          type="radio"
          name="choice"
          id="D"
          value="D"
          disabled={canClick}
          checked={choiceStatus["D"]}
          onChange={onHandleSelection}
        />
        <label className={`${canClick && "text-slate-400"}`} htmlFor="D"> D) {choices.D}</label>
      </div>
    </>
  );
}
