import React from "react";
import { Link } from "react-router-dom";

export default function CartPage({ cart, onRemove, onUpdate, onCheckout }) {
  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    onUpdate(id, newQty);
  };

  if (!cart.items.length) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.product.category}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.qty - 1)
                        }
                        className="text-gray-500 hover:text-indigo-600 p-1"
                      >
                        -
                      </button>
                      <span className="mx-2 w-8 text-center">{item.qty}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.qty + 1)
                        }
                        className="text-gray-500 hover:text-indigo-600 p-1"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(item._id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-medium text-gray-900">
                    ₹{item.product.price * item.qty}
                  </p>
                  <p className="text-sm text-gray-500">
                    ₹{item.product.price} each
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal ({cart.items.length} items)</span>
                <span>₹{cart.total}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>₹{cart.total}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/"
              className="block text-center text-indigo-600 hover:text-indigo-800 mt-4 text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
