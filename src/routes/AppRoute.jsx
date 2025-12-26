import { Routes, Route, Router } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard"
import PrivateRoute from "../components/PrivateRoute";
import ActivateAccount from "../components/Registration/ActivateAccount";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Profile";
import ResendEmail from "../components/Dashboard/Profile/ResendEmail";
import ForgetPassword from "../components/Dashboard/Profile/ForgetPassword";
import ResetPasswordConfirm from "../components/Dashboard/Profile/ResetPasswordConfirm";

const AppRoute = () => {
  return (
    // Public Route 
    <Routes>

      <Route element={<MainLayout></MainLayout>}>
        <Route path="/" element={<Home></Home>}></Route>

        <Route path="shop" element={<Shop />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="resend-activation" element={<ResendEmail />}></Route>
        <Route path="forget-password" element={<ForgetPassword/>} ></Route>
        <Route path="password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
        <Route path="activate/:uid/:token" element={<ActivateAccount />} />



      </Route>

{/* 
        PrivateROute */}
        <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        }
        >
          <Route index element={<Dashboard/>}></Route>
          <Route path="profile" element={<Profile/>}></Route>

        </Route>
    


    </Routes>
  );
};

export default AppRoute;


