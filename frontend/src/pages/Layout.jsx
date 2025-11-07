import React from "react";
import { Outlet } from "react-router-dom";
import Cart from "../components/Cart";

export default function Layout({
  cart,
  onRemove,
  onUpdate,
  onCheckoutClick,
  receipt,
  error,
}) {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <Outlet />
        </div>
        <div className="space-y-4">
          <Cart
            items={cart.items}
            total={cart.total}
            onRemove={onRemove}
            onUpdate={onUpdate}
            onCheckoutClick={onCheckoutClick}
          />

          {receipt && (
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">Receipt</h3>
              <div className="text-sm text-gray-600">ID: {receipt.id}</div>
              <div className="text-sm text-gray-600">
                Total: ₹{receipt.total}
              </div>
              <div className="text-sm text-gray-600">
                Time: {new Date(receipt.timestamp).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
