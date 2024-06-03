import React from 'react'

const librarysong = ({song,setCurrentSong,songs,id,audioRef,isPlaying,setSongs}) => {
  const songSelectHandler= async()=>{
    const selectedSong=await songs.filter((state)=>state.key===id)
   await setCurrentSong(selectedSong[0])
   const newSongs=songs.map((song)=>{
    if(song.key===id){
      return{
        ...song,active:true,
      }
    }
    else{
      return {
        ...song,active:false,
      }
    }
   })
   setSongs(newSongs)
  }
  return (
    <div onClick={songSelectHandler} className={`library-song ${song.active ? "selected" : "s"}`}>
        <img alt={song.name} src={song.cover}></img>
        <div className="song-desc">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
        </div>
    </div>
  )
}

export default librarysong