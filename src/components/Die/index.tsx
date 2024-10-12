import './index.css'
import Icon from '../Icon'
import { DiceType } from '../../interfaces/diceItem'
import React, { useEffect, useState } from 'react'

export interface DieProps extends React.HTMLProps<Element> {
    rollResult: number
    operator: string
    icon: DiceType
}

export default function Die(props: DieProps) {
    const [isRolling, setIsRolling] = useState(false)
    useEffect(() => {
        setIsRolling(false);
        setTimeout(() => {
            setIsRolling(true);
        }, 10);
    }, [props.key]);

    const className = isRolling
        ? props.icon === "bonus"
            ? "die fadeIn"
            : "die fadeIn rolling"
        : "die"
    return (
        <div className={className} >
            <p>{props.operator}</p>
            <Icon
                fill='var(--dark-color)'
                name={props.icon}
                width={60}
                height={60}
            >
                <span className='rollResult'>
                    <p>{props.rollResult}</p>
                </span>
            </Icon>
        </div>
    )
}