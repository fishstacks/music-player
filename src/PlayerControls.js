import React from 'react';
import './styles/PlayerControls.scss';
import { Play, Pause, SkipBack, SkipForward  } from 'lucide-react';

function PlayerControls({ onPlay, onPause, onNext, onPrev, isPlaying, toggleMenu, toggleFun }) {
  return (
    <div className="player-controls">
      <button onClick={onPrev}><SkipBack fill="#111" strokeWidth={0}/></button>
      <button onClick={isPlaying ? onPause : onPlay}>
      {isPlaying ? <Pause fill="#111" strokeWidth={0}/> : <Play fill="#111" strokeWidth={0} />}
    </button>
      <button onClick={onNext}><SkipForward fill="#111" strokeWidth={0}/></button>
      <button onClick={toggleMenu}>Playlist</button>
      <button onClick={toggleFun}>Sound effects</button>
      
    </div>
  );
}

export default PlayerControls;
