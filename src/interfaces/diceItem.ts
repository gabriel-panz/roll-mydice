import * as icons from '../icons/index'
export type DiceType = "bonus" | "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100"
export const DiceIcons: { [k in DiceType]: keyof typeof icons } = {
    "bonus": "bonus",
    "d4": "d4",
    "d6": "d6",
    "d8": "d8",
    "d10": "d10",
    "d12": "d12",
    "d20": "d20",
    "d100": "d100"
}

export interface DiceItem {
    id: string
    diceType: DiceType
    count: number
}