import React, { useState, useEffect, useRef, useCallback } from 'react';
import './styles/App.scss';
import PlayerControls from './PlayerControls';
import FunControls from './FunControls';
import SideMenu from './SideMenu';
import Visualizer from './Visualizer';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [pan, setPan] = useState(0);
  const [bass, setBass] = useState(0);
  const [mid, setMid] = useState(0);
  const [treble, setTreble] = useState(0); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFunOpen, setIsFunOpen] = useState(false);
  const audioRef = useRef(new Audio());
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const gainNodeRef = useRef(null);
  const pannerNodeRef = useRef(null);
  const bassRef = useRef(null);
  const midRef = useRef(null);
  const trebleRef = useRef(null);

  useEffect(() => {
    fetch('/music/songs.json')
      .then(response => response.json())
      .then(data => {
        setSongs(data);
        setCurrentSongIndex(0);
      })
      .catch(error => console.log('Error fetching songs:', error));
  }, []);

  useEffect(() => {
    if (!audioCtxRef.current) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioRef.current);
      const gainNode = audioContext.createGain();
      const pannerNode = audioContext.createStereoPanner();
      const bass = audioContext.createBiquadFilter();
      const mid = audioContext.createBiquadFilter();
      const treble = audioContext.createBiquadFilter();
  
      bass.type = "lowshelf";
      bass.frequency.value = 250; 
      mid.type = "peaking";
      mid.frequency.value = 1000; 
      treble.type = "highshelf";
      treble.frequency.value = 4000;
  
      source.connect(gainNode);
      gainNode.connect(pannerNode);
      pannerNode.connect(bass);
      bass.connect(mid);
      mid.connect(treble);
      treble.connect(analyser);
      analyser.connect(audioContext.destination);
  
      audioCtxRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;
      gainNodeRef.current = gainNode;
      pannerNodeRef.current = pannerNode;
      bassRef.current = bass;
      midRef.current = mid;
      trebleRef.current = treble;
    }
  }, []);
  

  const play = useCallback(() => {
    if (audioRef.current.src !== songs[currentSongIndex]?.file) {
      audioRef.current.src = songs[currentSongIndex]?.file;
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    audioRef.current.play().catch(error => console.error('Error playing song:', error));
    setIsPlaying(true);
  }, [currentSongIndex, songs]);

  const pause = useCallback(() => {
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (gainNodeRef.current && Number.isFinite(volume)) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);
  
  useEffect(() => {
    if (pannerNodeRef.current && Number.isFinite(pan)) {
      pannerNodeRef.current.pan.value = pan;
    }
  }, [pan]);
  
  useEffect(() => {
    if (bassRef.current && Number.isFinite(bass)) {
      bassRef.current.gain.value = bass;
    }
  }, [bass]);
  
  useEffect(() => {
    if (midRef.current && Number.isFinite(mid)) {
      midRef.current.gain.value = mid;
    }
  }, [mid]);
  
  useEffect(() => {
    if (trebleRef.current && Number.isFinite(treble)) {
      trebleRef.current.gain.value = treble;
    }
  }, [treble]);
  

  const nextSong = useCallback(() => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
  }, [currentSongIndex, songs.length]);

  const prevSong = useCallback(() => {
    setCurrentSongIndex(currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1);
  }, [currentSongIndex, songs.length]);

  const seek = useCallback((e) => {
    const progressBar = e.target;
    const clickPosition = e.nativeEvent.offsetX / progressBar.offsetWidth;
    const newTime = clickPosition * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  const selectSong = useCallback((index) => {
    setCurrentSongIndex(index);
    play();
  }, [play]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const toggleFun = useCallback(() => {
    setIsFunOpen(!isFunOpen);
  }, [isFunOpen]);

  useEffect(() => {
    if (isPlaying) {
      play();
    }
  }, [currentSongIndex, play, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  return (
    <div className="App">
      <div className={isMenuOpen ? "side-menu side-menu-open" : "side-menu"}>
        <SideMenu songs={songs} currentSongIndex={currentSongIndex} selectSong={selectSong} />
      </div>
      <div className={isFunOpen ? "side-fun side-fun-open" : "side-fun"}>
      <FunControls 
      volume={volume} setVolume={setVolume}
      pan={pan} setPan={setPan}
      bass={bass} setBass={setBass} mid={mid} setMid={setMid} treble={treble} setTreble={setTreble} />
      </div>
      {songs.length > 0 && (
        <div className="wrapper">
        <div className="song-container">
          <div className="electronic-container">
            <h1>{songs[currentSongIndex]?.title}</h1>
            <Visualizer analyserNode={analyserRef.current} />
          </div>
          <PlayerControls
            onPlay={play}
            onPause={pause}
            onNext={nextSong}
            onPrev={prevSong}
            toggleMenu={toggleMenu}
            toggleFun={toggleFun}
            isPlaying={isPlaying}
          />
          <div className="time-bar" onClick={seek}>
            <div style={{ width: `${(currentTime / duration) * 100}%` }} className="progress"></div>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
}

export default App;
