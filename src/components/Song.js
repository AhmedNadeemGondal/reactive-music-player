import React from "react";

const Song = ({ currentSong, isPlay }) => {
  const rotateStyle = isPlay ? { animation: "rotate 18s linear infinite" } : {};

  return (
    <div className="song-container">
      <img src={currentSong.cover} alt={currentSong.name} style={rotateStyle} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
