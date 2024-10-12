import { SVGProps } from "react";

export default function Die4Icon(props: SVGProps<SVGElement>) {
    const { fill, width, height } = props
    let w = `${width}pt`
    let h = `${height}pt`
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width={w}
            height={h}
            viewBox="0 0 72 72">
            <path
                transform="matrix(0.140625 0 0 0.140625 6.96058737352512 8.35159050033427)"
                fill={fill ?? "#fff"}
                d="M413.005 357.657L0 357.657L206.502 0Z"
            />
        </svg>
    )
}