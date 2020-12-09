import {useEffect} from 'react'
export default function useMouseLeave (fn) {
    useEffect(()=>{
        let playground = document.getElementById("playground")
        playground.addEventListener("mouseleave", fn)
        return () => playground.removeEventListener("mouseleave", fn)
    }, [fn])
}