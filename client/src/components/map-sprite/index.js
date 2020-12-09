import React from 'react'
export default function MapSprite ({top, left, sprite}) {
    return (
        <div
            style = {{
                position: "absolute",
                top: `${top}px`,
                left: `${left}px`,
                height: "50px",
                width: "100px",
                backgroundImage: `url('/sprites/map/${sprite}.png')`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px 0px",
                border: "0"
            }}
        />
    )
}