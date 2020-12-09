import React, {useState, useMemo} from 'react'
import CharacterSprite from "../character-sprite";
import usePlayerAbilities from "../../hooks/use-player-abilities";
import useAnimation from "../../hooks/use-animation";
export default function Opponent ({id , skin, height, width, start_walk_anim, end_walk_anim, start_attack_anim, end_attack_anim, x, y}) {
    const [p, setP] = useState({x: x, y: y})
    const {position, dir, step, move, executeMoveAnimation, executeAttackAnimation} = usePlayerAbilities(x, y, start_walk_anim, end_walk_anim, start_attack_anim, end_attack_anim, width, height)
    const sprite_resolution = {h: height, w: width}
    useMemo(function () {
        if (x !== p.x || y !== p.y) {
            setP({x: x, y: y})
            move(x,y)
        }
        // eslint-disable-next-line
    }, [x, y])
    useAnimation(executeMoveAnimation, 80)
    useAnimation(executeAttackAnimation, 150)
    return(<CharacterSprite id = {id} sprite={`/sprites/skins/${skin}.png`} sprite_resolution={sprite_resolution} step={step} dir={dir} position={position}/>)
}