import React,{useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, isPlaying, setIsPlaying,audioRef,songInfo,setSongInfo,songs,setCurrentSong,setSongs }) => {
   const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  const activeHandler=(nextPrev)=>{
    const newSongs=songs.map((song)=>{
      if(song.key===currentSong.key){
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
     if(isPlaying) audioRef.current.play()
  }

  const getTime = (time) => {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler= async(direction)=>{
      let current=songs.findIndex((song)=>song.key===currentSong.key)
      if(direction==="forward"){
        await setCurrentSong(songs[(current+1)%songs.length])
        activeHandler(songs[(current+1)%songs.length])
      }
      if(direction=="back"){
        if((current-1)%songs.length==-1){
          current=songs.length
        }
        await setCurrentSong(songs[(current-1)%songs.length])
      }
      if(isPlaying) audioRef.current.play()
  }
  const trackAnim={
    transform:`translateX(${songInfo.animationPercantage}%)`
  }
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={{background:`linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
        <input 
          min={0} 
          max={songInfo.duration || 0} 
          value={songInfo.currentTime} 
          onChange={dragHandler} 
          type="range" 
        />
        <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon onClick={()=>skipTrackHandler("back")} className='skip-back' size='2x' icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon={!isPlaying?faPlay:faPause} />
        <FontAwesomeIcon onClick={()=>skipTrackHandler("forward")} className='skip-forward' size='2x' icon={faAngleRight} />
      </div>
    </div>
  );
};

export default Player;
