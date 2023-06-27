import React from "react";
import { Rate } from "antd";
import { ICinema } from "../interface";

interface CinemaCardProps {
  cinema: ICinema;
}

function CinemaCard({ cinema }: CinemaCardProps) {
  return (
    <div
      style={{ display: "flex", backgroundColor: "#f0f1f2" }}
      className="movie-card"
    >
      <div style={{ width: "50%" }}>
        <img
          style={{ width: 600, height: 400 }}
          src={cinema.image}
          className="cinema-img"
        />
      </div>
      <div className="cinema-info">
        <h2>{cinema.name}</h2>
        <p>地址：{cinema.location}</p>
        <p>电话：{cinema.phone}</p>
        <Rate allowHalf disabled value={cinema.rating} />
      </div>
    </div>
  );
}

export default CinemaCard;
