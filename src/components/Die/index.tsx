import './index.css'

export interface DieProps {
    rollResult: number
    operator: string
    // icon: JSX.Element
}

export default function Die(props: DieProps) {
    return (
        <div className="die">
            {/* <span>
                {props.icon}
            </span> */}
            <p>{props.operator} {props.rollResult}</p>
        </div>
    )
}