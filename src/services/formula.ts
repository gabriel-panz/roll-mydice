import { DiceItem, DiceType } from "../interfaces/diceItem"

export function stringifyFormula(f: DiceItem[]): string {
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

export function decodeFormula(f: string): DiceItem[] {
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