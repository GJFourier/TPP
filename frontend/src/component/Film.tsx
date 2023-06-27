import React, { JSX } from "react";
import { Card } from "antd";
import { IFilm } from "../interface";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

interface FilmProps {
  film: IFilm;
}

export function Film(props: FilmProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img alt="" src={props.film.image} />}
      onClick={() => {
        navigate("/ticketBooking/film/detail/" + props.film.id.toString());
      }}
    >
      <Meta title={props.film.name} description={"评分" + props.film.rating} />
    </Card>
  );
}
