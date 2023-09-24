import "./App.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Emp_list from "./pages/Employees/EmpMainPage";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; 
import NotFoundPage from "./pages/PageNotFound";
import LoginPage from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/f" element={<ForgetPassword />} />
        <Route path="/portal" element={<Topbar />}>
          <Route path="iam" element={<Sidebar />}>
            <Route path="employee" element={<Emp_list />} />
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
