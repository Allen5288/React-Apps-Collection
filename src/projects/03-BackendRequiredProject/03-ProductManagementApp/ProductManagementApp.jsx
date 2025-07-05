import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./ProductManagementApp.scss";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const ProductManagementApp = () => {
  const { theme } = useThemeStore();

  // 确保主题只应用到当前组件，不影响其他项目
  useEffect(() => {
    // 只将主题应用到当前组件容器，不应用到全局 html 元素
    const element = document.getElementById("product-management-app");
    if (element) {
      element.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <div
      id="product-management-app"
      className="min-h-screen bg-base-200 transition-colors duration-300"
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--fallback-b1,oklch(var(--b1)))",
            color: "var(--fallback-bc,oklch(var(--bc)))",
            border: "1px solid var(--fallback-b3,oklch(var(--b3)))",
          },
        }}
      />
    </div>
  );
};

export default ProductManagementApp;
