import React, {useContext} from 'react'
import Player from "../../components/player"
import MapGenerator from "../../components/map-generator"
import {MultiplayerContext} from "../../context/multiplayer-context"
import OpponentsGenerator from "../../components/opponents-generator"
export default function GamePage () {
    const socket = useContext(MultiplayerContext)
    const sprite_config = {
        name: "s",
        width: 128,
        height: 128,
    }
    const position = {
        x: socket.clientCoordinates.x,
        y: socket.clientCoordinates.y
    }
    return (
        <div id = "interface">
            <div className="zone-container" id="playground">
                <MapGenerator/>
                <OpponentsGenerator/>
                <Player skin={sprite_config.name}
                        width={sprite_config.width}
                        height={sprite_config.height}
                        start_walk_anim={4}
                        end_walk_anim={11}
                        start_attack_anim={12}
                        end_attack_anim={19}
                        x_start={position.x}
                        y_start={position.y}/>
            </div>
        </div>
    )
}