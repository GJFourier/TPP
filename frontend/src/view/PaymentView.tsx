import React, {useEffect, useState} from 'react';
import {MovieInfo} from "../component/MovieInfo";
import {IOrderInfo, IOrderToPay} from "../interface";
import {Button, Empty, Spin} from "antd";
import Title from "antd/es/typography/Title";
import {useNavigate} from "react-router-dom";
import {Cookies} from "react-cookie";
import {backendServer} from "../service/ServiceConst";

export function PaymentView() {
    const [paymentInfo, setPaymentInfo] = useState<IOrderToPay | null | undefined>(undefined);
    const [orderInfo, setOrderInfo]=useState<IOrderInfo|null>(null);
    const navigate=useNavigate();
    const handleBack = () => {
        sessionStorage.removeItem('payment_info');
        if(paymentInfo)navigate('/ticketBooking/seat/'+paymentInfo.screening.id);
        else navigate('/ticketBooking/');
    };
    const handleProceed = () => {
        const cookies=new Cookies();
        const currentUser=cookies.get('currentUser');
        if(!currentUser)return;
        if(!paymentInfo)return;
        const orderInfo:IOrderInfo={
            screeningId:paymentInfo.screening.id,
            userId:currentUser.id,
            seatIds:paymentInfo.seats.map(seat=>seat.id)
        };
        setOrderInfo(orderInfo);
    }
    useEffect(() => {
        const newPaymentInfoString = sessionStorage.getItem('payment_info');
        if (newPaymentInfoString === null) setPaymentInfo(null);
        else try {
            setPaymentInfo(JSON.parse(newPaymentInfoString))
        } catch (e) {
            setPaymentInfo(null);
        }
    }, []);
    useEffect(()=>{
        if(!orderInfo||!paymentInfo)return;
        fetch(backendServer+'/order/checkout?screeningId='+paymentInfo.screening.id+'&userId='+orderInfo.userId,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(orderInfo.seatIds)
        }).then(async responseJSON=>{
            return await responseJSON.json();
        }).then(response=>{
            const cookies=new Cookies();
            const currentUser=cookies.get('currentUser');
            if(response){
                sessionStorage.removeItem('payment_info');
                navigate('/ticketBooking/user/'+currentUser.id+'/orders');
            }
        });
    },[orderInfo,paymentInfo,navigate])
    if (paymentInfo === undefined) {
        return <div className="payment-view">
            <Spin/>
        </div>
    } else if (paymentInfo === null) {
        return <div className="payment-view">
            <Empty description="无待支付信息"/>
        </div>
    } else return (
        <div className="payment-view">
            <div className="payment-main-area">
                <div><Title level={2}>{'请支付' + paymentInfo.totalPrice + '元'}</Title></div>
                <div>
                    <span>
                        <Button onClick={handleBack}>返回选座</Button>
                        <Button type="primary" onClick={handleProceed}>完成支付</Button>
                    </span>
                </div>
            </div>
            <MovieInfo filmImage={paymentInfo.screening.filmImage} filmTitle={paymentInfo.screening.filmTitle}
                       cinemaName={paymentInfo.screening.cinemaName} hallName={paymentInfo.screening.hallName}/>
        </div>
    )
}
