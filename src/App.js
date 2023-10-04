import "./App.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Emp_list from "./pages/Employees/EmpMainPage";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; 
import NotFoundPage from "./pages/PageNotFound";
import LoginPage from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import EmpSetting from "./pages/EmpSetting";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword name="Reset Password?" description="Your new password must be different from previously used passwords"/>} />
        <Route path="/setup-password/:id" element={<ResetPassword name="Setup Password" description="Setup your new account and start using portal today"/>} />
        <Route path="/portal" element={<Topbar />}>
          <Route path="iam" element={<Sidebar />}>
             {/* <Route path="employee" element={<Emp_list />} />  */}
            <Route path="setting" element={<EmpSetting />} /> 
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <NotFoundPage
              message="Page not found"
              description="Oops!😞 The requested URL was not found on this server"
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
