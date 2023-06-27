import {useState} from "react";
import {ISeat, ISeatDTO} from "../interface";
import "../css/SeatSelector.css"
import {SeatSelectorUnit} from "./SeatSelectorUnit";
import {Button} from "antd";

export function SeatSelector(props: { seatList: ISeatDTO[], onSubmit: (selectedSeats: ISeatDTO[]) => void }) {
    const unitSize = 25;
    const [selectedSeats, setSelectedSeats] = useState(new Map<number, string>());
    //const selectedSeats=new Map<number,string>();
    const handleChange = (id: number, seatName: string, newSelected: Boolean) => {
        const newSelectedSeats = new Map(selectedSeats);
        if (newSelected) {
            newSelectedSeats.set(id, seatName);
        } else {
            newSelectedSeats.delete(id);
        }
        setSelectedSeats(newSelectedSeats);
    };
    const convertSeatList = (seatList: ISeatDTO[]) => {
        let seats: Array<Array<ISeat | null>> = [];
        let seatOccupation = new Set<number>();
        let maxRow = 0, maxCol = 0;
        seatList.forEach(seat => {
            if (seat.seatRow+1 > maxRow) maxRow = seat.seatRow+1;
            if (seat.seatColumn+1 > maxCol) maxCol = seat.seatColumn+1;
        });
        for (let i = 0; i < maxRow; i++) {
            seats.push([]);
            for (let j = 0; j < maxCol; j++) {
                seats[i].push(null);
            }
        }
        seatList.forEach(seat => {
            seats[seat.seatRow][seat.seatColumn] = {
                id: seat.id,
                name: (seat.seatRow + 1) + '排' + (seat.seatColumn + 1) + '座'
            }
            if (seat.isSold) seatOccupation.add(seat.id);
        });
        return {seats, seatOccupation};
    }
    let {seats, seatOccupation} = convertSeatList(props.seatList);
    const table = (
        <table className="seat-selector-table">
            <thead>
            <tr key="seat-selector-screen-line" className="seat-selector-screen">
                <td key="seat-selector-screen-cell" className="seat-selector-screen-cell"
                    colSpan={seats[0].length} align="center" height={unitSize}
                    style={{fontSize: 0.75 * unitSize}}>
                    荧幕
                </td>
            </tr>
            </thead>
            <tbody>
            {seats.map((line, lineIdx) => (
                <tr key={"seat-selector-cell-line" + lineIdx}>{line.map(
                    (item, itemIdx) => {
                        if (item === null) {
                            return (<td key={"seat-selector-cell-line" + lineIdx + "-item-" + itemIdx}>
                                <div className="seat-selector-unit" style={{height: unitSize, width: unitSize}}>
                                </div>
                            </td>);
                        }
                        if (seatOccupation.has(item.id)) {
                            return (<td key={"seat-selector-cell-line" + lineIdx + "-item-" + itemIdx}>
                                <SeatSelectorUnit id={item.id} disabled={true} size={unitSize}
                                                  selected={selectedSeats.has(item.id)} seatName={item.name}
                                                  onChange={handleChange}/>
                            </td>)
                        } else return (<td key={"seat-selector-cell-line" + lineIdx + "-item-" + itemIdx}>
                            <SeatSelectorUnit id={item.id} disabled={false} size={unitSize}
                                              selected={selectedSeats.has(item.id)} seatName={item.name}
                                              onChange={handleChange}/>
                        </td>)
                    }
                )}</tr>))}
            </tbody>
        </table>
    );
    let selectedSeatsString = "";
    let selectedSeatIds: Array<number> = [];
    if (selectedSeats.size) {
        let addingSeparation = false;
        selectedSeats.forEach((seatName: string, seatId: number) => {
            selectedSeatsString = selectedSeatsString + (addingSeparation ? "、" : "") + seatName;
            addingSeparation = true;
            selectedSeatIds.push(seatId);
        });
        selectedSeatsString = "已选中：" + selectedSeatsString;
    } else {
        selectedSeatsString = "未选中任何座位";
    }
    const handleSubmit = () => {
        let selectedSeatList: ISeatDTO[] = [];
        selectedSeatIds.forEach((seatId) => {
            const selectedSeat = props.seatList.filter((seat) => seat.id === seatId);
            if (selectedSeat[0]) selectedSeatList.push(selectedSeat[0]);
        });
        props.onSubmit(selectedSeatList);
    }

    return (
        <div className="seat-selector">
            <div className="seat-selector-table-container">{table}</div>
            <div className="selected-seats-conclusion" style={selectedSeats.size === 0 ? {visibility: 'hidden'} : {}}>
                {selectedSeatsString}
            </div>
            <Button onClick={handleSubmit}>提交选座</Button>
        </div>
    )
}
