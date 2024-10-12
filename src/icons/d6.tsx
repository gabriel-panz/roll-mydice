import { SVGProps } from "react";

export default function Die6Icon(props: SVGProps<SVGElement>) {
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
                transform="matrix(0.140625 0 0 0.140625 9.66305577246454 9.66305577246455)"
                d="M38.5 0C9.55475 1.06066 0.176777 10.7922 0 38.5L8.57985e-07 344.147C8.57985e-07 371.479 10.9181 382.334 38.5 382.647L344.035 383.035C371.617 382.91 382.434 371.354 382.559 344.147L382.559 38.5884C382.559 11.3225 371.678 0.0883909 344.059 0.0883909Z"
            />
        </svg>
    )
}