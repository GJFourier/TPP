import { backendServer } from "./ServiceConst";

export async function getAllCinema() {
  return await fetch(backendServer + "/cinema/get", { method: "GET" })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}

export async function getCinemaById(id: number) {
  return await fetch(backendServer + "/cinema/getById/" + id.toString(), {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}
