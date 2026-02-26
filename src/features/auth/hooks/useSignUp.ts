import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useSignup = () => {
  // ---------------------------------------------------
  const navigate = useNavigate();
  // ---------------------------------------------------
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      console.log("Sign up successful!");
      toast.success("Account created! Now try to login with test account");
      navigate("/login");
    },
    onError: (error) => {
      toast.error("Registration failed. Please try again");
      console.log("Error signing up", error);
    },
  });
};
