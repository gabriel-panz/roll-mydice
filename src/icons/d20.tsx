import { SVGProps } from "react";

export default function Die20Icon(props: SVGProps<SVGElement>) {
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
                transform="matrix(0.140625 0 0 0.140625 7.25889315258794 2.8546875)"
                d="M196.381 0L20.7112 112.3L196.381 108.5ZM212.381 0L212.381 108.5L388.081 112.3ZM190.281 124.6L3.7712 128.7L74.9812 321.6ZM218.481 124.6L333.781 321.6L404.981 128.7ZM204.381 132.1L87.2812 332.3L321.481 332.3ZM0 160.012L0 333.212L61.9 327.512ZM408 160.012L346.1 327.512L408 333.212ZM91.5812 348.3L204.381 471.4L317.181 348.3ZM70.1812 348.6L16.3412 353.5L170.413 453.815ZM338.581 348.6L235.113 455.583L392.381 353.5Z" /><path id="shape1" transform="translate(28.0495338490822, 21.8237446827387)" />
        </svg>
    )
}