import React, { useEffect, useState } from "react";
import { Button, Menu, Table } from "antd";
import { IScreening } from "../interface";
import { Link } from "react-router-dom";
import { getScreeningByCinemaAndFilm } from "../service/ScreeningService";

const { Column } = Table;

interface ICinemaMovieTimesProps {
  filmId: number;
  cinemaId: number;
}

function CinemaMovieTimes({ filmId, cinemaId }: ICinemaMovieTimesProps) {
  const [times, setTimes] = useState([]);

  const [date, setDate] = useState(times[0]); //date

  const [timesOnSpecificDay, setTimesOnSpecificDay] = useState<IScreening[]>(
    []
  ); //times on specific day
  useEffect(() => {
    //movie id & cinema id -> get times
    // setTimesOnSpecificDay(screens);
    getScreeningByCinemaAndFilm(cinemaId, filmId).then((res: IScreening[]) => {
      if (res == null) {
        alert("暂无场次");
      } else {
        setTimesOnSpecificDay(res);
      }
    });
  }, [cinemaId, filmId]);

  function handleClick(e: any) {
    setDate(e.date);
    //get times on specific day
    //set times on specific day
  }

  return (
    <div>
      <div>
        <h3>场次列表</h3>
      </div>
      <div>
        {/*time select bar*/}
        <Menu
          items={times}
          onClick={handleClick}
          selectedKeys={[date]}
          mode="horizontal"
        />
        {/*times on specific day*/}
        <Table
          dataSource={timesOnSpecificDay}
          showHeader={false}
          pagination={false}
        >
          <Column title="放映时间" dataIndex="startTime" key="startTime" />
          <Column title="放映厅" dataIndex="hallName" key="hallName" />
          <Column title="售价" dataIndex="price" key="price" />
          <Column
            title="选座购票"
            dataIndex="id"
            key="id"
            render={(key) => (
              <Link to={"/ticketBooking/seat/" + key}>
                <Button type="text">选座</Button>
              </Link>
            )}
          />
        </Table>
      </div>
    </div>
  );
}

export default CinemaMovieTimes;
