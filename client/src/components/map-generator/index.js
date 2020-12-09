import React from 'react'
import MapSprite from "../map-sprite";
export default function MapGenerator () {
    const coordinates = []
    let index = 0;
    function setPolygons ({firstCoordinateX, lastCoordinateX, firstCoordinateY, lastCoordinateY, sprite}) {
        for (let i = firstCoordinateY+25; i <= lastCoordinateY; i+=50) {
            for (let j = firstCoordinateX+50; j <= lastCoordinateX; j+=100) {
                coordinates[index] = []
                coordinates[index].id = index
                coordinates[index].top = i
                coordinates[index].left = j
                coordinates[index].sprite = sprite
                index++
            }
            for (let j = firstCoordinateX; j <= lastCoordinateX; j+=100) {
                coordinates[index] = []
                coordinates[index].id = index
                coordinates[index].top = i+25
                coordinates[index].left = j
                coordinates[index].sprite = sprite
                index++
            }
        }
    }
    setPolygons({
        firstCoordinateX: 0,
        lastCoordinateX: 1920,
        firstCoordinateY: 0,
        lastCoordinateY: 1080,
        sprite: 'sp5'
    })
    setPolygons({
        firstCoordinateX: 800,
        lastCoordinateX: 900,
        firstCoordinateY: 0,
        lastCoordinateY: 1080,
        sprite: 'sp4'
    })
    const polygonList = coordinates.map((index) =>
        <MapSprite key={index.id} top={index.top} left={index.left} sprite={index.sprite}/>
    )
    return (
        <>
            {polygonList}
        </>
    )
}
