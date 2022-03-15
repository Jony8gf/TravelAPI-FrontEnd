export default function Button(props: buttonProps){
    return (
        <button type={props.type} className={props.className}
        disabled={props.disabled}
        onClick={props.onClick}
        id={props.id}
        >{props.children}</button>
    )
}

interface buttonProps{
    children: React.ReactNode,
    onClick?(): void;
    type: "button" | "submit";
    disabled: boolean;
    className: string;
    id: string;
}

Button.defaultProps = {
    type: "button",
    disabled: false,
    className: 'btn btn-primary my-3',
    id: 'id'
}