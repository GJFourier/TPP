import { IFilm } from "../../interface";
import { Button, Card, Image } from "antd";
import { Link } from "react-router-dom";

// import "../../css/index.css";

interface IFilmCartProps {
  film: IFilm;
  type: string;
}

export function FilmCart({ film, type }: IFilmCartProps) {
  return (
    <>
      <Card
        hoverable
        cover={
          <Image
            className="film-img"
            alt="image"
            src={film.image}
            style={{ width: "200px", height: "300px" }}
          />
        }
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/*<div style={{ width: "100%" }}>*/}
        {type === "ing" && (
          <Link to={"/ticketBooking/film/detail/" + film.id}>
            <Button>购票</Button>
          </Link>
        )}
        {/*</div>*/}
      </Card>
    </>
  );
}
