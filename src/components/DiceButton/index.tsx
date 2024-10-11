import './index.css'
import React, { ChangeEvent, useState } from "react"
import { DiceItem } from "../../pages/home"
import { CgClose, CgMathPlus, CgMathMinus } from "react-icons/cg";

export interface DiceButtonProps {
    data: DiceItem
    setDieCount: (id: string, val: number) => void
    addDie: (d: DiceItem) => void
    removeDie: (id: string) => void
    onSelectedDieChange: (e: ChangeEvent<HTMLSelectElement>, id: string) => void
    removeSelf: (id: string) => void
}

export default function DiceButton(props: DiceButtonProps) {
    const { setDieCount, addDie, removeDie, data, onSelectedDieChange, removeSelf } = props

    function onInputChange(e: ChangeEvent<HTMLInputElement>) {
        setDieCount(data.id, Number(e.target.value))
    }
    return (
        <li className='diceControlCard'>
            <CgMathPlus
                className="action add"
                onClick={() => { addDie(data) }}>
            </CgMathPlus>
            <input
                type='number'
                value={data.count}
                className='diceCount'
                onChange={onInputChange} />
            <div className='dieTypeSelect'>
                <select
                    name="dieTypeSelect"
                    value={data.diceType}
                    onChange={(e) => onSelectedDieChange(e, data.id)}
                >
                    <option className='dieOption' value="bonus">bonus</option>
                    <option className='dieOption' value="d4">d4</option>
                    <option className='dieOption' value="d6">d6</option>
                    <option className='dieOption' value="d8">d8</option>
                    <option className='dieOption' value="d10">d10</option>
                    <option className='dieOption' value="d12">d12</option>
                    <option className='dieOption' value="d20">d20</option>
                </select>
                <CgClose
                    className="action remove"
                    onClick={() => { removeSelf(data.id) }}>
                </CgClose>
            </div>
            <CgMathMinus
                className='action subtract'
                onClick={() => removeDie(data.id)}>
            </CgMathMinus>
        </li>
    )
}