import {useEffect, useRef, useState, useCallback} from 'react'
import io from "socket.io-client"
export default function useSocket () {
    const [clientCoordinates, setClientCoordinates] = useState({x: 1000, y: 600})
    const [serverPack, setServerPack] = useState({})
    const [socketId, setSocketId] = useState(null)
   const socket = useRef()
   useEffect( ()=>{
       socket.current = io('/')
       socket.current.on('connect', () => {
           console.log("Your session id: "+socket.current.id)
           setSocketId(socket.current.id)
       })

   }, [])
    const sendPack = useCallback(()=>{
        socket.current.emit('clientPack', {
            x: clientCoordinates.x,
            y: clientCoordinates.y
        })
    }, [clientCoordinates])
    useEffect(()=>{
        sendPack()
    }, [sendPack])
    const update = useCallback(()=>{
        socket.current.on('serverPack', (data)=>{
            setServerPack(data)
        })
    }, [])
    useEffect(()=>{
        update()
    }, [update])
    return {
        serverPack,
        clientCoordinates,
        setClientCoordinates,
        socketId
    }
}