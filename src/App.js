import "./App.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Emp_list from "./pages/Emp_list";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 

import LoginPage from "./pages/Login";
function App() {
  return (
    
      <Router>
        <Routes>
         <Route path="/login" element={<LoginPage />} />
           <Route path="/portal/iam" element={<RenderComponents />}></Route>
          
        </Routes>
      </Router>
  );
}

  const RenderComponents = () => (
    <>
    {/* <Sidebar> */}
      <Emp_list />
      <Sidebar/>
      <Topbar />
    {/* </Sidebar> */}
  </>
  );

export default App;
