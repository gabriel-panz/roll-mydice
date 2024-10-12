import { SVGProps } from "react";

export default function Die10Icon(props: SVGProps<SVGElement>) {
    const { fill, width, height } = props
    let w = `${width}pt`
    let h = `${height}pt`
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 72 72"
            width={w}
            height={h}
        >
            <path
                fill={fill ?? "#fff"}
                transform="matrix(0.140625 0 0 0.140625 3.82359375 3.65625)"
                d="M238.313 276.381L235.854 460.843L449.82 240.346L362.827 218.536ZM94.413 218.334L9.703 240.097L221.8 460.313L219.284 276.38ZM0 222.865L209.81 7L92.035 199.079ZM247.685 7L457.621 222.639L366.049 199.698ZM228.797 0L110.266 205.026L228.798 260.076L347.402 205.026Z"
            />
        </svg>
    )
}