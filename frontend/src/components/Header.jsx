import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function Header({ cartItemCount }) {
  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center"
            >
              <span className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                Nexora Laptop
              </span>
            </Link>

            <nav className="flex items-center gap-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                Home
              </NavLink>
              
              <Link
                to="/cart"
                className="relative group flex items-center p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingBagIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600 transition-colors" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

