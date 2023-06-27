import React from "react";
import { Card } from "antd";
import { IFilm } from "../interface";

const { Meta } = Card;

interface IMovieCardProps {
  updateMovieId: Function;
  film: IFilm;
}

function MovieCard({ updateMovieId, film }: IMovieCardProps) {
  // console.log(props.item.id);
  return (
    <Card
      hoverable
      cover={
        <img
          src={film.image}
          alt={film.image}
          style={{ height: "80%", width: "80%", borderRadius: "10px" }}
        />
      }
      onClick={() => updateMovieId(film.id)}
    />
  );
}

export default MovieCard;
