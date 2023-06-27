import { backendServer } from "./ServiceConst";

export async function getFilms() {
  return await fetch(backendServer + "/film/get", { method: "GET" })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export async function getFilmById(id: number) {
  return await fetch(backendServer + "/film/getById/" + id.toString(), {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}

export async function getLaterFilms() {
  return await fetch(backendServer + "/film/getLater", { method: "GET" })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export async function getFilmsByCinema(id: number) {
  console.log(id);
  return await fetch(
    backendServer + "/film/get/isOnByCinema?cinemaId=" + id.toString(),
    {
      method: "GET",
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}
