import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import AuthLayout from "./AuthLayout";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";

import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import UserAuthLayout from "./utils/UserAuthLayout";
import UserVerify from "./pages/UserVerify";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./utils/AdminLayout";
import AdminPersistsLogin from "./components/AdminPersisLogin";
import UserPersistsLogin from "./components/UserPersisLogin";
import ScanQR from "./pages/ScanQR";

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
