import { Select, Option } from "@material-tailwind/react";
import type { FC } from "react";

interface Props {
  categories: string[] | undefined;
  selectedCat: string;
  setSelectedCat: (val: string) => void;
  sortOrder: string;
  setSortOrder: (val: string) => void;
  isCatsLoading: boolean;
  isError: boolean;
}

const ProductFilters: FC<Props> = ({
  categories,
  setSelectedCat,
  setSortOrder,
  isCatsLoading,
  isError,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
      <div className="w-full md:w-72">
        {isCatsLoading ? (
          <Select label="Loading Categories..." disabled>
            <Option value="loading">Please wait...</Option>
          </Select>
        ) : (
          <Select
            label={isError ? "Error loading categories" : "Filter by Category"}
            onChange={(val) => val && setSelectedCat(val)}
          >
            {!isError ? (
              [
                <Option key="all" value="all">
                  All Categories
                </Option>,
                ...(categories?.map((cat) => (
                  <Option key={cat} value={cat} className="capitalize">
                    {cat}
                  </Option>
                )) || []),
              ]
            ) : (
              <Option value="error" disabled>
                Failed to load categories
              </Option>
            )}
          </Select>
        )}
      </div>

      <div className="w-full md:w-72">
        <Select
          label="Sort by Price"
          onChange={(val) => val && setSortOrder(val)}
        >
          <Option value="asc">Price: Low to High</Option>
          <Option value="desc">Price: High to Low</Option>
        </Select>
      </div>
    </div>
  );
};

export default ProductFilters;
