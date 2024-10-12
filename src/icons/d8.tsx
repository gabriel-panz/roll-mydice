import { SVGProps } from "react";

export default function Die8Icon(props: SVGProps<SVGElement>) {
    const { fill, width, height } = props
    let w = `${width}pt`
    let h = `${height}pt`
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width={w}
            height={h}
            viewBox="0 0 72 72">
            <path
                transform="matrix(0.140625 0 0 0.140625 10.125 5.223234375)"
                fill={fill ?? "#fff"}
                d="M184 0L5.896 306.71L362.104 306.71ZM158.154 12.647L0 127.09L0 285ZM209.844 12.647L368 285.001L368 127.089ZM16.7 322.709L184 443.769L351.3 322.709Z"
            />
        </svg>

    )
}