import {useEffect} from 'react'
import spaceAudio from "./assets/space.mp3"

function Sound() {
    useEffect(() => {
        const audio = new Audio(spaceAudio);
        audio.loop = true;
        audio.play();
    
        return () => {
          audio.pause();
          audio.currentTime = 0;
        };
      }, []);
    
      return null;
}

export default Sound