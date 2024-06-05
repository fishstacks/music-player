import React from 'react';
import './styles/FunControls.scss';
import EqualizerControls from './EqualizerControls';

function FunControls({ volume, setVolume, pan, setPan,
  bass, setBass, mid, setMid, treble, setTreble }) {
  return (
    <>
    <div className="volume-control">
        <label htmlFor="volume">Volume</label>
            <input
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(e.target.value)} 
            className="volume-slider"/>
    </div>
    <EqualizerControls bass={bass} setBass={setBass} mid={mid} setMid={setMid} treble={treble} setTreble={setTreble}/>
    <div className="pan-control">
      <label htmlFor="pan">Pan</label>
      <input
        type="range"
        id="pan"
        name="pan"
        min="-1"
        max="1"
        step="0.01"
        value={pan}
        onChange={(e) => setPan(Number(e.target.value))}
        className="pan-slider"
      />
    </div>
    </>
  );
}

export default FunControls;
