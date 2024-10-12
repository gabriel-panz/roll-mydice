import './index.css'
import Icon from '../Icon'
import { DiceType } from '../../interfaces/diceItem'

export interface DieProps {
    rollResult: number
    operator: string
    icon: DiceType
}

export default function Die(props: DieProps) {
    return (
        <div className="die">
            <p>{props.operator}</p>
            <Icon fill='var(--dark-color)' name={props.icon} width={60} height={60}>
                <span className='rollResult'>
                    <p>{props.rollResult}</p>
                </span>
            </Icon>
        </div>
    )
}