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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal/iam" element={<RenderComponents />}></Route>
      </Routes>
    </Router>
  );
}

const RenderComponents = () => (
  <>
    <Emp_list/>
    <Sidebar />
    <Topbar />
    
  </>
);


export default App;