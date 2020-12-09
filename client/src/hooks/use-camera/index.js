import {useEffect} from 'react'
export default function useCamera (x, y) {
    useEffect(()=>{
        let playground = document.getElementById("playground")
        let viewportCoords = playground.getBoundingClientRect()
        playground.scrollTo({left: x-viewportCoords.width/2+64, top: y-viewportCoords.height/2+64})
    }, [x, y])
}