import {useState, useCallback} from 'react'
export default function usePlayerAbilities(x_start, y_start, start_walk_anim, end_walk_anim, start_attack_anim, end_attack_anim, character_sprite_w, character_sprite_h) {
    // INITIAL POSITION OF THE CHARACTER
    const [position, setPosition] = useState({x: x_start, y: y_start})
    const [dir, setDir] = useState(6)
    const [step, setStep] = useState(4)
    // TARGETS AND TRIGGERS FOR ANIMATIONS
    const [moveTrigger, setMoveTrigger] = useState(false)
    const [targetPosition, setTargetPosition] = useState({x: 0, y: 0})
    const [attackTrigger, setAttackTrigger] = useState(false)
    const [targetStep, setTargetStep] = useState(0)
    // MOVE CONSTANTS
    const speed = 5
    const directions = {
        SW: 0,
        W: 1,
        NW: 2,//back
        N: 3,
        NE: 4,
        E: 5,
        SE: 6, //face
        S: 7
    } // 8 directions of walking
    const modifier = {
        0: {x: -speed, y: 0},
        1: {x: -speed, y: -speed},
        2: {x: 0, y: -speed},//back
        3: {x: +speed, y: -speed},
        4: {x: speed, y: 0},
        5: {x: +speed, y: +speed},
        6: {x: 0, y: speed}, //face
        7: {x: -speed, y: +speed}, //STOP
    } // how to change position
    // PERMISSIONS FOR ACTIONS
    function permission(fnName) { // in case of interrupting action, permission must be checked in executive animation function; in case of waiting for the action end, permission must be check in start animation function;
        if (fnName === 'moveAnimation') {
            return !((step >= start_attack_anim && step <= end_attack_anim) || attackTrigger); // movement must be interrupted in case of attack
        }
        if (fnName === 'attack') {
            return !(step >= start_attack_anim && step < end_attack_anim); // attack must not be interrupted by one more one
        }
        if (fnName === 'changeDirection') {
            return (step >= start_attack_anim && step < end_attack_anim); // in case of attacking, character must not change direction
        }
        return false
    }
    // MOVEMENT ENGINE
    function move (left, top) {
        setMoveTrigger(true)
        setTargetPosition(() => ({
            x: Math.abs(left - character_sprite_w/2 - position.x),
            y: Math.abs(top - character_sprite_h/2 - position.y)
        }))
        let relY = -left + character_sprite_w/2 + position.x
        let relX = -top + character_sprite_w/2 + position.y
        let angle = Math.atan2(relY, relX) / Math.PI * 180
        if (angle > 67.5 && angle < 112.5) {
            changeDirection('SW')
        }
        if (angle > 22.5 && angle < 67.5) {
            changeDirection('W')
        }
        if (angle > -22.5 && angle < 22.5) {
            changeDirection('NW')
        }
        if (angle > -67.5 && angle < -22.5) {
            changeDirection('N')
        }
        if (angle > -112.5 && angle < -67.5) {
            changeDirection('NE')
        }
        if (angle > -157.5 && angle < -112.5) {
            changeDirection('E')
        }
        if ((angle > -180 && angle < -157.5)||(angle > 157.5 && angle < 180)) {
            changeDirection('SE')
        }
        if (angle > 112.5 && angle < 157.5) {
            changeDirection('S')
        }
    }
    function changeDirection (direction) {
        setDir((prev) => {
            if (permission('changeDirection')) {
                return prev
            }
            if ((prev !== directions[direction])||step === end_attack_anim) {
                setStep(start_walk_anim)
            }
            return directions[direction]
        })
    }
    const executeMoveAnimation = useCallback(function () {
        if ((targetPosition.x > 0 || targetPosition.y > 0) && !moveTrigger && permission('moveAnimation')) {
            setTargetPosition(prev => ({
                x: prev.x - speed,
                y: prev.y - speed
            }))
            setPosition(prev => ({
                x: prev.x + modifier[dir].x,
                y: prev.y + modifier[dir].y
            }))
            setStep(prev => prev < end_walk_anim ? prev + 1 : start_walk_anim)
        } else {
            setMoveTrigger(false)
        }
        // eslint-disable-next-line
    }, [targetPosition, moveTrigger])
    // ATTACK ENGINE
    function attack() {
        if (permission('attack')) {
            setAttackTrigger(true)
            setTargetStep(start_attack_anim)
        }
    }
    const executeAttackAnimation = useCallback(function () {
        if (targetStep >= start_attack_anim && targetStep <= end_attack_anim && !attackTrigger) {
            setStep(targetStep)
            setTargetStep(prev => prev+1)
        } else {
            setAttackTrigger(false)
        }
        // eslint-disable-next-line
    }, [targetStep, attackTrigger])
    return {
        position,
        dir,
        step,
        move,
        executeMoveAnimation,
        attack,
        executeAttackAnimation
    }
}