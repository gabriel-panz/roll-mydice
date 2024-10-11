export type DiceType = "bonus" | "d4" | "d6" | "d8" | "d10" | "d12" | "d20"

export interface DiceItem {
    id: string
    diceType: DiceType
    count: number
}