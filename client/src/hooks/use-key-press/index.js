import {useEffect} from 'react'
export default function useKeyPress (fn) {
    useEffect(()=>{
        document.addEventListener("keypress", fn)
        return () => document.removeEventListener("keypress", fn)
    }, [fn])
}