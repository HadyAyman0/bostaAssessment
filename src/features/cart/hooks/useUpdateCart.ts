import { useMutation } from "@tanstack/react-query";
import { updateCart } from "../services/cartApi";
import type { IAddToCartBody } from "../types/cart.types";
import { toast } from "react-toastify";

export const useUpdateCart = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: IAddToCartBody }) =>
      updateCart(id, body),
    onSuccess: () => {
      console.log("Product updated in cart successfully!");
      toast.success("Product updated in cart successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update product in cart");
      console.error("Error updating cart", error);
    },
  });
};
