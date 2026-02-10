import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import PaymentSuccess from "../pages/PaymentSuccess";
import AddProducts from "../pages/AddProducts";
import Checkout from "../pages/Checkout";
import About from "../pages/About";
import Contact from "../pages/Contact";

import PrivateRoute from "../components/PrivateRoute";
import ActivateAccount from "../components/Registration/ActivateAccount";
import ResendEmail from "../components/Dashboard/Profile/ResendEmail";
import ForgetPassword from "../components/Dashboard/Profile/ForgetPassword";
import ResetPasswordConfirm from "../components/Dashboard/Profile/ResetPasswordConfirm";
import ProductDetail from "../pages/ProductDetail";
import Welcome from "../pages/Welcome";

const AppRoute = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        {/* entry point is the welcome page */}
        <Route index element={<Welcome />} />

        {/* Protected Core Pages */}
        <Route path="home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="shop" element={<PrivateRoute><Shop /></PrivateRoute>} />
        <Route path="shop/:productId" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
        <Route path="about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="contact" element={<PrivateRoute><Contact /></PrivateRoute>} />

        {/* Auth Pages (Public) */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="resend-activation" element={<ResendEmail />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
        <Route path="activate/:uid/:token" element={<ActivateAccount />} />
      </Route>

      {/* Private Routes */}
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment/success" element={<PaymentSuccess />} />
        <Route path="products/add" element={<AddProducts />} />
      </Route>

      {/* Standalone Private Routes utilizing Dashboard Layout */}
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Profile />} />
      </Route>
    </Routes>
  );
};
export default AppRoute; 
