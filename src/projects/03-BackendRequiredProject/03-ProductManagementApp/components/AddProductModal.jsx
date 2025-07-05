import { DollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useState } from "react";

function AddProductModal() {
  const { addProduct, formData, setFormData, loading } = useProductStore();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* MODAL TRIGGER */}
      <button
        className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-base-100 font-medium hover:opacity-90 transition-opacity"
        onClick={openModal}
      >
        <PlusCircleIcon className="w-5 h-5 mr-2" />
        Add Product
      </button>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-base-100 rounded-xl shadow-lg w-full max-w-md p-8 relative">
            {/* CLOSE BUTTON */}
            <button
              className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-base-200 text-base-content"
              onClick={closeModal}
              type="button"
            >
              X
            </button>

            {/* MODAL HEADER */}
            <h3 className="font-bold text-xl mb-8">Add New Product</h3>

            <form onSubmit={addProduct} className="space-y-6">
              <div className="grid gap-6">
                {/* PRODUCT NAME INPUT */}
                <div>
                  <label className="block mb-1 text-base font-medium">Product Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content opacity-50">
                      <Package2Icon className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter product name"
                      className="pl-10 py-3 w-full border border-base-300 rounded-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-base bg-base-100 text-base-content"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                {/* PRODUCT PRICE INPUT */}
                <div>
                  <label className="block mb-1 text-base font-medium">Price</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content opacity-50">
                      <DollarSignIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-10 py-3 w-full border border-base-300 rounded-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-base bg-base-100 text-base-content"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </div>

                {/* PRODUCT IMAGE */}
                <div>
                  <label className="block mb-1 text-base font-medium">Image URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content opacity-50">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      className="pl-10 py-3 w-full border border-base-300 rounded-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-base bg-base-100 text-base-content"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* MODAL ACTIONS */}
              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md border border-base-300 text-base-content hover:bg-base-200 transition-colors"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-primary text-base-100 font-medium min-w-[120px] disabled:opacity-60 hover:opacity-90 transition-opacity"
                  disabled={!formData.name || !formData.price || !formData.image || loading}
                >
                  {loading ? (
                    <span className="animate-spin inline-block w-5 h-5 border-2 border-base-100 border-t-transparent rounded-full align-middle" />
                  ) : (
                    <>
                      <PlusCircleIcon className="w-5 h-5 mr-2 inline-block align-middle" />
                      Add Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default AddProductModal;
