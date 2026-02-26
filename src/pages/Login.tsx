import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { type FC } from "react";
import type { ILoginBody } from "../features/auth/types/auth.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLogin } from "../features/auth/hooks/useLogin";
import { Link } from "react-router-dom";
const Login: FC = () => {
  // ---------------------------------------------------
  const { mutate, isPending } = useLogin();
  // ---------------------------------------------------
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
  });
  // ---------------------------------------------------
  const handleSubmit = async (values: ILoginBody) => {
    mutate(values);
  };
  // ---------------------------------------------------
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  // ---------------------------------------------------
  return (
    <div className="flex justify-center items-center mt-20">
      <Card
        color="transparent"
        shadow={false}
        className="p-8 bg-white shadow-xl border border-gray-100"
      >
        <Typography variant="h4" color="blue-gray" className="text-center">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center">
          Enter your details to access your account.
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <div>
              <Input
                size="lg"
                label="Username"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.username}
                </p>
              )}
            </div>
            <div>
              <Input
                type="password"
                size="lg"
                label="Password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="mt-6 bg-red-600"
            fullWidth
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>

          <Typography color="gray" className="mt-4 text-center font-normal">
            dont have an account?
            <Link to="/signup" className="font-medium text-blue-500">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};
export default Login;
