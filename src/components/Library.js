import React from "react";

import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlay,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <p>
        Music provided by{" "}
        <a href="https://chillhop.ffm.to/creatorcred">Chillhop Music</a>
      </p>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            setCurrentSong={setCurrentSong}
            songs={songs}
            id={song.id}
            key={song.id}
            audioRef={audioRef}
            isPlay={isPlay}
            setSongs={setSongs}
          />
        ))}
      </div>
      <p>
        Music provided by
        <a href="https://chillhop.ffm.to/creatorcred"> Chillhop Music</a>
      </p>
    </div>
  );
};

export default Library;
