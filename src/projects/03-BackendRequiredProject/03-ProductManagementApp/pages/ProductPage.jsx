import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";

function ProductPage() {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-secondary/20 text-secondary rounded-md px-4 py-3 border border-secondary/30">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate("/productManagement")}
        className="inline-flex items-center px-4 py-2 rounded-md border border-base-300 text-base-content hover:bg-base-200 mb-8 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PRODUCT IMAGE */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <img
            src={currentProduct?.image}
            alt={currentProduct?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* PRODUCT FORM */}
        <div className="bg-base-100 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl mb-6 font-semibold text-base-content">Edit Product</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateProduct(id);
            }}
            className="space-y-6"
          >
            {/* PRODUCT NAME */}
            <div>
              <label className="block mb-1 text-base font-medium">Product Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full border border-base-300 rounded-md py-3 px-4 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-base bg-base-100 text-base-content"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* PRODUCT PRICE */}
            <div>
              <label className="block mb-1 text-base font-medium">Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full border border-base-300 rounded-md py-3 px-4 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-base bg-base-100 text-base-content"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            {/* PRODUCT IMAGE URL */}
            <div>
              <label className="block mb-1 text-base font-medium">Image URL</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                className="w-full border border-base-300 rounded-md py-3 px-4 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-base bg-base-100 text-base-content"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            {/* FORM ACTIONS */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                className="px-4 py-2 rounded-md border border-base-300 text-base-content hover:bg-base-200 transition-colors"
                onClick={handleDelete}
              >
                <Trash2Icon className="w-4 h-4 mr-1 inline-block align-middle" /> Delete
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-primary text-base-100 font-medium min-w-[120px] disabled:opacity-60 hover:opacity-90 transition-opacity"
                disabled={!formData.name || !formData.price || !formData.image || loading}
              >
                <SaveIcon className="w-4 h-4 mr-1 inline-block align-middle" /> Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ProductPage;
