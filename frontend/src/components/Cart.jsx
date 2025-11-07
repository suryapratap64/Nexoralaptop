import React from "react";

export default function Cart({
  items,
  total,
  onRemove,
  onUpdate,
  onCheckoutClick,
}) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Cart</h2>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between py-2 border-b"
            >
              <div>
                <div className="font-medium">{item.product.name}</div>
                <div className="text-sm text-gray-500">
                  ₹{item.product.price} × {item.qty} = ₹
                  {item.product.price * item.qty}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => onUpdate(item._id, Number(e.target.value))}
                  className="w-20 p-1 border rounded"
                />
                <button
                  onClick={() => onRemove(item._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 text-right">
            <div className="text-lg font-bold">Total: ₹{total}</div>
            <button
              onClick={onCheckoutClick}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
