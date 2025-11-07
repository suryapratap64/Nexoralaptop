import React from "react";
import CheckoutModal from "../components/CheckoutModal";

export default function Checkout({ open, onClose, onSubmit }) {
  return <CheckoutModal open={open} onClose={onClose} onSubmit={onSubmit} />;
}
