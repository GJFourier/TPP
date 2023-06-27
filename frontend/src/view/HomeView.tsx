import { Button, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFilms, getLaterFilms } from "../service/FilmService";
import { IFilm } from "../interface";
import { FilmCarousel } from "../component/film/Carousel";
import { FilmList } from "../component/film/FilmList";
import TabPane = Tabs.TabPane;

export function HomeView() {
  const [tagSelected, setTagSelected] = useState<string>("1");
  const [ifShowAll1] = useState<boolean>(false);
  const [ifShowAll2] = useState<boolean>(false);
  const navigate = useNavigate();

  const [filmDateCur, setFilmDataCur] = useState<IFilm[]>([]);
  const [filmDateSoon, setFilmDataSoon] = useState<IFilm[]>([]);

  useEffect(() => {
    getFilms().then((res: IFilm[]) => {
      setFilmDataCur(res);
    });
    getLaterFilms().then((res: IFilm[]) => {
      setFilmDataSoon(res);
    });
  }, []);

  const handleShowAll = () => {
    navigate("/ticketBooking/film");
  };

  const showAllButton = (
    <div className="show-all-button">
      <Button
        onClick={() => {
          handleShowAll();
        }}
      >
        全部电影
      </Button>
    </div>
  );

  return (
    <div
      style={{
        width: "auto",
      }}
    >
      <h1>首页</h1>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FilmCarousel />
        <Tabs
          defaultActiveKey="1"
          tabBarExtraContent={showAllButton}
          onChange={(key) => {
            setTagSelected(key);
          }}
          style={{
            margin: "2.5% 15% 12% 12%",
            width: 1000,
            height: 500,
          }}
        >
          <TabPane tab={"正在上映" + "<" + filmDateCur!.length + ">"} key="1">
            <FilmList
              fileDate={filmDateCur!}
              filmType={"ing" as string}
              ifShowAll={ifShowAll1}
            />
          </TabPane>
          <TabPane tab={"即将上映" + "<" + filmDateSoon!.length + ">"} key="2">
            <FilmList
              fileDate={filmDateSoon!}
              filmType={"willing" as string}
              ifShowAll={ifShowAll2}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
