import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IFilm } from "../interface";
import { Button, Rate, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { getFilmById } from "../service/FilmService";

export function FilmDetailView() {
  // const { filmId } = useParams<{ filmId: string }>();
  const filmId = useParams();
  const [data, setData] = useState<IFilm | null>(null);
  useEffect(() => {
    getFilmById(Number(filmId.id)).then((res: IFilm) => {
      setData(res);
    });
  }, [filmId.id]);

  function handleBook() {
    //TODO:传参筛选有这个电影的影院

    navigate("/ticketBooking/cinema");
  }

  const navigate = useNavigate();
  return (
    <>
      <Space>
        <img alt="" style={{ width: 300, height: 450 }} src={data?.image} />
        {/*<img alt="" src={require("../" + data?.image)}/>*/}
        <Space align={"start"} direction={"vertical"}>
          <h2>{data?.name}</h2>
          <h3>动作 冒险</h3> {/*TODO:这一部分改为电影对应信息*/}
          <h3>{data?.region + "/" + data?.duration + "分钟"}</h3>
          <h3>{data?.releaseDate + "中国大陆上映"}</h3>
          <Button
            shape={"round"}
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => handleBook()}
          >
            立即购票
          </Button>
        </Space>
        <div style={{ maxWidth: 500 }}>
          <h2 style={{ display: "inline" }}>简介：</h2>
          <p style={{ display: "inline" }}>{data?.description}</p>
          <h2>评分：8.8</h2>
          <Rate></Rate>
        </div>
      </Space>
    </>
  );
}
