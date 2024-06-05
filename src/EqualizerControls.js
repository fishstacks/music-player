import React from 'react';
import './styles/EqualizerControls.scss';

function EqualizerControls({ bass, setBass, mid, setMid, treble, setTreble }) {
  return (
    <>
    <div className="equalizer-control">
      <div>
        <label htmlFor="bass">Bass</label>
        <input
          type="range"
          id="bass"
          name="bass"
          min="-30"
          max="30"
          step="1"
          value={bass}
          onChange={(e) => setBass(Number(e.target.value))}
          className="eq-slider"
        />
      </div>
      <div>
        <label htmlFor="mid">Mid</label>
        <input
          type="range"
          id="mid"
          name="mid"
          min="-30"
          max="30"
          step="1"
          value={mid}
          onChange={(e) => setMid(Number(e.target.value))}
          className="eq-slider"
        />
      </div>
      <div>
        <label htmlFor="treble">Treble</label>
        <input
          type="range"
          id="treble"
          name="treble"
          min="-30"
          max="30"
          step="1"
          value={treble}
          onChange={(e) => setTreble(Number(e.target.value))}
          className="eq-slider"
        />
      </div>
    </div>
    </>
  );
}

export default EqualizerControls;
