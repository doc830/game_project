import React, {useContext, useCallback} from 'react'
import Opponent from "../opponent"
import {MultiplayerContext} from "../../context/multiplayer-context";
export default function OpponentsGenerator(){
    let ind = 0
    const sprite_config = {
        name: "s",
        width: 128,
        height: 128,
    }
    const playerList = []
    const socket = useContext(MultiplayerContext)
    function setPlayerList () {
        for (let i in socket.serverPack) {
            if(socket.socketId !== i) {
                playerList[ind] = (
                <Opponent id={i}
                          skin={sprite_config.name}
                          width={sprite_config.width}
                          height={sprite_config.height}
                          start_walk_anim={4}
                          end_walk_anim={11}
                          start_attack_anim={12}
                          end_attack_anim={19}
                          x={socket.serverPack[i].x}
                          y={socket.serverPack[i].y} />
                )
            }
            ind++
        }
        ind = 0
    }
    setPlayerList()
    return (
        <>
            {playerList}
        </>
    )
}