import { useEffect, useState } from "react";
import {IScreening, IHall, ISeatDTO, ISeat, IScreeningDTO} from "../interface";
import { SeatSelector } from "../component/SeatSelector";
import {Empty, Image, Space, Spin, Typography} from "antd";
import Title from "antd/es/typography/Title";
import "../css/SeatSelectionView.css";
import { useParams } from "react-router";
import { getSeatsByScreeningId } from "../service/SeatService";
import { getScreeningById } from "../service/ScreeningService";
import {useNavigate} from "react-router-dom";

export function SeatSelectionView() {
    const [seats, setSeats] = useState<ISeatDTO[]|null>(null);
    const [screening, setScreening] = useState<null | IScreeningDTO>(null);

    const screeningParam = useParams();

    const navigate=useNavigate();
    useEffect(() => {
        getSeatsByScreeningId(Number(screeningParam.id)).then((res: ISeatDTO[]) => {
            setSeats(res);
        });
        getScreeningById(Number(screeningParam.id)).then((res: IScreeningDTO) => {
            setScreening(res);
        });
    },[screeningParam.id]);

    if (screening === null || seats===null) {
        return (<Spin tip="加载中" size="large" />);
    }

    console.log(screening);
    const handleSubmit=(selectedSeats: ISeatDTO[])=>{
        if(selectedSeats.length===0)return;
        sessionStorage.setItem('payment_info',JSON.stringify({
            totalPrice:screening.price*selectedSeats.length,
            screening:screening,
            seats:selectedSeats
        }));
        navigate('/ticketBooking/pay');
    }
    if(seats.length===0||!seats)return<Empty/>;
    return (
        <div className="seat-selection-view">
            <SeatSelector seatList={seats} onSubmit={handleSubmit}/>
            <div className="film-description">
                <Image src={screening.filmImage} height={160} width={100} />
                <Title level={5}>{screening.filmTitle}</Title>
                <Space direction="vertical">
                    <Typography.Text>{"影院：" + screening.cinemaName}</Typography.Text>
                    <Typography.Text>{"影厅：" + screening.hallName}</Typography.Text>
                </Space>
            </div>
        </div>);
}
