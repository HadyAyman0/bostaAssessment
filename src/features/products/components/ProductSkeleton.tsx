import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import type { FC } from "react";

const ProductSkeleton: FC = () => {
  return (
    <Card className="w-full max-w-[26rem] shadow-lg animate-pulse">
      <CardHeader
        floated={false}
        shadow={false}
        color="gray"
        className="h-64 bg-gray-300"
      >
        <div className="h-full w-full" />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <div className="h-4 w-2/3 bg-gray-300 rounded" />
          <div className="h-4 w-1/4 bg-gray-300 rounded" />
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-5/6 bg-gray-200 rounded" />
        </div>
        <div className="h-9 w-full bg-gray-300 rounded" />
      </CardBody>
    </Card>
  );
};

export default ProductSkeleton;
