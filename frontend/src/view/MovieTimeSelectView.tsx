import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CinemaCard from "../component/CinemaCard";
import CinemaMovies from "../component/CinemaMovies";
import "../css/MovieTimeSelectView.css";
import { Layout } from "antd";
import { ICinema, IFilm, IScreening } from "../interface";
import { getFilms, getFilmsByCinema } from "../service/FilmService";
import { getCinemaById } from "../service/CinemaService";
import { getScreeningByCinemaAndFilm } from "../service/ScreeningService";
import { Cookies } from "react-cookie";

function MovieTimeSelectView() {
  const cinemaId = useParams(); //cinema_id

  const [cinemaData, setCinemaData] = useState<ICinema>({
    id: 0,
    name: "",
    location: "",
    screenings: [],
    rating: 0,
    image: "",
    phone: "",
  });
  const cookie = new Cookies();
  const currentFilm = cookie.get("currentFilm");
  const [filmDateCur, setFilmDataCur] = useState<IFilm[]>([]);
  const [screeningCur, setScreeningCur] = useState<IScreening[]>([]);

  useEffect(() => {
    getCinemaById(Number(cinemaId.id)).then((res) => {
      setCinemaData(res);
    });
    getFilmsByCinema(Number(cinemaId.id)).then((res: IFilm[]) => {
      setFilmDataCur(res);
    });
  }, []);

  return (
    <div className="MovieTimeSelectView">
      {/*header*/}
      <Layout className="middle-body">
        {/*Cinema Card*/}
        <CinemaCard cinema={cinemaData} />
        {/*Movies in this Cinema and times of this movie*/}
        <CinemaMovies filmData={filmDateCur} cinemaId={cinemaData?.id} />
      </Layout>
    </div>
  );
}

export default MovieTimeSelectView;
