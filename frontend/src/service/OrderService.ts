import {backendServer} from "./ServiceConst";

export async function getOrdersByUserId(id:number) {
    return await fetch(backendServer + "/order/get", { method: "GET" })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
}

