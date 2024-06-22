import "./App.css";

import Sidebar from "./components/Sidebar";
import { IAMSidebarData } from "./SideBarData/IAM";
import { AMSidebarData } from "./SideBarData/AM";
import { ATSSidebarData } from "./SideBarData/ATS";
import { SelfServiceSidebarData } from "./SideBarData/SS";

import Topbar from "./components/Topbar";
import Emp_list from "./pages/IAM/Employees/EmpMainPage";
import Role_list from "./pages/IAM/Roles/RoleMainPage";
import Team_list from "./pages/IAM/Teams/TeamMainPage";
import TeamView from "./pages/IAM/TeamView/TeamViewMainPage";
import Announcement_list from "./pages/IAM/Announcement/AnnouncementMainPage";
import Survey_list from"./pages/IAM/Surveys/SurveyMainPage";
import Attendance_list from "./pages/AM/Attedance/AttendanceMainPage";
import Shift_list from "./pages/AM/Shift/ShiftMainPage";
import Holiday_list from "./pages/AM/Holiday/HolidayMainPage";
import AllotedLeaves_list from "./pages/AM/AllotLeaves/AllotLeaveMainPage";
import AppliedLeaves_list from "./pages/AM/AppliedLeaves/AppliedLeaveMainPage";
import  SelfServiceAttendance_list from "./pages/SS/Attedance/AttendanceMainPage";
import SelfServiceAppliedLeaves_list from "./pages/SS/AppliedLeaves/AppliedLeaveMainPage";

import JobPost_list from "./pages/ATS/JobPost/JobPostMainPage";
import Candidate_list from "./pages/ATS/Candidate/CandidateMainPage";
import Interview_list from "./pages/ATS/Interview/InterviewMainPage";
import Offer_list from "./pages/ATS/Offer/OfferMainPage";
import FormBuilder from "./pages/Global/FormBuilder"
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom"; 
import NotFoundPage from "./pages/PageNotFound";
import LoginPage from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import EmpSetting from "./pages/EmpSetting";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { createGetRequest } from "./global/requests";
import { clearUser, setUser } from "./redux/userSlice";
import LoaderComponent from "./components/Loader";
import CardsPopup from "./pages/CardsPopup";
import Board from "./pages/PM/Board";
import Calendar from "./pages/PM/Calendar";
import SelfService from "./components/EmpProfileMainPage";
import EmpDashBoard from "./pages/IAM/EmpDashBoard/EmpDashBoard";
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user.isAuthenticated)
    {
      if (location.pathname.includes('projectmanagement'))
        document.body.style.backgroundColor = theme.projectManagement.backgroundColor;
      else
        document.body.style.backgroundColor = theme.default.backgroundColor;
    }
  })

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
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
         <Route path="/cards" element={<CardsPopup />} />
        
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword name="Reset Password?" description="Your new password must be different from previously used passwords"/>} />
        <Route path="/setup-password/:id" element={<ResetPassword name="Setup Password" description="Setup your new account and start using portal today"/>} />
        <Route path="/portal" element={<Topbar />}>
          {user.isAuthenticated ? (
            <>
              <Route path="iam" element={<Sidebar  SidebarData={IAMSidebarData} heading={"Employee Management"}/>}>
                <Route path="dashboard" element={<EmpDashBoard />} /> 
                <Route path="employee" element={<Emp_list />} />
                <Route path="role" element={<Role_list />} />
                <Route path="team" element={<Team_list id={2} />} />
                <Route path="department" element={<Team_list id={1} />} />
                <Route path="settings" element={<EmpSetting />} /> 
                <Route path="surveys" element={<Survey_list/>} />          
                <Route path="team/:teamId" element={<TeamView id={2} />} />
                <Route path="department/:teamId" element={<TeamView id={1} />} />
                <Route path="announcement" element={<Announcement_list />} />
                <Route path="form/:type/:id?" element={<FormBuilder isRead={false} />} />
                <Route path="settings" element={<EmpSetting />} />           
              </Route>

              <Route path="projectmanagement" element={<Sidebar SidebarData={IAMSidebarData} heading={"Project Management"} />}>
                <Route path="board" element={<Board />} />  
                {/* <Route path="board" element={<Calendar />} /> */}
              </Route>

              <Route path="selfservice" element={<Sidebar SidebarData={SelfServiceSidebarData} heading={"Self Service"} /> }>
                {/* <Route path="Mainpage" element={<SelfService />} /> */}
                <Route path="attendance" element={<SelfServiceAttendance_list />} />
                <Route path="leaves" element={<SelfServiceAppliedLeaves_list />} />
              </Route>
              
              <Route path="attedancemanagement" element={<Sidebar   SidebarData={AMSidebarData}  heading={"Attendance Management"}/>}>
                <Route path="attendance" element={<Attendance_list />} />
                <Route path="assignLeaves" element={<AllotedLeaves_list />} />
                <Route path="appliedLeaves" element={<AppliedLeaves_list />} />
                <Route path="shift" element={<Shift_list />} />
                <Route path="holiday" element={<Holiday_list />} />
              </Route>

              <Route path="applicationtrackingsystem" element={<Sidebar   SidebarData={ATSSidebarData}  heading={"Application Tracking System"}/>}>
                <Route path="jobPosting" element={<JobPost_list />} />
                <Route path="candidate" element={<Candidate_list />} />
                <Route path="interview" element={<Interview_list />} />
                <Route path="offer" element={<Offer_list />} />
              
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
