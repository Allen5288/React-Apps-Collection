import { Link, useResolvedPath } from "react-router-dom";
import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useProductStore } from "../store/useProductStore";

function Navbar() {
  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/";

  const { products } = useProductStore();

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex px-4 min-h-[4rem] justify-between items-center">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="w-9 h-9 text-primary" />
                <span
                  className="font-semibold font-mono tracking-widest text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent [background-clip:text]"
                  style={{ WebkitTextFillColor: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text" }}
                >
                  POSGRESTORE
                </span>
              </div>
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            <ThemeSelector />

            {isHomePage && (
              <div className="relative">
                <div className="p-2 rounded-full hover:bg-base-200 transition-colors relative">
                  <ShoppingBagIcon className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-primary text-base-100 text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
                    {products.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
