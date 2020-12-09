import React, {useState, useContext} from 'react'
import CharacterSprite from "../character-sprite";
import useMouseClick from "../../hooks/use-mouse-click";
import usePlayerAbilities from "../../hooks/use-player-abilities";
import useMouseEnter from "../../hooks/use-mouse-enter";
import useMouseLeave from "../../hooks/use-mouse-leave";
import useCamera from "../../hooks/use-camera";
import useAnimation from "../../hooks/use-animation";
import useKeyPress from "../../hooks/use-key-press";
import {MultiplayerContext} from "../../context/multiplayer-context";
export default function Player ({skin, height, width, start_walk_anim, end_walk_anim, start_attack_anim, end_attack_anim, x_start, y_start}) {
    const {position, dir, step, move, executeMoveAnimation, attack, executeAttackAnimation} = usePlayerAbilities(x_start, y_start, start_walk_anim, end_walk_anim, start_attack_anim, end_attack_anim, width, height)
    const [mouseEnter, setMouseEnter] = useState(false)
    const sprite_resolution = {h: height, w: width}
    const socket = useContext(MultiplayerContext)
    useMouseEnter((e)=>{
        e.preventDefault()
        setMouseEnter(true)
    })
    useMouseLeave((e)=>{
        e.preventDefault()
        setMouseEnter(false)
    })
    useMouseClick((e)=>{
        e.preventDefault()
        setMouseEnter(true)
        let target = e.target.closest('#playground')
        let targetCoords = target.getBoundingClientRect()
        let left = e.clientX - targetCoords.left + target.scrollLeft
        let top = e.clientY - targetCoords.top  + target.scrollTop
        socket.setClientCoordinates({
            x: left,
            y: top
        })
        move(left, top)
    })
    useKeyPress((e)=>{
        e.preventDefault()
        if(e.keyCode===32&&mouseEnter) {
            attack()
        }
    })
    useAnimation(executeMoveAnimation, 80)
    useAnimation(executeAttackAnimation, 150)
    useCamera(position.x, position.y)
    return(<CharacterSprite sprite={`/sprites/skins/${skin}.png`} sprite_resolution={sprite_resolution} step={step} dir={dir} position={position}/>)
}