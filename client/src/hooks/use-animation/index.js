import {useEffect} from 'react'
export default function useAnimation (fn, timeout) {
    useEffect(() => {
        setTimeout(fn, timeout)
    }, [fn, timeout])
}