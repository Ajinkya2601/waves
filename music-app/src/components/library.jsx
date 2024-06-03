import React from 'react'
import LibrarySong from "./librarysong"
const library = ({songs,setCurrentSong,audioRef,isPlaying,setSongs,libraryStatus}) => {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ""}`}>
        <h2>Library</h2>
        <div className="library-songs">
            {songs.map((song)=>(
                <LibrarySong song={song} setCurrentSong={setCurrentSong} songs={songs} key={song.key} id={song.key} audioRef={audioRef}
                isPlaying={isPlaying} setSongs={setSongs}/>
            ))}
        </div>
    </div>
  )
}

export default library