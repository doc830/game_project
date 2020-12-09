import {createContext} from 'react'
function noop() {}
export const MultiplayerContext = createContext({
    clientCoordinates: null,
    setClientCoordinates: noop,
    serverPack: null,
    socketId: null
})