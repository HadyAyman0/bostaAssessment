import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import { ProtectedRoute, PublicRoute } from "./routes/Guards";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./features/products/components/ProductDetails";
import CreateProduct from "./pages/CreateProduct";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/create-product"
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
