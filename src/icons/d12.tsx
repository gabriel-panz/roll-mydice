import { SVGProps } from "react";

export default function Die12Icon(props: SVGProps<SVGElement>) {
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
                transform="matrix(0.140625 0 0 0.140625 7.875 6.655078125)"
                d="M394.169 134.029L323.685 36.965L209.629 0L209.629 92.652L306.013 162.683ZM190.55 92.652L190.55 0L76.494 36.965L6.01 134.029L94.166 162.647ZM142.59 286.266L257.588 286.266L293.098 176.896L200.089 109.298L107.08 176.897ZM140.468 305.345L86.034 380.385L200.089 417.35L314.145 380.385L259.711 305.345ZM311.843 180.784L275.033 294.064L329.516 369.057L400 272.041L400 152.178ZM88.156 180.784L0 152.166L0 272.1L70.484 369.116L124.966 294.124Z"
            />
        </svg>
    )
}