import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ProductCard({ product, onAdd }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (product.stock <= 0) {
      toast.error("Product is out of stock");
      return;
    }

    setIsAdding(true);
    try {
      await onAdd(product);
      toast.success("Added to cart successfully!");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48 bg-gray-100 overflow-hidden group">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-lg">No Image</span>
          </div>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
            Only {product.stock} left!
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            Out of stock
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800 hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          <span className="text-xl font-bold text-indigo-600">
            ₹{product.price}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={isAdding || product.stock <= 0}
          className={`w-full py-2 rounded-lg text-sm font-medium transition-all duration-200 
            ${
              product.stock <= 0
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : isAdding
                ? "bg-indigo-400 cursor-wait text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-md active:transform active:scale-[0.98]"
            }`}
        >
          {product.stock <= 0
            ? "Out of Stock"
            : isAdding
            ? "Adding..."
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
