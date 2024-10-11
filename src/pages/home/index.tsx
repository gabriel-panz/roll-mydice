import './index.css';
import { useState, ChangeEvent, useEffect } from "react"
import { useParams } from "react-router-dom"
import DiceButton from "../../components/DiceButton"
import { CgAdd } from 'react-icons/cg';
import { DiceItem, DiceType } from '../../interfaces/diceItem';
import { decodeFormula, stringifyFormula } from '../../services/formula';
import Die from '../../components/Die';


export default function Home() {
    let { roll } = useParams()
    let decoded: DiceItem[] = []
    if (roll) {
        decoded = decodeFormula(roll)
    }
    const diceSides: { [key: string]: number } =
    {
        "bonus": 1,
        "d4": 4,
        "d6": 6,
        "d8": 8,
        "d10": 10,
        "d12": 12,
        "d20": 20,
    }

    useEffect(() => {
        if (roll) rollDice()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roll])

    const [rollResult, setRollResult] = useState<JSX.Element[]>();
    const [formula, setFormula] = useState<DiceItem[]>(decoded)

    useEffect(() => {
        let nf = stringifyFormula(formula)
        if (nf)
            window.history.replaceState(window.history.state, "", nf);
        else
            window.history.replaceState(window.history.state, "", "/");
    }, [formula])

    function addToFormula(d: DiceItem) {
        setFormula((prev) => [...prev, d])
    }

    function rollDice() {
        let sum = 0
        let includeSum = false
        let res: JSX.Element[] = []
        res = formula.reduce(
            (prev, dice, idx, _) => {
                if (dice.count !== 0) {
                    if (idx === 1) includeSum = true

                    if (dice.diceType === "bonus") {
                        let op = (idx > 0) ? "+" : ""
                        if (dice.count < 0)
                            op = "-"

                        let d = <Die operator={op} rollResult={Math.abs(dice.count)}></Die>

                        sum += dice.count

                        return [...prev, d]
                    }

                    let i = 0
                    while (i < Math.abs(dice.count)) {
                        if (i === 1) includeSum = true
                        let r = Math.trunc(Math.random() * (diceSides[dice.diceType]) + 1) * Math.sign(dice.count)

                        let op = ""
                        if (i > 0 || idx > 0)
                            op = r > 0 ? "+" : "-"

                        let d = <Die rollResult={Math.abs(r)} operator={op}></Die>
                        prev = [...prev, d]

                        sum += r
                        i++
                    };
                }

                return prev
            }, res);

        if (includeSum) {
            let d = <Die operator='=' rollResult={sum}></Die>
            res.push(d)
        }

        setRollResult(res)
    }

    function addDiceButton() {
        let data: DiceItem = {
            id: window.crypto.randomUUID(),
            count: 0,
            diceType: 'd4'
        }

        addToFormula(data)
    }

    function removeDiceButton(id: string) {
        let updated = formula.filter(d => d.id !== id)
        setFormula(updated)
    }

    function setDieCount(id: string, val: number) {
        let updated = formula.map(d => {
            if (d.id === id) d.count = val
            return d
        })

        setFormula(updated)
    }

    function addDie(dice: DiceItem) {
        let updated = formula.map(d => {
            if (d.id === dice.id) d.count += 1
            return d
        })

        setFormula(updated)
    }

    function removeDie(id: string) {
        let updated = formula.map(d => {
            if (d.id === id) d.count--
            return d
        })

        setFormula(updated)
    }

    function onSelectedDieChange(e: ChangeEvent<HTMLSelectElement>, id: string) {
        let updated = formula.map(d => {
            let nt = e.target.value as DiceType
            if (d.id === id) d.diceType = nt
            return d
        })

        setFormula(updated)
    }

    function share() {
        let d: ShareData = {
            title: "Share a roll with your friends!",
            text: "Roll me some dice here: ",
            url: window.location.href
        }
        if (!navigator.canShare(d))
            return
        navigator.share(d)
    }

    return (
        <div className="Home">
            <header className="Header">
                <h1>Roll your dice:</h1>
            </header>
            <section className='display'>
                {rollResult != null
                    ? rollResult
                    : ""}
            </section>
            <section className='controls'>
                <ul className='diceControls'>
                    {formula.map((d) => <DiceButton
                        setDieCount={setDieCount}
                        removeSelf={removeDiceButton}
                        onSelectedDieChange={onSelectedDieChange}
                        key={d.id}
                        data={d}
                        addDie={addDie}
                        removeDie={removeDie}
                    ></DiceButton>)}
                    <CgAdd
                        id='add-die-button'
                        className="action"
                        onClick={addDiceButton}>
                        Add Die
                    </CgAdd>
                </ul>
            </section>
            <section className='main-actions'>
                <button
                    id="roll-button"
                    className='action'
                    onClick={rollDice}
                >
                    Roll
                </button>
                <button
                    id='share-button'
                    className='action'
                    onClick={share}
                >
                    Share
                </button>
            </section>

        </div >
    );
}