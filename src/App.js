import "./App.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Emp_list from "./pages/Employees/EmpMainPage";
import Role_list from "./pages/Roles/RoleMainPage";
import Team_list from "./pages/Teams/TeamMainPage";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom"; 
import NotFoundPage from "./pages/PageNotFound";
import LoginPage from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import EmpSetting from "./pages/EmpSetting";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { createGetRequest } from "./global/helper";
import { clearUser, setUser } from "./redux/userSlice";
import LoaderComponent from "./components/Loader"

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await createGetRequest('/api/user/me/info/');
        if (response.status === 200) 
          dispatch(setUser(response));
       else 
          clearUser();
      
      } catch (error) {
      }
      setIsLoading(false);
    }

    fetchData(); 
  }, [dispatch]); 

  if (isLoading) {
    return <LoaderComponent pageloader={true}/>;
  }
  else
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword name="Reset Password?" description="Your new password must be different from previously used passwords"/>} />
        <Route path="/setup-password/:id" element={<ResetPassword name="Setup Password" description="Setup your new account and start using portal today"/>} />
        <Route path="/portal" element={<Topbar />}>
          {user.isAuthenticated ? (
            <>
              <Route path="iam" element={<Sidebar />}>
                <Route path="employee" element={<Emp_list />} />
                <Route path="role" element={<Role_list />} />
                <Route path="team" element={<Team_list id={2} />} />
                <Route path="department" element={<Team_list id={1} />} />
                <Route path="settings" element={<EmpSetting />} />
              </Route>
            </>
          ) : (
            <Route path="*" element={<NavigateToLogin />} />
          )}
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

function NavigateToLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return null;
}

export default App;
