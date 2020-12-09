import React from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import useRoutes from "./routes"
import useSocket from "./hooks/use-socket";
import {MultiplayerContext} from "./context/multiplayer-context";
export default function App() {
    const {setClientCoordinates, clientCoordinates, serverPack, socketId} = useSocket()
    const routes = useRoutes()
  return(
      <MultiplayerContext.Provider value={{
          setClientCoordinates, clientCoordinates, serverPack, socketId
      }}>
          <Router>
              <div className="container">
                  {routes}
              </div>
          </Router>
      </MultiplayerContext.Provider>
  )
}

