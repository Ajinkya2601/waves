import React from 'react'

export const song = ({currentSong}) => {
  return (
    <div className="song-container">
        <img alt={currentSong.name} src={currentSong.cover}></img>
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
    </div>
  )
}

export default song;