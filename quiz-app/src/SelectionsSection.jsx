export default function SelectionsSection({
  choiceStatus,
  choices,
  onHandleSelection,
}) {
  return (
    <>
      <div>
        <input
          type="radio"
          name="choice"
          id="A"
          value="A"
          checked={choiceStatus["A"]}
          onChange={onHandleSelection}
        />
        <label htmlFor="A"> A: {choices.A}</label>
      </div>

      <div>
        <input
          type="radio"
          name="choice"
          id="B"
          value="B"
          checked={choiceStatus["B"]}
          onChange={onHandleSelection}
        />
        <label htmlFor="B"> B: {choices.B}</label>
      </div>

      <div>
        <input
          type="radio"
          name="choice"
          id="C"
          value="C"
          checked={choiceStatus["C"]}
          onChange={onHandleSelection}
        />
        <label htmlFor="C"> C: {choices.C}</label>
      </div>

      <div>
        <input
          type="radio"
          name="choice"
          id="D"
          value="D"
          checked={choiceStatus["D"]}
          onChange={onHandleSelection}
        />
        <label htmlFor="D"> D: {choices.D}</label>
      </div>
    </>
  );
}
