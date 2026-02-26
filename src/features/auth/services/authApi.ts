import axiosInstance from "../../../api/axiosInstance";
import type {
  ILoginBody,
  ILoginResponse,
  ISignUpBody,
  ISignUpResponse,
} from "../types/auth.types";

export const login = async (body: ILoginBody): Promise<ILoginResponse> => {
  const { data } = await axiosInstance.post("/auth/login", body);
  return data;
};

export const signUp = async (
  body: ISignUpBody
): Promise<ISignUpResponse> => {
  const { data } = await axiosInstance.post("/users", body);
  return data;
};
