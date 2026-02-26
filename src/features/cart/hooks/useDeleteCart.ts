import { useMutation } from "@tanstack/react-query";
import { deleteCart } from "../services/cartApi";
import { toast } from "react-toastify";

export const useDeleteCart = () => {
  return useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      console.log("Product deleted from cart successfully!");
      toast.success("Product deleted from cart successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete product from cart");
      console.error("Error deleting from cart", error);
    },
  });
};
