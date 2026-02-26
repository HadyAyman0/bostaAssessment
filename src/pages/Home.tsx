import { type FC } from "react";
import ProductList from "../features/products/components/ProductList";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Home: FC = () => {
  // ---------------------------------------------------
  const { token } = useAuthStore();
  // ---------------------------------------------------
  return (
    <>
      <section>
        <div className="flex flex-col justify-between items-center lg:flex-row">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-blue-gray-900">
              Our Products
            </h1>
            <p className="text-gray-600 mt-2">
              Discover our latest collection and trending items.
            </p>
          </div>
          {token && (
            <Link
              to="/create-product"
              className="bg-red-600 mb-3 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Create New Product
            </Link>
          )}
        </div>
        <ProductList />
      </section>
    </>
  );
};

export default Home;
