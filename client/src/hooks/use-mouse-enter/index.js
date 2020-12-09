import {useEffect} from 'react'
export default function useMouseEnter (fn) {
    useEffect(()=>{
        let playground = document.getElementById("playground")
        playground.addEventListener("mouseenter", fn)
        return () => playground.removeEventListener("mouseenter", fn)
    }, [fn])
}