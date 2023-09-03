import './App.css';
import MultiStepForm from './pages/MultiStepForm';
import { GlobalStyle } from './pages/multistepformstyling';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar'
import Emp_list from './pages/Emp_list';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch



import LoginPage from './pages/Login';
function App() {
  return (
    
    <Router>
    <Routes>
      {/* Define the /login route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Define the /portal route */}
      <Route path="/portal" element={<Topbar />}>
        {/* Render /portal/iam */}
        <Route index element={<Sidebar />} />
        {/* Render /portal/iam/employee */}
        <Route path="employee" element={<Emp_list />} />
      </Route>
    </Routes>
  </Router>
);
}


export default App;