import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import type { IProduct } from "../types/product.types";
import type { FC } from "react";
import AddToCartButton from "../../../components/ui/AddToCartButton";
import { useAuthStore } from "../../../store/useAuthStore";

const ProductCard: FC<{ product: IProduct }> = ({ product }) => {
  // ---------------------------------------------------
  const { token } = useAuthStore();
  // ---------------------------------------------------
  return (
    <Card className="w-full max-w-[26rem] flex flex-col h-full shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
      <CardHeader floated={false} color="blue-gray" className="h-64 shrink-0">
        <img
          src={product?.image}
          alt={product?.title}
          className="h-full w-full object-contain p-4 bg-white"
          loading="lazy"
        />
      </CardHeader>
      <CardBody className="flex flex-col flex-grow">
        <div className="mb-3 flex items-center justify-between">
          <Typography
            variant="h6"
            color="blue-gray"
            className="font-bold capitalize"
          >
            {product.category}
          </Typography>
          <Typography color="red" className="font-bold">
            ${product.price}
          </Typography>
        </div>

        <Typography
          variant="small"
          color="gray"
          className="line-clamp-2 mb-4 font-medium text-blue-gray-900 h-10"
        >
          {product.title}
        </Typography>

        <div className=" flex-col flex gap-3 justify-center items-center ">
          <Link to={`/product/${product.id}`} className="w-full">
            <Button size="sm" fullWidth className="bg-red-600">
              View Details
            </Button>
          </Link>
          {token && <AddToCartButton product={product} />}
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
