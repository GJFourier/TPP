import { backendServer } from "./ServiceConst";

export async function getScreeningById(screeningId: number) {
  return await fetch(
    backendServer + "/screening/get?" + "screeningId=" + screeningId
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function getScreeningByCinemaAndFilm(
  cinemaId: number,
  filmId: number
) {
  return fetch(
    backendServer +
      "/screening/getByCinemaAndFilm?" +
      "cinemaId=" +
      cinemaId.toString() +
      "&" +
      "filmId=" +
      filmId.toString(),
    { method: "GET" }
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}
