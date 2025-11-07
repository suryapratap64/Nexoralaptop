import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-l-2 border-indigo-300 absolute top-0"></div>
      </div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  );
}
