import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import type { ICreateProduct } from "../features/products/types/product.types";
import { useCategories } from "../features/products/hooks/useCategories";
import { ChevronLeftIcon } from "lucide-react";
import { useCreateProduct } from "../features/products/hooks/useCreateProudct";
export default function CreateProduct() {
  // ------------------------------------------------``
  const {
    data: categories,
    isLoading: isCatsLoading,
    isError,
  } = useCategories();
  const { mutate, isPending } = useCreateProduct();
  // ------------------------------------------------
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Title too short")
      .required(" Title is Required"),
    price: Yup.number()
      .positive("Must be positive")
      .required(" Price is Required"),
    description: Yup.string()
      .min(20, "Provide more details")
      .required(" Description is Required"),
    image: Yup.string()
      .url("Must be a valid URL")
      .required("Image URL is Required"),
    category: Yup.string().required("Please select a category"),
  });
  // ------------------------------------------------
  const handleSubmit = async (values: ICreateProduct) => {
    mutate(values);
  };
  // ------------------------------------------------
  const formik = useFormik({
    initialValues: {
      id: 0,
      title: "",
      price: 0,
      description: "",
      image: "",
      category: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  // ------------------------------------------------
  return (
    <div className="flex justify-center items-center py-10 px-4">
      <Card
        color="transparent"
        className="w-full max-w-[600px] p-8 bg-white shadow-xl border"
      >
        <Link
          to="/"
          className="flex border justify-center px-2 items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 w-max py-1 rounded transition-colors"
        >
          <ChevronLeftIcon size={18} /> Back to Products
        </Link>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Add New Product
        </Typography>
        <Typography color="gray" className="font-normal mb-8">
          Fill in the details below to list a new item in the store.
        </Typography>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <Input
              size="lg"
              label="Product Title"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              error={formik.touched.title && !!formik.errors.title}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* Price */}
              <Input
                type="number"
                size="lg"
                label="Price ($)"
                name="price"
                onChange={formik.handleChange}
                value={formik.values.price}
                error={formik.touched.price && !!formik.errors.price}
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.price}
                </p>
              )}
            </div>
            <div>
              {/* Category */}
              {isCatsLoading ? (
                <Select label="Loading Categories..." disabled>
                  <Option value="loading">Please wait...</Option>
                </Select>
              ) : (
                <>
                  <Select
                    name="category"
                    label={
                      isError
                        ? "Error loading categories"
                        : isCatsLoading
                        ? "Loading..."
                        : "Category"
                    }
                    onChange={(val) =>
                      formik.setFieldValue("category", val, true)
                    }
                    error={formik.touched.category && !!formik.errors.category}
                  >
                    {!isError && !isCatsLoading ? (
                      categories?.map((cat: string) => (
                        <Option
                          key={cat}
                          value={cat}
                          className="capitalize"
                          onClick={() => formik.setFieldValue("category", cat)}
                        >
                          {cat}
                        </Option>
                      ))
                    ) : (
                      <Option value="error" disabled>
                        Failed to load categories
                      </Option>
                    )}
                  </Select>
                  {formik.touched.category && formik.errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.category}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          {/* Image URL */}
          <div>
            <Input
              label="Image URL"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.image && !!formik.errors.image}
            />
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.image}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Textarea
              label="Description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              error={formik.touched.description && !!formik.errors.description}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="bg-red-600"
            fullWidth
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
