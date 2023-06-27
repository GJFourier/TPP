import React, { useState } from "react";
import { List } from "antd";
import MovieCard from "./MovieCard";
import CinemaMovieTimes from "./CinemaMovieTimes";
import { IFilm } from "../interface";

interface ICinemaMoviesProps {
  filmData: IFilm[];
  cinemaId: number;
}

function CinemaMovies({ filmData, cinemaId }: ICinemaMoviesProps) {
  const position = "bottom",
    align = "center";

  const [movieId, setMovieId] = useState(Number); //movie_id

  const setMovie = (id: number) => {
    setMovieId(id);
    console.log("movie id is");
    console.log(id);
  };

  return (
    <div className="cinema-movie-list">
      <h3>电影列表</h3>
      <List
        pagination={{
          position,
          align,
          pageSize: 4,
        }}
        grid={{
          gutter: 56,
          column: 4,
        }}
        dataSource={filmData}
        renderItem={(movie: IFilm) => (
          <List.Item>
            <MovieCard film={movie} updateMovieId={setMovie} />
          </List.Item>
        )}
      />
      <CinemaMovieTimes filmId={movieId} cinemaId={cinemaId} />
    </div>
  );
}

export default CinemaMovies;
