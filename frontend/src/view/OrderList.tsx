import React, {useEffect, useState} from 'react';
import {Button, Card, List, Typography} from 'antd';
import {IOrder} from "../interface";
import {useLocation, useParams} from "react-router";
import {getOrdersByUserId, getUserByUserId} from "../service/UserService";
import {backendServer} from "../service/ServiceConst";


const {Title, Text} = Typography;

interface IOrderListProps {
    ticketData: Array<IOrder>;
}

const initialState = {
    orders: [],
}
const OrderList = () => {
    const {id} = useParams();
    const [ticketData, setTicketData] = useState<IOrder[] | null>(initialState.orders);
    const [values, setValues] = useState(initialState);
    const [fetchingOrders, setFetchingOrders] = useState(true);
    const location = useLocation();
    useEffect(() => {
        if (!fetchingOrders) return;
        const fetchOrders = async () => {
            try {
                const pathname = location.pathname;
                const regex = /\/user\/(\d+)\//;
                const match = pathname.match(regex);
                if (match) {
                    const data = await getOrdersByUserId(Number(match[1]));
                    setTicketData(data);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        setFetchingOrders(false);
        fetchOrders();
    }, [id, location.pathname, fetchingOrders]);

    function handleChange(e: { target: { name: any; value: any; }; }) {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    const handleCancel = (orderId: number) => {
        fetch(backendServer + '/order/cancel?orderId=' + orderId, {
            method: 'POST'
        }).then(async responseJson => {
            return responseJson.json();
        }).then(response => {
            if (response) {
                setFetchingOrders(true);
            }
        });
    };

    const renderItem = (item: IOrder) => (
        <List.Item>
            <Card
                hoverable
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#323f65',
                    width: '90%',
                    margin: '30px',
                    border: "none"
                }}
            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img style={{float: 'left', height: '200px'}} alt="movie-poster" src={item.filmImage}/>
                    <div style={{float: 'right'}}>
                        <div style={{padding: '10px'}}>
                            <h2>{item.filmName}</h2>
                            <Text strong>影院：{item.cinemaName}</Text>
                            <br/>
                            <Text strong>座位号：{item.seats.map((seat) => (seat.name + ' '))}</Text>
                            <br/>
                            <Text strong>{'时间：' + new Date(item.time).toTimeString()}</Text>
                            <br/>
                            <Button disabled={item.canCancel} onClick={()=>handleCancel(item.id)}>取消订单</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </List.Item>
    );

    return (
        <div>
            {ticketData ?
                <List
                    itemLayout="vertical"
                    style={{backgroundColor: '#1b2b35'}}
                    dataSource={ticketData}
                    renderItem={renderItem}
                    pagination={{
                        pageSize: 10,
                    }}
                /> : <div/>
            }
        </div>
    );
};

export {OrderList};