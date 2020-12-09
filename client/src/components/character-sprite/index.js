import React from 'react'
export default function CharacterSprite ({id = "player", sprite, sprite_resolution, position, step, dir}) {
    const {h, w} = sprite_resolution
    return (
        <div
            id = {id}
            style = {{
                position: "absolute",
                top: `${position.y}px`,
                left: `${position.x}px`,
                height: `${h}px`,
                width: `${w}px`,
                backgroundImage: `url(${sprite})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: `-${step * w}px -${dir * h}px`,
            }}
        />
    )
}
