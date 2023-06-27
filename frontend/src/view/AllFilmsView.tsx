import React, { useEffect, useState } from "react";
import { List } from "antd";
import { IFilm } from "../interface";
import { getFilms } from "../service/FilmService";
import { Film } from "../component/Film";

export function AllFilmsView() {
  const [filmDate, setFilmData] = useState<IFilm[]>([]);

  useEffect(() => {
    getFilms().then((res: IFilm[]) => {
      setFilmData(res);
    });
  }, []);

  return (
    <div style={{ display: "flex", flexFlow: "column" }}>
      <h1>正在热映</h1>
      <List
        grid={{
          gutter: 0,
          column: 6,
        }}
        dataSource={filmDate}
        renderItem={(item) => {
          return (
            <List.Item>
              <Film film={item} />
            </List.Item>
          );
        }}
      />
    </div>
  );
}
