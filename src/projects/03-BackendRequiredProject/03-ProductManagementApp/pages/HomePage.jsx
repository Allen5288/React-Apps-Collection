import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";

function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center mb-8">
        <AddProductModal />
        <button className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-base-200 transition-colors" onClick={fetchProducts}>
          <RefreshCwIcon className="w-5 h-5" />
        </button>
      </div>

      {error && <div className="bg-secondary/20 text-secondary rounded-md px-4 py-3 mb-8 border border-secondary/30">{error}</div>}

      {products.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-200 rounded-full p-6">
            <PackageIcon className="w-12 h-12 text-base-content" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold text-base-content">No products found</h3>
            <p className="text-base-content opacity-60 max-w-sm">
              Get started by adding your first product to the inventory
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
export default HomePage;
