import { SVGProps } from "react";

export default function BonusIcon(props: SVGProps<SVGElement>) {
    const { fill, width, height } = props
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width ?? 100}
            height={height ?? 100}
        >
            <circle
                fill={fill ?? "#fff"}
                r={(width ?? 50) as number / 2}
                cx={(height ?? 50) as number / 2}
                cy={(width ?? 50) as number / 2}
            />
        </svg>
    )
}