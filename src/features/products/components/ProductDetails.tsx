import { useParams, Link } from "react-router-dom";
import { Typography, Spinner } from "@material-tailwind/react";
import { ChevronLeftIcon } from "lucide-react";
import { useProductDetails } from "../hooks/useProductDetails";
import { useAuthStore } from "../../../store/useAuthStore";
import AddToCartButton from "../../../components/ui/AddToCartButton";
import type { FC } from "react";

const ProductDetails: FC = () => {
  // ---------------------------------------------------
  const { id } = useParams();
  const { data: product, isLoading, isError } = useProductDetails(id!);
  const { token } = useAuthStore();
  // ---------------------------------------------------

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spinner className="h-12 w-12 text-red-600" />
      </div>
    );
  }
  // ---------------------------------------------------

  if (isError) {
    return (
      <div className="text-center text-red-500">Something went wrong!</div>
    );
  }
  // ---------------------------------------------------

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-xl font-semibold">No product found</p>
        <p>It looks like there is no available details at the moment.</p>
      </div>
    );
  }
  // ---------------------------------------------------

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="flex items-center gap-2 mb-8 hover:bg-gray-100 w-max px-3 py-2 rounded transition-colors"
      >
        <ChevronLeftIcon size={20} /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[500px] object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <Typography
              variant="small"
              className="text-red-600 font-bold uppercase tracking-wider mb-2"
            >
              {product.category}
            </Typography>
            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-4 leading-tight"
            >
              {product.title}
            </Typography>
          </div>

          <Typography variant="h3" color="red" className="font-bold">
            ${product.price}
          </Typography>

          <Typography className="text-gray-700 leading-relaxed border-t border-b py-6 border-gray-100">
            {product.description}
          </Typography>
          {token && <AddToCartButton product={product} />}
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
