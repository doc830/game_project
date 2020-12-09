import {useEffect} from 'react'
export default function useMouseClick (fn) {
    useEffect(()=>{
        let playground = document.getElementById("playground")
        playground.addEventListener("click", fn)
        return () => playground.removeEventListener("click", fn)
    }, [fn])
}