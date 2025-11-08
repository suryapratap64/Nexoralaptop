# NexoraECO – Full Stack Mock E-Commerce Cart

This project is a full-stack e-commerce cart system built for internship screening.  
It includes a React frontend, an Express + MongoDB backend, and a REST API integration for managing products, cart, and checkout operations.

---

## Overview

**Tech Stack**
- Frontend: React (Vite / Create React App)
- Backend: Node.js, Express.js
- Database: MongoDB (via Mongoose)
- Environment Variables: dotenv
- API Communication: REST
- Styling: CSS (responsive layout)

---

## Features

### Backend (Express + MongoDB)
- `GET /api/products` – Fetch all available products.
- `POST /api/cart` – Add a product to the cart `{ productId, qty }`.
- `DELETE /api/cart/:id` – Remove an item from the cart.
- `PUT /api/cart/:id` – Update quantity of an existing cart item.
- `GET /api/cart` – Retrieve all cart items and total cost.
- `POST /api/checkout` – Simulate checkout and return a mock receipt.

### Frontend (React)
- Display all products in a responsive grid layout.
- Add/remove products from the cart.
- Update quantity directly from the cart.
- Checkout with name and email form.
- Display mock receipt after checkout.
- Responsive design (mobile friendly).

---

## Project Structure

Nexoraeco/
│
├── backend/
│ ├── .env.example
│ ├── server.js
│ ├── seedProducts.js
│ ├── package.json
│ ├── /models
│ │ ├── Product.js
│ │ └── CartItem.js
│ └── /routes
│ ├── products.js
│ ├── cart.js
│ └── checkout.js
│
├── frontend/
│ ├── package.json
│ ├── src/
│ │ ├── App.jsx
│ │ ├── api.js
│ │ ├── index.js
│ │ ├── styles.css
│ │ ├── /pages
│ │ │ ├── HomePage.jsx
│ │ │ ├── CartPage.jsx
│ │ │ ├── CheckoutPage.jsx
│ │ │ ├── ProductPage.jsx
│ │ │ └── ReceiptPage.jsx
│ │ └── /components
│ │ ├── Header.jsx
│ │ └── common UI components
│
└── README.md


---

## Installation and Setup

### Prerequisites
- Node.js >= 18
- MongoDB (local or cloud)
- npm or yarn

### Clone Repository
```bash
git clone https://github.com/yourusername/Nexoraeco.git
cd Nexoraeco

Backend Setup
cd backend
cp .env.example .env
# Open .env and add your MongoDB URI
npm install
npm run seed   # Seed initial products
npm run dev    # Start backend server


Default server runs on:

http://localhost:5000

Frontend Setup
cd frontend
npm install
npm start


The frontend will connect automatically to the backend if both run locally.

Default frontend:

http://localhost:8000

Sample .env File (Backend)
PORT=5000
MONGO_URI=mongodb://localhost:27017/nexoraeco

Example Product Structure
{
  "name": "Dell XPS 13 9310",
  "price": 149999,
  "description": "13.4″ FHD+ InfinityEdge display, 11th Gen Intel i7, ultra-portable premium laptop.",
  "image": "https://m.media-amazon.com/images/I/71T2K5u5QfL._AC_UY550_.jpg",
  "stock": 25,
  "category": "Ultrabook"
}

Testing the API

You can test routes using Postman or Thunder Client.

Example: Add product to cart
POST http://localhost:8000/api/cart
Content-Type: application/json

{
  "productId": "replace_with_actual_product_id",
  "qty": 2
}

