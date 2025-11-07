import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/Product.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const products = [
  {
    name: "Dell XPS 13 9310",
    price: 149999,
    description: "13.4″ FHD+ InfinityEdge display, 11th Gen Intel i7, ultra-portable premium laptop.",
    image: "https://m.media-amazon.com/images/I/61oltDX2ZeL._AC_SL1500_.jpg",
    stock: 25,
    category: "Ultrabook",
  },
  {
    name: "HP Spectre x360 14",
    price: 179999,
    description: "14″ 2-in-1 convertible, OLED display, Intel Evo certified, luxury finish.",
    image: "https://media.wired.com/photos/67e5bd328eceed9f2cae96f3/4:3/w_1280%2Cc_limit/Razer-Blade-16-2025-Laptop-(front)-Reviewer-Photo-SOURCE-Luke-Larsen.jpg",
    stock: 15,
    category: "Ultrabook",
  },
  {
    name: "Lenovo Yoga Slim 7i Pro",
    price: 129999,
    description: "14″ 16:10 display, Intel i7 H-series, 1TB SSD, sleek design.",
    image: "https://media.wired.com/photos/67d04e1c38d5984f21140ee2/4:3/w_1280%2Cc_limit/Apple-MacBook-Air-13-Inch-M4-2025-(front-open-screen-desktop)-Reviewer-Photo-SOURCE-Brenda-Stolyar.jpg",
    stock: 30,
    category: "Ultrabook",
  },
  {
    name: "ASUS ROG Zephyrus G14",
    price: 189999,
    description: "14″ gaming laptop, Ryzen 9 5900HS, RTX 3060, high refresh display.",
    image: "https://media.wired.com/photos/684c90ccf10f95b5d749f3cf/4:3/w_1280%2Cc_limit/Microsoft-Surface-Laptop-(7th-Edition)-Front-Reviewer-Photo-SOURCE-Brenda-Stolyar.png",
    stock: 12,
    category: "Gaming",
  },
  {
    name: "Acer Predator Helios 300",
    price: 159999,
    description: "15.6″ gaming laptop, Intel i7-11800H, RTX 3070, dual-fan cooling.",
    image: "https://media.wired.com/photos/6843bb35790e844a9ba7ee03/4:3/w_1280%2Cc_limit/Dell%252014%2520Plus%25202_%2520Source%2520Luke%2520Larsen.png",
    stock: 20,
    category: "Gaming",
  },
  {
    name: "MSI Stealth 15M",
    price: 139999,
    description: "15.6″ thin gaming laptop, Intel i7, RTX 3060, metal body.",
    image: "https://media.wired.com/photos/684c90ccf10f95b5d749f3cf/4:3/w_1280%2Cc_limit/Microsoft-Surface-Laptop-(7th-Edition)-Front-Reviewer-Photo-SOURCE-Brenda-Stolyar.png",
    stock: 18,
    category: "Gaming",
  },
  {
    name: "Apple MacBook Air M2 13″",
    price: 134999,
    description: "Apple M2 chip, 13.6″ Retina display, fanless design, ultra-light.",
    image: "https://media.wired.com/photos/6843bb35790e844a9ba7ee03/4:3/w_1280%2Cc_limit/Dell%252014%2520Plus%25202_%2520Source%2520Luke%2520Larsen.png",
    stock: 22,
    category: "Ultrabook",
  },
  {
    name: "Google Pixelbook Go",
    price: 99999,
    description: "13.3″ Ultra-portable Chromebook, sleek, whisper-quiet keyboard.",
    image: "https://media.wired.com/photos/684c90ccf10f95b5d749f3cf/4:3/w_1280%2Cc_limit/Microsoft-Surface-Laptop-(7th-Edition)-Front-Reviewer-Photo-SOURCE-Brenda-Stolyar.png",
    stock: 35,
    category: "Chromebook",
  },
  {
    name: "Samsung Galaxy Book3 Pro 16″",
    price: 184999,
    description: "16″ AMOLED display, Intel i7, super-thin design, S-Pen support.",
    image: "https://media.wired.com/photos/684c90ccf10f95b5d749f3cf/4:3/w_1280%2Cc_limit/Microsoft-Surface-Laptop-(7th-Edition)-Front-Reviewer-Photo-SOURCE-Brenda-Stolyar.png",
    stock: 10,
    category: "Ultrabook",
  },
  {
    name: "Dell G15 5511",
    price: 119999,
    description: "15.6″ gaming laptop, Intel i5-11400H, RTX 3050, value gaming option.",
    image: "https://media.wired.com/photos/684c90ccf10f95b5d749f3cf/4:3/w_1280%2Cc_limit/Microsoft-Surface-Laptop-(7th-Edition)-Front-Reviewer-Photo-SOURCE-Brenda-Stolyar.png",
    stock: 28,
    category: "Gaming",
  },
  {
    name: "HP Pavilion Aero 13",
    price: 84999,
    description: "13.3″ ultra-light laptop, AMD Ryzen 7 5800U, great for students.",
    image: "https://media.wired.com/photos/6843bb35790e844a9ba7ee03/4:3/w_1280%2Cc_limit/Dell%252014%2520Plus%25202_%2520Source%2520Luke%2520Larsen.png",
    stock: 40,
    category: "Budget Ultrabook",
  },
  {
    name: "Lenovo Legion 5 Pro 16″",
    price: 174999,
    description: "16″ QHD gaming laptop, Ryzen 7 6800H, RTX 3070, full performance machine.",
    image: "https://media.wired.com/photos/6843bb35790e844a9ba7ee03/4:3/w_1280%2Cc_limit/Dell%252014%2520Plus%25202_%2520Source%2520Luke%2520Larsen.png",
    stock: 14,
    category: "Gaming",
  },
  {
    name: "Acer Swift 5 SF514",
    price: 104999,
    description: "14″ touchscreen ultrabook, Intel i7-13th Gen, magnesium-lithium alloy body.",
    image: "https://media.wired.com/photos/6843bb35790e844a9ba7ee03/4:3/w_1280%2Cc_limit/Dell%252014%2520Plus%25202_%2520Source%2520Luke%2520Larsen.png",
    stock: 27,
    category: "Ultrabook",
  },
  {
    name: "MSI Creator Z16",
    price: 219999,
    description: "16″ creator laptop, Intel i9, RTX 3080, for design & video work.",
    image: "https://media.wired.com/photos/6843bb35790e844a9ba7ee03/4:3/w_1280%2Cc_limit/Dell%252014%2520Plus%25202_%2520Source%2520Luke%2520Larsen.png",
    stock: 8,
    category: "Creator",
  },
  {
    name: "ASUS VivoBook S14 OLED",
    price: 79999,
    description: "14″ OLED display, Intel i5, ultra-thin chassis, stylish color options.",
    image: "https://media.wired.com/photos/6843bb35790e844a9ba7ee03/4:3/w_1280%2Cc_limit/Dell%252014%2520Plus%25202_%2520Source%2520Luke%2520Larsen.png",
    stock: 33,
    category: "Ultrabook",
  },
  {
    name: "HP Omen 16",
    price: 164999,
    description: "16″ gaming laptop, Ryzen 9 6900HX, RTX 3080, high-end horsepower.",
    image: "https://media.wired.com/photos/6843bb35790e844a9ba7ee03/4:3/w_1280%2Cc_limit/Dell%252014%2520Plus%25202_%2520Source%2520Luke%2520Larsen.png",
    stock: 9,
    category: "Gaming",
  },
  {
    name: "Dell Inspiron 14 2-in-1",
    price: 69999,
    description: "14″ touchscreen convertible, Intel i5, solid everyday machine with flexibility.",
    image: "https://media.wired.com/photos/6843bb35790e844a9ba7ee03/4:3/w_1280%2Cc_limit/Dell%252014%2520Plus%25202_%2520Source%2520Luke%2520Larsen.png",
    stock: 36,
    category: "Convertible",
  },
  {
    name: "Lenovo IdeaPad Flex 5 14″",
    price: 62999,
    description: "14″ 2-in-1 convertible, AMD Ryzen 5 5500U, great value for students.",
    image: "https://media.wired.com/photos/6843bb35790e844a9ba7ee03/4:3/w_1280%2Cc_limit/Dell%252014%2520Plus%25202_%2520Source%2520Luke%2520Larsen.png",
    stock: 45,
    category: "Convertible",
  },
  {
    name: "Apple MacBook Pro 14″ M3 Pro",
    price: 249999,
    description: "Apple M3 Pro chip, 14″ Liquid Retina XDR display, pro-level performance.",
    image: "https://media.wired.com/photos/6843bb35790e844a9ba7ee03/4:3/w_1280%2Cc_limit/Dell%252014%2520Plus%25202_%2520Source%2520Luke%2520Larsen.png",
    stock: 7,
    category: "Ultrabook",
  },
  {
    name: "Samsung Galaxy Chromebook2 13″",
    price: 75999,
    description: "13″ ultra-light Chromebooks, Intel Evo, 120 Hz display, for minimalist productivity.",
    image: "https://media.wired.com/photos/6843bb35790e844a9ba7ee03/4:3/w_1280%2Cc_limit/Dell%252014%2520Plus%25202_%2520Source%2520Luke%2520Larsen.png",
    stock: 50,
    category: "Chromebook",
  }
];

const seedProducts = async () => {
  try {
  
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");

    // Delete existing products
    console.log("Deleting existing products...");
    await Product.deleteMany({});
    console.log("Existing products deleted");

    // Insert new products
    console.log("Inserting new products...");
    const insertedProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${insertedProducts.length} products`);
    console.log("Seeding completed successfully");

    // Close the connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    if (mongoose.connection) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

// Run the seeding function
seedProducts();
