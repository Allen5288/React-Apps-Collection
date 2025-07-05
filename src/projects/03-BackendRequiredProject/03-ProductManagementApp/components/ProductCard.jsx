import { EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

function ProductCard({ product }) {
  const { deleteProduct } = useProductStore();
  return (
    <div className="bg-base-100 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* PRODUCT IMAGE */}
      <figure className="relative pt-[56.25%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-t-xl"
        />
      </figure>

      <div className="flex flex-col flex-1 p-4">
        {/* PRODUCT INFO */}
        <h2 className="text-lg font-semibold mb-1 text-base-content">{product.name}</h2>
        <p className="text-2xl font-bold text-primary mb-4">${Number(product.price).toFixed(2)}</p>

        {/* CARD ACTIONS */}
        <div className="flex justify-end gap-2 mt-auto">
          <Link to={`products/${product.id}`} className="inline-flex items-center px-3 py-1.5 rounded-md border border-primary text-primary hover:bg-primary/10 text-sm font-medium transition-colors">
            <EditIcon className="w-4 h-4 mr-1" />
          </Link>

          <button
            className="inline-flex items-center px-3 py-1.5 rounded-md border border-secondary text-secondary hover:bg-secondary/10 text-sm font-medium transition-colors"
            onClick={() => deleteProduct(product.id)}
          >
            <Trash2Icon className="w-4 h-4 mr-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
