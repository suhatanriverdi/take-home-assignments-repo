export default function SelectionsSection({ choices, handleSelection }) {
  return (
    <>
      <div>
          <input type="radio" name="choice" id="A" value="A" checked={false} onChange={handleSelection} />
          <label htmlFor="A"> A: {choices.A}</label>
        </div>

        <div>
          <input type="radio" name="choice" id="B" value="B" checked={false} onChange={handleSelection} />
          <label htmlFor="B"> B: {choices.B}</label>
        </div>

        <div>
          <input type="radio" name="choice" id="C" value="C" checked={false} onChange={handleSelection} />
          <label htmlFor="C"> C: {choices.C}</label>
        </div>

        <div>
          <input type="radio" name="choice" id="D" value="D" checked={false} onChange={handleSelection} />
          <label htmlFor="D"> D: {choices.D}</label>
        </div>
    </>
    
  );
}