import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../services/productApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCreateProduct = () => {
  // ---------------------------------------------------
  const navigate = useNavigate();
  // ---------------------------------------------------
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created successfully!");
      console.log("Product created successfully!");
      navigate("/");
    },
    onError: (err) => {
      toast.error("Error creating product");
      console.error("Error creating product:", err);
    },
  });
};
