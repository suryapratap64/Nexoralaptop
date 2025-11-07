import React from "react";

export default function Receipt({ receipt, onClose }) {
  if (!receipt || typeof receipt !== "object") return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Order Receipt</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
            <p className="text-sm text-gray-600">
              Order ID: {receipt.orderId || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              Date:{" "}
              {receipt.date ? new Date(receipt.date).toLocaleString() : "N/A"}
            </p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Customer Details
            </h3>
            {receipt.customer ? (
              <>
                <p className="text-sm text-gray-600">
                  {receipt.customer.name || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  {receipt.customer.email || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  {receipt.customer.address || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  {receipt.customer.phone || "N/A"}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-600">
                No customer details available
              </p>
            )}
          </div>

          <div className="pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount</span>
              <span>₹{receipt.total}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
