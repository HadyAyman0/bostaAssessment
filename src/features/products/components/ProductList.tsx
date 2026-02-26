import { useState, type FC } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import ProductFilters from "./ProductFilters";
import ProductPagination from "./ProductPagination";
import type { IProduct } from "../types/product.types";
const ProductList: FC = () => {
  // --------------------------------------------------------------
  const { data: products, isLoading, isError } = useProducts();
  const { data: categories, isLoading: isCatsLoading, isError: isCatsError } = useCategories();
  // --------------------------------------------------------------
  const [sortOrder, setSortOrder] = useState<string>("");
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // --------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }
  // --------------------------------------------------------------
  if (isError) {
    return (
      <div className="text-center text-red-500 py-10 font-bold">
        Error loading products. Please try again later.
      </div>
    );
  }
  // --------------------------------------------------------------
  let processedProducts = products ? [...products] : [];
  if (selectedCat !== "all") {
    processedProducts = processedProducts.filter(
      (p) => p.category === selectedCat
    );
  }
  if (sortOrder === "asc") {
    processedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    processedProducts.sort((a, b) => b.price - a.price);
  }
  // --------------------------------------------------------------

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = processedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  // --------------------------------------------------------------
  return (
    <div className="space-y-8">
      <ProductFilters
        categories={categories}
        selectedCat={selectedCat}
        setSelectedCat={(val) => {
          setSelectedCat(val);
          setCurrentPage(1);
        }}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        isCatsLoading={isCatsLoading}
        isError={isCatsError}
      />
      {currentItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-xl font-semibold">No products found</p>
          <p>Try adjusting your filters or category selection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentItems.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ProductList;
