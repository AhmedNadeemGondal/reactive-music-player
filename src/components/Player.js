import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlay,
  setIsPlay,
  audioRef,
  songs,
  songInfo,
  setSongInfo,
  setCurrentSong,
  setSongs,
}) => {
  const activeLibHand = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
  };

  const playSongHand = () => {
    if (isPlay) {
      audioRef.current.pause();
      setIsPlay(!isPlay);
    } else {
      audioRef.current.play();
      setIsPlay(!isPlay);
    }
  };

  const draghand = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currTime: e.target.value });
  };

  //   const getTime = (time) => {
  //     return Math.floor(time / 60 + ":" + Math.floor(time % 60).slice(-2));
  //   };

  const skipTrackhand = async (direction) => {
    let currIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currIndex + 1) % songs.length]);
      activeLibHand(songs[(currIndex + 1) % songs.length].id);
    }
    if (direction === "skip-back") {
      if ((currIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibHand(songs[songs.length - 1].id);
        if (isPlay) audioRef.current.play();
        return;
      }
      if (isPlay) audioRef.current.play();
      await setCurrentSong(songs[(currIndex - 1) % songs.length]);
      activeLibHand(songs[(currIndex - 1) % songs.length].id);
    }
    if (isPlay) audioRef.current.play();
  };

  const getTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const tracAnim = {
    transform: `translateX(${songInfo.animationPercent}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currTime}
            onChange={draghand}
            type="range"
          />
          <div style={tracAnim} className="animate-track"></div>
        </div>
        <p>
          {getTime(songInfo.duration) ? getTime(songInfo.duration) : "0:00"}
        </p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => {
            skipTrackhand("skip-back");
          }}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHand}
          className="play"
          size="2x"
          icon={isPlay ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => {
            skipTrackhand("skip-forward");
          }}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
