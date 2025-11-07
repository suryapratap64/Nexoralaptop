import React, { useState } from "react";
import ProductGrid from "../components/ProductGrid";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home({ products, onAdd, loading }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryOrder = [
    "All",
    "Ultrabook",
    "Gaming",
    "Creator",
    "Convertible",
    "Chromebook",
    "Budget Ultrabook",
  ];

  const availableCategories = new Set(products.map((p) => p.category));
  const categories = [
    "All",
    ...categoryOrder.filter(
      (cat) => cat !== "All" && availableCategories.has(cat)
    ),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse our latest collection of premium products
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 max-w-3xl">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } ${category === "All" ? "min-w-[60px]" : ""}`}
            >
              {category === "All"
                ? "All"
                : category === "Budget Ultrabook"
                ? "Budget"
                : category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg text-gray-500">
                No products available in this category
              </h3>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} onAdd={onAdd} />
          )}
        </>
      )}
    </div>
  );
}
