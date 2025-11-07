import { CartItem } from "../models/CartItem.js";
import { Product } from "../models/Product.js";
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find()
      // Get newest products first
      .limit(20);

    if (!products || !products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found",
        products: [],
      });
    }

    res.json({
      success: true,
      message: "Products fetched successfully",
      products: products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      success: false,
      message: "Server error fetching products",
      products: [],
    });
  }
};

export const getcartitem = async (req, res) => {
  try {
    const items = await CartItem.find().populate("product");

    // Filter out items with deleted products and calculate total
    const validItems = items.filter((item) => item.product !== null);
    const total = validItems.reduce(
      (s, it) => s + it.product.price * it.qty,
      0
    );

    // If there were any invalid items, clean them up
    if (validItems.length !== items.length) {
      const invalidItems = items.filter((item) => item.product === null);
      await CartItem.deleteMany({
        _id: { $in: invalidItems.map((item) => item._id) },
      });
    }

    res.json({ items: validItems, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching cart" });
  }
};

export const postcart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty) {
      return res.status(400).json({
        success: false,
        message: "productId and qty required",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // check if item already in cart -> increase qty
    let item = await CartItem.findOne({ product: productId });
    if (item) {
      item.qty += qty;
      await item.save();
    } else {
      item = new CartItem({ product: productId, qty });
      await item.save();
    }

    const items = await CartItem.find().populate("product");
    const total = items.reduce((s, it) => s + it.product.price * it.qty, 0);

    res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
      items,
      total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error adding to cart",
    });
  }
};

export const deletecart = async (req, res) => {
  try {
    const id = req.params.id;

    // First check if the item exists
    const cartItem = await CartItem.findById(id);
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Delete the item
    await cartItem.deleteOne();

    // Get updated cart state
    const items = await CartItem.find().populate("product");
    const validItems = items.filter((item) => item.product !== null);
    const total = validItems.reduce(
      (sum, item) => sum + item.product.price * item.qty,
      0
    );

    // Clean up items with missing products
    if (validItems.length !== items.length) {
      const invalidItems = items.filter((item) => item.product === null);
      await CartItem.deleteMany({
        _id: { $in: invalidItems.map((item) => item._id) },
      });
    }

    res.json({
      success: true,
      message: "Item removed from cart successfully",
      items: validItems,
      total,
    });
  } catch (err) {
    console.error("Error deleting cart item:", err);
    res.status(500).json({
      success: false,
      message: "Failed to remove item from cart",
    });
  }
};

export const updatecart = async (req, res) => {
  try {
    const id = req.params.id;
    const { qty } = req.body;

    // Input validation
    if (typeof qty !== "number" || qty < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity provided",
      });
    }

    // Find and validate cart item
    const item = await CartItem.findById(id).populate("product");
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Check if product still exists
    if (!item.product) {
      await item.deleteOne();
      return res.status(404).json({
        success: false,
        message: "Product no longer available",
      });
    }

    // Update quantity
    item.qty = qty;
    await item.save();

    // Get updated cart state
    const items = await CartItem.find().populate("product");
    const validItems = items.filter((item) => item.product !== null);
    const total = validItems.reduce(
      (sum, item) => sum + item.product.price * item.qty,
      0
    );

    // Clean up items with missing products
    if (validItems.length !== items.length) {
      const invalidItems = items.filter((item) => item.product === null);
      await CartItem.deleteMany({
        _id: { $in: invalidItems.map((item) => item._id) },
      });
    }

    res.json({
      success: true,
      message: "Cart item quantity updated successfully",
      items: validItems,
      total,
    });
  } catch (err) {
    console.error("Error updating cart item:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update cart item quantity",
    });
  }
};

export const checkoutcart = async (req, res) => {
  try {
    const { name, email } = req.body;
    // Use server-side cart for final calculation
    const items = await CartItem.find().populate("product");
    if (!items.length)
      return res.status(400).json({ message: "Cart is empty" });
    const total = items.reduce((s, it) => s + it.product.price * it.qty, 0);
    const receipt = {
      id: `rcpt_${Date.now()}`,
      name: name || "Guest",
      email: email || null,
      total,
      items: items.map((it) => ({
        id: it._id,
        product: it.product.name,
        qty: it.qty,
        price: it.product.price,
      })),
      timestamp: new Date(),
    };

    // For a mock checkout, we clear the cart
    await CartItem.deleteMany({});

    res.json({ receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during checkout" });
  }
};
