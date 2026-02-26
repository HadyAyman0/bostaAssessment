import { Card, Input, Button, Typography } from "@material-tailwind/react";
import {  type FC } from "react";
import type { ISignUpBody } from "../features/auth/types/auth.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignup } from "../features/auth/hooks/useSignUp";
import { Link } from "react-router-dom";
const Signup: FC = () => {
  // ---------------------------------------------------
  const { mutate, isPending } = useSignup();
  // ---------------------------------------------------
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    username: Yup.string().min(4, "Too short").required("Required"),
    password: Yup.string().min(6, "Must be 6+ chars").required("Required"),
  });
  // ---------------------------------------------------
  const handleSubmit = async (values: ISignUpBody) => {
    mutate(values);
  };
  // ---------------------------------------------------
  const formik = useFormik({
    initialValues: {
      id: 0,
      email: "",
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  // ---------------------------------------------------
  return (
    <div className="flex justify-center items-center py-10">
      <Card
        color="transparent"
        shadow={false}
        className="p-8 bg-white shadow-xl border border-gray-100"
      >
        <Typography variant="h4" color="blue-gray" className="text-center">
          Sign Up
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-4">
            <Input
              size="lg"
              label="Username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              error={formik.touched.username && Boolean(formik.errors.username)}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.username}
              </p>
            )}
            <Input
              size="lg"
              label="Email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="mt-6 bg-red-600"
            fullWidth
            disabled={isPending}
          >
            {isPending ? "Creating Account..." : "Register"}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-500">
              Login
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};
export default Signup;
