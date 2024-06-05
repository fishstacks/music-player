import React from 'react';
import './styles/SideMenu.scss';

function SideMenu({ songs, currentSongIndex, selectSong }) {
  return (
    <div className="side-menu-content">
      <h3>Song List</h3>
      <ul>
        {songs.map((song, index) => (
          <li
            key={index}
            className={index === currentSongIndex ? 'active' : ''}
            onClick={() => selectSong(index)}
          >
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideMenu;
