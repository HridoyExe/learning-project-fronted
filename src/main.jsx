import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppRoute from "./routes/AppRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import 'swiper/css';
import 'swiper/css/navigation';
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
