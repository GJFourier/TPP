import { backendServer } from "./ServiceConst";

export async function getSeatsByScreeningId(screeningId: number) {
  return await fetch(backendServer + "/seat/get?" + "screeningId=" + screeningId)
    .then((res) =>
      res.json()
    ).catch((error) => {
      console.error("Error:", error);
    });
}

