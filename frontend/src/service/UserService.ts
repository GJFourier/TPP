import {IOrder, IUser} from "../interface";
import { backendServer } from "./ServiceConst";
import exp from "constants";

export const getOrdersByUserId: (userId: number) => Promise<IOrder[]> = async (
  userId: number
) => {
  const ordersData = await fetch(backendServer + "/order/get?userId=" + userId);
  const orders = await ordersData.json();
  return orders;
};

export const getUserByUserId: (userId: number) => Promise<IUser> = async (
  userId: number
) => {
  const userData = await fetch(backendServer + "/user" + userId);
  const user = await userData.json();
  return user;
};

export async function updateUser(user:IUser){
  return await fetch(backendServer + "/api/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),

  });
}

export async function register(username: string, password: string) {
  return await fetch(backendServer + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: "",
      name: "",
      avatar: "",
      phone: "",
    }),
  });
}

export async function login(username: string, password: string) {
  return await fetch(
    backendServer +
      "/login" +
      "?username=" +
      username +
      "&password=" +
      password,
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}
