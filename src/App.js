import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import Library from "./components/Library";
import Nav from "./components/Nav.js";

import data from "./data.js";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlay, setIsPlay] = useState(false);
  const audioRef = useRef(null);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currTime: 0,
    duration: 0,
    animationPercent: 0,
  });

  const timeUpdateHand = (e) => {
    const currTime = e.target.currentTime;
    const duration = e.target.duration;
    const roundCurr = Math.round(currTime);
    const roundDuration = Math.round(duration);
    const animation = Math.round((roundCurr / roundDuration) * 100);
    setSongInfo({
      ...songInfo,
      currTime,
      duration,
      animationPercent: animation,
    });
  };
  //
  const songEndHand = () => {
    let currIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextSong = songs[(currIndex + 1) % songs.length];
    setCurrentSong(nextSong);
    if (isPlay) {
      audioRef.current.pause();
      audioRef.current.load(); // Ensure the new song is loaded

      audioRef.current.addEventListener(
        "canplaythrough",
        () => {
          audioRef.current.play();
        },
        { once: true }
      ); // Ensure it fires only once
    }
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} isPlay={isPlay} />
      <Player
        currentSong={currentSong}
        isPlay={isPlay}
        setIsPlay={setIsPlay}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlay={isPlay}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHand}
        onLoadedMetadata={timeUpdateHand}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHand}
      ></audio>
    </div>
  );
}

export default App;
