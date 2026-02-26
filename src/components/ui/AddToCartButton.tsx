import type { FC } from "react";
import { useAddToCart } from "../../features/cart/hooks/useAddToCart";
import { useCartStore } from "../../store/useCartStore";
import type { IProduct } from "../../features/products/types/product.types";
import { ShoppingCartIcon } from "lucide-react";

const AddToCartButton: FC<{ product: IProduct }> = ({ product }) => {
  // ---------------------------------------------------
  const { mutate, isPending } = useAddToCart();
  const addToStore = useCartStore((state) => state.addToStore);
  // ---------------------------------------------------
  const handleAdd = () => {
    const body = {
      id: 0,
      userId: 1,
      products: [product],
    };

    mutate(body, {
      onSuccess: () => {
        addToStore({ ...product, quantity: 1 });
      },
    });
  };
  // ---------------------------------------------------
  return (
    <button
      onClick={handleAdd}
      disabled={isPending}
      className="bg-red-600 flex-grow flex items-center justify-center gap-3 p-1 w-full text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? (
        "Adding..."
      ) : (
        <>
          <ShoppingCartIcon size={20} />
          <span>Add to Cart</span>
        </>
      )}{" "}
    </button>
  );
};

export default AddToCartButton;
