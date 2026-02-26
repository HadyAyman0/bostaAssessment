import axiosInstance from "../../../api/axiosInstance";
import type { IAddToCartBody } from "../types/cart.types";

export const addToCart = async (body: IAddToCartBody) => {
  const { data } = await axiosInstance.post("/carts", body);
  return data;
};

export const getSingleCart = async (id: number) => {
  const { data } = await axiosInstance.get(`/carts/${id}`);
  return data;
};

export const updateCart = async (id: number, body: IAddToCartBody) => {
  const { data } = await axiosInstance.put(`/carts/${id}`, body);
  return data;
};

export const deleteCart = async (id: number) => {
  const { data } = await axiosInstance.delete(`/carts/${id}`);
  return data;
};
