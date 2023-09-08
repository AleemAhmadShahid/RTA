import "./App.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Emp_list from "./pages/Emp_list";
import Resetpassword from "./pages/Resetpassword"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 

import LoginPage from "./pages/Login";
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/portal" element={<Topbar />}>
        <Route path="iam" element={<Sidebar />}>
          <Route path="employee" element={<Emp_list />} />
        </Route>
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
