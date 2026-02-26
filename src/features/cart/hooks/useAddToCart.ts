import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../services/cartApi";
import { toast } from "react-toastify";
export const useAddToCart = () => {
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      console.log("Product added to cart successfully!");
      toast.success("Product added to cart successfully!");
    },
    onError: (error) => {
      toast.error("Failed to add product to cart");
      console.error("Error adding to cart", error);
    },
  });
};
