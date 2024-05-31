import './styles/app.scss'
import Player from './components/player'
import Song from './components/song'
import data from './util'
import { useState } from 'react'
function App() {
  const[songs,setSongs]=useState(data())
  const [currentSong,setCurrentSong]=useState(songs[2])
  const[isPlaying,setIsPlaying]=useState(false)
  return (
    <>
      <div>
        <Song currentSong={currentSong}/>
        <Player setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong}/>
      </div>
    </>
  )
}

export default App
