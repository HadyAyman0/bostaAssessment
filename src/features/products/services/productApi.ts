import axiosInstance from "../../../api/axiosInstance";
import type { ICreateProduct, IProduct } from "../types/product.types";

export const getProducts = async (): Promise<IProduct[]> => {
  const { data } = await axiosInstance.get("/products");
  return data;
};

export const getProductById = async (id: string): Promise<IProduct> => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data;
};

export const createProduct = async (body: ICreateProduct) => {
  const { data } = await axiosInstance.post("/products", body);
  return data;
};

export const getCategories = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get("/products/categories");
  return data;
};


