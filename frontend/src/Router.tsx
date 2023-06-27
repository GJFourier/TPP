// @ts-ignore
// @ts-ignore
// @ts-ignore

import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from "./view/RegisterView";
import MovieTimeSelectView from "./view/MovieTimeSelectView";
import {CinemaListView} from "./view/CinemaListView";
import {AllFilmsView} from "./view/AllFilmsView";
import {HomeView} from "./view/HomeView";
import {FilmDetailView} from "./view/FilmDetailView";
import LogView from "./view/LogView";
import {LayoutView} from "./view/LayoutView";
import {SeatSelectionView} from "./view/SeatSelectionView";
import UserProfile from "./view/UserProfile";
import {PaymentView} from "./view/PaymentView";
import {OrderList} from "./view/OrderList";
import {UserCenter} from "./view/UserCenter";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={"/login"}/>}></Route>
                <Route path="/login" element={<LogView/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/ticketBooking" element={<LayoutView/>}>
                    <Route index element={<Navigate to="/ticketBooking/home"/>}/>
                    <Route path="home" element={<HomeView/>}></Route>
                    <Route path="film" element={<AllFilmsView/>}></Route>
                    <Route path="film/detail/:id" element={<FilmDetailView/>}/>
                    <Route path="cinema" element={<CinemaListView/>}></Route>
                    <Route path="cinema/:id" element={<MovieTimeSelectView/>}></Route>
                    <Route path="seat/:id" element={<SeatSelectionView/>}></Route>
                    <Route path="user/:id" element={<UserCenter/>}>
                        <Route path="profile" element={<UserProfile/>}></Route>
                        <Route path="orders" element={<OrderList/>}></Route>
                    </Route>
                    <Route path="pay" element={<PaymentView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
