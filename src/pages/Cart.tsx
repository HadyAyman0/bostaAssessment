import { useCartStore } from "../store/useCartStore";
import { useUpdateCart } from "../features/cart/hooks/useUpdateCart";
import { useDeleteCart } from "../features/cart/hooks/useDeleteCart";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ChevronLeftIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { ICartItem } from "../features/cart/types/cart.types";
import type { FC } from "react";

const CartPage: FC = () => {
  // ---------------------------------------------------
  const { cartItems, removeFromStore, updateQuantity } = useCartStore();
  // ---------------------------------------------------
  const updateMutation = useUpdateCart();
  const deleteMutation = useDeleteCart();
  // ---------------------------------------------------
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  // ---------------------------------------------------
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        removeFromStore(id);
      },
    });
  };
  // ---------------------------------------------------
  const handleUpdateQty = (item: ICartItem, delta: number) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    const body = {
      id: 0,
      userId: 1,
      products: [
        {
          ...item,
          quantity: newQty,
        },
      ],
    };
    updateMutation.mutate(
      { id: item.id, body },
      {
        onSuccess: () => {
          updateQuantity(item.id, newQty);
        },
      }
    );
  };
  // ---------------------------------------------------
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <ShoppingBag size={80} className="text-gray-300" />
        <h2 className="text-2xl font-semibold text-gray-600">
          Your cart is empty
        </h2>
        <Link to="/" className="text-blue-600 ">
          Go shopping now!
        </Link>
      </div>
    );
  }
  // ---------------------------------------------------
  return (
    <div className="container mx-auto p-6">
      <Link
        to="/"
        className="flex items-center gap-2 mb-8 hover:bg-gray-100 w-max px-3 py-2 rounded transition-colors"
      >
        <ChevronLeftIcon size={20} /> Back to Products
      </Link>
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-xl bg-white shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain self-center sm:self-auto shrink-0"
              />

              <div className="flex-grow min-w-0 text-center sm:text-left">
                <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
                <p className="text-red-600 font-bold mt-1 sm:mt-2">
                  ${item.price}
                </p>
              </div>

              <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-4 shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 p-2 rounded-lg">
                  <button
                    disabled={updateMutation.isPending}
                    onClick={() => handleUpdateQty(item, -1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:text-blue-600 transition disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    disabled={updateMutation.isPending}
                    onClick={() => handleUpdateQty(item, 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:text-blue-600 transition disabled:opacity-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  disabled={deleteMutation.isPending}
                  onClick={() => handleDelete(item.id)}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50 shrink-0"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-6 rounded-xl h-fit shadow-md border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="border-t pt-4 flex justify-between items-center mb-6">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-extrabold text-red-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
