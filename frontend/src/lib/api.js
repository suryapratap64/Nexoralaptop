const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/all";

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({
    message: "An error occurred while processing your request",
  }));
  return {
    success: response.ok,
    ...data,
    status: response.status,
  };
};

// API Functions
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      headers: {
        Accept: "application/json",
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch products",
      products: [],
    };
  }
};

export const fetchCart = async () => {
  try {
    const response = await fetch(`${BASE_URL}/ci`);
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const addToCart = async (productId, qty = 1) => {
  try {
    if (!productId) {
      return {
        success: false,
        message: "Product ID is required",
      };
    }

    const response = await fetch(`${BASE_URL}/cartpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, qty }),
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error adding to cart:", error);
    return {
      success: false,
      message: error.message || "Failed to add item to cart",
    };
  }
};

export const deleteCartItem = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return {
      success: false,
      message: error.message || "Failed to delete cart item",
    };
  }
};

export const updateCartItem = async (id, qty) => {
  try {
    const response = await fetch(`${BASE_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qty }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error updating cart item:", error);
    return {
      success: false,
      message: error.message || "Failed to update cart item",
    };
  }
};

export const checkout = async ({ cartItems, customer }) => {
  try {
    const response = await fetch(`${BASE_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer,
        cartItems,
      }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
};
