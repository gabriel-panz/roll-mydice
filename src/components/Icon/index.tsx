import { SVGProps } from "react";
import * as icons from "../../icons"
import { DiceType } from "../../interfaces/diceItem";

interface IconProps extends SVGProps<SVGElement> {
    name: DiceType;
}

export default function Icon({ name, children, ...props }: IconProps) {
    const Comp = icons[name]
    return (
        <>
            <Comp {...props}></Comp>
            {children}
        </>
    )
}