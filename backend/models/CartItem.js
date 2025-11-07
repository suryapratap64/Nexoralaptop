

import mongoose from "mongoose";
const CartItemSchema = new mongoose.Schema({
product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
qty: { type: Number, required: true, min: 1 }
});

export const CartItem=mongoose.model('CartItem',CartItemSchema);