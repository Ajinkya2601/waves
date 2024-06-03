import './styles/app.scss'
import Player from './components/player'
import Song from './components/song'
import data from './data'
import { useState,useRef,useEffect } from 'react'
import Library from './components/library'
import Nav from './components/nav'


function App() {
  
  const [songInfo, setSongInfo] = useState({ currentTime: 0, duration: 0 ,animationPercantage:0});
  const audioRef = useRef(null);
  const[songs,setSongs]=useState(data())
  const [currentSong,setCurrentSong]=useState(songs[0])
  const[isPlaying,setIsPlaying]=useState(false)
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent=Math.round(current)
    const roundedDuration=Math.round(duration)
    const animation=Math.round(100*(roundedCurrent/roundedDuration))
     setSongInfo({ ...songInfo, currentTime: current, duration,animationPercantage:animation });
  };
  const playAudio = async () => {
    try {
      if (isPlaying && audioRef.current) {
        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Error trying to play the audio:', error);
    }
  };
  const [libraryStatus,setLibraryStatus]=useState(false)
  const songEndHandler = async() => {
    const current = songs.findIndex(song => song.key === currentSong.key);
    const nextSongIndex = (current + 1) % songs.length;
    setCurrentSong(songs[nextSongIndex]);
  };
  useEffect(() => {
    playAudio();
  }, [currentSong, isPlaying]);
  return (
    <>
      <div className={`App ${libraryStatus?'library-active':""}`}>
        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
        <Song currentSong={currentSong}/>
        <Player setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong} audioRef={audioRef} setSongInfo={setSongInfo}
        songInfo={songInfo} songs={songs} setCurrentSong={setCurrentSong} setSongs={setSongs}/>
        <Library audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setSongs={setSongs} 
        libraryStatus={libraryStatus}/>
        <audio 
        onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
      </div>
    </>
  )
}

export default App
