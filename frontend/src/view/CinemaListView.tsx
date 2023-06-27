import { CinemaList } from "../component/cinema/CinemaList";
import { useEffect, useState } from "react";
import { getAllCinema } from "../service/CinemaService";
import { ICinema } from "../interface";

export function CinemaListView() {
  const [cinemaData, setCinemaData] = useState<ICinema[]>([]);

  useEffect(() => {
    getAllCinema().then((res) => {
      setCinemaData(res);
    });
  }, []);

  return (
    <div>
      <h1>影院列表</h1>
      <CinemaList cinemaData={cinemaData}></CinemaList>
    </div>
  );
}
