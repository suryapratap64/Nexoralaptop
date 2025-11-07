import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import * as api from "./lib/api";

// Pages and Components
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";
import Checkout from "./components/Checkout";
import Receipt from "./components/Receipt";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await api.fetchProducts();

      if (response?.success && response?.products) {
        setProducts(response.products);
        setError(null);
      } else {
        const errorMsg = response?.message || "Unable to load products";
        toast.error(errorMsg);
        setError(errorMsg);
        setProducts([]);
      }
    } catch (err) {
      console.error("Error loading products:", err);
      const errorMsg = "Network error loading products";
      toast.error(errorMsg);
      setError(errorMsg);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      const response = await api.fetchCart();
      if (response && response.items) {
        setCart({
          items: response.items || [],
          total: response.total || 0,
        });
        setError(null);
      } else {
        toast.error("Unable to load cart");
        setError("Unable to load cart");
      }
    } catch (err) {
      toast.error("Network error loading cart");
      setError("Network error loading cart");
    }
  };

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const handleAdd = async (product) => {
    if (!product) {
      toast.error("Invalid product");
      return;
    }

    const productId = product._id || product.id;
    if (!productId) {
      toast.error("Invalid product ID");
      return;
    }

    try {
      setError(null);
      const res = await api.addToCart(productId, 1);

      if (res?.success) {
        await loadCart();
      } else {
        const errorMsg = res?.message || "Could not add item";
        toast.error(errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      const errorMsg = err?.message || "Network error adding to cart";
      toast.error(errorMsg);
      setError(errorMsg);
    }
  };

  const handleRemove = async (id) => {
    setError(null);
    try {
      const res = await api.deleteCartItem(id);
      if (res.success) {
        await loadCart();
        toast.success("Item removed from cart");
      } else {
        const errorMsg = res.message || "Could not remove item";
        toast.error(errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      const errorMsg = "Network error removing item";
      toast.error(errorMsg);
      setError(errorMsg);
    }
  };

  const handleUpdate = async (id, qty) => {
    if (!qty || qty < 1) return;
    setError(null);
    try {
      const res = await api.updateCartItem(id, qty);
      if (res.success) {
        await loadCart();
        toast.success("Cart updated successfully");
      } else {
        const errorMsg = res.message || "Could not update item";
        toast.error(errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      const errorMsg = "Network error updating item";
      toast.error(errorMsg);
      setError(errorMsg);
    }
  };

  const handleCheckoutClick = () => setCheckoutOpen(true);

  const handleCheckoutSubmit = async (customer) => {
    setError(null);
    try {
      const payload = {
        cartItems: cart.items.map((it) => ({
          productId: it.productId,
          name: it.name,
          price: it.price,
          qty: it.qty,
        })),
        customer,
      };
      const res = await api.checkout(payload);
      if (res.success) {
        setCheckoutOpen(false);
        await loadCart();
        // Create a properly structured receipt
        const receiptData = {
          orderId: res.orderId || Date.now().toString(),
          date: new Date().toISOString(),
          items: cart.items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.qty,
          })),
          customer: customer,
          total: cart.total,
        };
        setReceipt(receiptData);
        toast.success("Order placed successfully!");
      } else {
        const errorMsg = res.message || "Checkout failed";
        toast.error(errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      setError("Network error during checkout");
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header cartItemCount={cart.items.length} />,
      children: [
        {
          index: true,
          element: (
            <div className="container mx-auto px-4 py-8">
              <Home products={products} onAdd={handleAdd} loading={loading} />
            </div>
          ),
        },
        {
          path: "cart",
          element: (
            <CartPage
              cart={cart}
              onRemove={handleRemove}
              onUpdate={handleUpdate}
              onCheckout={handleCheckoutClick}
            />
          ),
        },
        {
          path: "*",
          element: (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800">
                Page Not Found
              </h2>
              <p className="text-gray-600 mt-2">
                The page you're looking for doesn't exist.
              </p>
            </div>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Checkout
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={handleCheckoutSubmit}
      />
      <Receipt
        receipt={receipt}
        onClose={() => {
          setReceipt(null);
          toast.success("Thank you for your order!");
        }}
      />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
        className="toast-animation"
      />
    </>
  );
}
