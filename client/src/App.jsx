import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import AuthLayout from "./AuthLayout";
import Home from "./pages/Home";

import UserPersistsLogin from "./components/UserPersisLogin";
import UserSignup from "./pages/UserSignup";
import UserAuthLayout from "./utils/UserAuthLayout";
import UserLogin from "./pages/UserLogin";
import UserVerify from "./pages/UserVerify";
import ScanQR from "./pages/ScanQR";

import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminLayout from "./utils/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPersistsLogin from "./components/AdminPersisLogin";

const App = () => {
  return (
    <Routes>
      <Route element={<UserPersistsLogin />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route element={<AdminPersistsLogin />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/signup" element={<AdminSignup />} />

        <Route path="user" element={<UserAuthLayout />}>
          <Route path="login" element={<UserLogin />} />
          <Route path="login/qrcode" element={<ScanQR />} />
          <Route path="verify" element={<UserVerify />} />
        </Route>
        <Route path="user/signup" element={<UserSignup />} />
      </Route>
    </Routes>
  );
};
export default App;
