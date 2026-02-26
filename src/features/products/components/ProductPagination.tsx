import { Button, Typography } from "@material-tailwind/react";
import type { FC } from "react";

interface IProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
}

const ProductPagination: FC<IProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-12 border-t pt-6">
      <Button
        variant="text"
        className="text-red-600 font-bold"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
      >
        Previous
      </Button>

      <Typography color="gray" className="font-bold">
        Page {currentPage} of {totalPages}
      </Typography>

      <Button
        variant="text"
        className="text-red-600 font-bold"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default ProductPagination;
