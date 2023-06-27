import React from "react"

export function SeatSelectorUnit(
    props: {
        id: number,
        size: number,
        disabled: Boolean,
        selected: Boolean,
        seatName: string,
        onChange: (id: number, seatName: string, newSelected: Boolean) => void
    }
) {
    //const [selected, setSelected] = useState(false);
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (props.disabled) return;
        const newSelected = !props.selected;
        //setSelected(newSelected);
        props.onChange(props.id, props.seatName, newSelected);
    };
    const disabledImage = "/SeatSelection/disabled.svg";
    const unselectedImage = "/SeatSelection/unselected.svg";
    const selectedImage = "/SeatSelection/selected.svg";
    const imgSrc = props.disabled ? disabledImage : (props.selected ? selectedImage : unselectedImage);
    const altString = props.disabled ? "无法选中的座位" : (props.selected ? "选中座位" : "未选中座位");
    return <div className="seat-selector-unit" key={"seat-selector-unit-" + props.id}>
        <img src={imgSrc} width={props.size} height={props.size} alt={altString} onClick={handleClick}/>
    </div>

}