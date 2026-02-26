import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuthStore } from "../../../store/useAuthStore";
import { login } from "../services/authApi";
import { useNavigate } from "react-router-dom";
export const useLogin = () => {
  // ---------------------------------------------------
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  // ---------------------------------------------------
  return useMutation({
    mutationFn: login,
    onSuccess: (data, variables) => {
      console.log("Login successful!");
      setAuth(data.token, { username: variables.username });
      toast.success("Login successful!");
      navigate("/");
    },
    onError: (error) => {
      toast.error("Failed to login");
      console.error("Error logging in", error);
    },
  });
};
