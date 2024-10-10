import { ChangeEvent } from "react"
import { DiceItem } from "../../pages/home"

export interface DiceButtonProps {
    data: DiceItem
    addDie: (d: DiceItem) => void
    removeDie: (id: string) => void
    onSelectedDieChange: (e: ChangeEvent<HTMLSelectElement>, id: string) => void
    removeSelf: (id: string) => void
}

export default function DiceButton(props: DiceButtonProps) {
    const { addDie, removeDie, data, onSelectedDieChange, removeSelf } = props
    return (
        <li>
            <button onClick={() => { addDie(data) }}>+</button>
            <button onClick={() => { removeSelf(data.id) }}>x</button>
            <p>
                {data.count}
                <select
                    name="dieTypeSelect"
                    value={data.diceType}
                    onChange={(e) => onSelectedDieChange(e, data.id)}
                >
                    <option value="bonus">bonus</option>
                    <option value="d4">d4</option>
                    <option value="d6">d6</option>
                    <option value="d8">d8</option>
                    <option value="d10">d10</option>
                    <option value="d12">d12</option>
                    <option value="d20">d20</option>
                </select>
            </p>
            <button onClick={() => removeDie(data.id)}>-</button>
        </li>
    )
}