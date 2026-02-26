import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/productApi";

export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};
