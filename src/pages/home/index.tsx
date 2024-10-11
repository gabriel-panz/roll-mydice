import './index.css';
import { useState, ChangeEvent, useEffect } from "react"
import { useParams } from "react-router-dom"
import DiceButton from "../../components/DiceButton"
import { CgAdd } from 'react-icons/cg';

export type DiceType = "bonus" | "d4" | "d6" | "d8" | "d10" | "d12" | "d20"

export interface DiceItem {
    id: string
    diceType: DiceType
    count: number
}

function stringifyFormula(f: DiceItem[]): string {
    if (f.length < 1) return ""

    return f.reduce((prev, current, idx, _) => {
        if (idx !== 0 && current.count > -1)
            prev += "+"
        prev += current.count
        if (current.diceType !== "bonus")
            prev += current.diceType
        return prev
    }, "")
}

function decodeFormula(f: string): DiceItem[] {
    let res: DiceItem[] = []
    let newD: DiceItem = {
        id: window.crypto.randomUUID(),
        count: 1,
        diceType: "bonus",
    }
    let buf: string = ""
    let appending: "count" | "type" = "count"

    let saveCount = (b: string, d: DiceItem) => {
        try {
            d.count *= Number(b)
        } catch (e) {
            console.error(e)
        }
    }

    let saveType = (b: string, d: DiceItem) => {
        try {
            if (b === "" || b === "d")
                d.diceType = "bonus"
            else
                d.diceType = b as DiceType
        } catch (e) {
            console.error(e)
        }
    }


    for (let index = 0; index < f.length; index++) {
        const c = f[index];
        let is_last = index === (f.length - 1)
        switch (c) {
            case 'd':
                // separate from value to dice
                saveCount(buf, newD)
                buf = "d"
                appending = "type"
                break;
            case '+':
                // separate to new DiceItem
                if (appending === "count")
                    saveCount(buf, newD)
                else
                    saveType(buf, newD)

                res.push(newD)

                newD = {
                    id: window.crypto.randomUUID(),
                    count: 1,
                    diceType: "bonus",
                }
                buf = ""
                appending = "count"
                break;
            case '-':
                // separate to new DiceItem with negative value
                if (appending === "count")
                    saveCount(buf, newD)
                else
                    saveType(buf, newD)
                res.push(newD)

                newD = {
                    id: window.crypto.randomUUID(),
                    count: -1,
                    diceType: "bonus",
                }
                buf = ""
                appending = "count"
                break;
            default:
                buf += c
                if (is_last) {
                    if (appending === "count")
                        saveCount(buf, newD)
                    else
                        saveType(buf, newD)
                    res.push(newD)
                }
                break;
        }
    }
    return res
}

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

    const [rollResult, setRollResult] = useState<string>();
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
        let res = ""
        let sum = 0
        let includeSum = false
        formula.forEach((d, idx) => {
            if (d && d.count !== 0) {
                if (idx === 1) includeSum = true
                if (d.diceType === "bonus") {
                    if (idx > 0) res += " +"
                    else res += " "
                    res += d.count
                    sum += d.count
                    return
                }

                let i = 0
                while (i < Math.abs(d.count)) {
                    if (i === 1) includeSum = true
                    let r = Math.trunc(Math.random() * (diceSides[d.diceType]) + 1)
                    if (d.count > 0) {
                        if (i > 0 || idx > 0)
                            res += " + " + r
                        else
                            res += r
                    }
                    else res += " - " + r
                    sum += r
                    i++
                };
            }
        })

        if (includeSum)
            res += " = " + sum

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
                    ? <p>{rollResult}</p>
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