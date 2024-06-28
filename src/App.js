import "./App.css";

import Sidebar from "./components/Sidebar";
import { IAMSidebarData } from "./SideBarData/IAM";
import { AMSidebarData } from "./SideBarData/AM";
import { ATSSidebarData } from "./SideBarData/ATS";
import { SelfServiceSidebarData } from "./SideBarData/SS";
import { PMSidebarData } from "./SideBarData/PM";
import {MMSidebarData} from "./SideBarData/MM";
import { RTSidebarData } from "./SideBarData/RT";


import Topbar from "./components/Topbar";
import Emp_list from "./pages/IAM/Employees/EmpMainPage";
import Role_list from "./pages/IAM/Roles/RoleMainPage";
import ViewRole from "./pages/IAM/Roles/ViewRole";
import JobDescription_list from "./pages/IAM/JobDescription/JobDescriptionMainPage";
import PerformanceEvaluation_list from "./pages/IAM/PerformanceEvaluation/PerformanceEvaluationMainPage";
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
import FormResponseView from "./pages/Global/FormResponseView";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom"; 
import NotFoundPage from "./pages/PageNotFound";
import LoginPage from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import EmpSetting from "./pages/EmpSetting";
import CompanyPolicy from "./pages/CompanyPolicy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { createGetRequest } from "./global/requests";
import { clearUser, setUser } from "./redux/userSlice";
import LoaderComponent from "./components/Loader";
import CardsPopup from "./pages/CardsPopup";
import Board from "./pages/PM/Board";
import Calendar from "./pages/PM/Calendar";
import EmpProfile from "./components/EmpProfileMainPage";

import ATSDashBoard from "./pages/ATS/ATSDashBoard/ATSDashBoard";
import EmpDashBoard from "./pages/IAM/EmpDashBoard/EmpDashBoard";
import AMDashBoard from "./pages/AM/AMDashBoard/AMDashboard";
import SSDashBoard from "./pages/SS/SSDashBoard/SSDashboard";

import PMMainPage from "./pages/PM/PMMainPage";
import MeetingMainaPage from "./pages/MM/MeetingMainPage";
import RemoteTrackingMainPage from "./pages/RT/RemoteTrackingMainPage";
import MeetingdetailPage from "./pages/MM/MeetingDetailPage";


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
                <Route path="employee/:employeeId" element={<EmpProfile />} />
                <Route path="role/:id" element={<ViewRole />} />
                <Route path="role" element={<Role_list />} />
                <Route path="team" element={<Team_list id={2} />} />
                <Route path="department" element={<Team_list id={1} />} />
                <Route path="jobDescription" element={<JobDescription_list />} />
                <Route path="performanceEvaluation" element={<PerformanceEvaluation_list />} />
                <Route path="settings" element={<EmpSetting />} /> 
                <Route path="surveys" element={<Survey_list/>} />          
                <Route path="team/:teamId" element={<TeamView id={2} />} />
                <Route path="department/:teamId" element={<TeamView id={1} />} />
                <Route path="announcement" element={<Announcement_list />} />
                <Route path="form/:type/:id?" element={<FormBuilder isRead={false} />} />
                <Route path="form/:type/:id/response/view" element={<FormResponseView/>} />
                <Route path="settings" element={<EmpSetting />} /> 
                <Route path="companyPolicy" element={<CompanyPolicy />} />           
              </Route>

              <Route path="projectmanagement" element={<Sidebar SidebarData={PMSidebarData} heading={"Project Management"} />}>
                 <Route path="Board" element={<PMMainPage />} />   
                {/* <Route path="board" element={<Calendar />} />  */}
              </Route>

              <Route path="selfservice" element={<Sidebar SidebarData={SelfServiceSidebarData} heading={"Self Service"} /> }>
              <Route path="dashboard" element={<SSDashBoard />} />
                <Route path="attendance" element={<SelfServiceAttendance_list />} />
                <Route path="leaves" element={<SelfServiceAppliedLeaves_list />} />
              </Route>
              
              <Route path="attedancemanagement" element={<Sidebar   SidebarData={AMSidebarData}  heading={"Attendance Management"}/>}>
                <Route path="dashboard" element={<AMDashBoard />} /> 
                <Route path="attendance" element={<Attendance_list />} />
                <Route path="assignLeaves" element={<AllotedLeaves_list />} />
                <Route path="appliedLeaves" element={<AppliedLeaves_list />} />
                <Route path="shift" element={<Shift_list />} />
                <Route path="holiday" element={<Holiday_list />} />
              </Route>

              <Route path="applicationtrackingsystem" element={<Sidebar   SidebarData={ATSSidebarData}  heading={"Application Tracking System"}/>}>
              <Route path="dashboard" element={<ATSDashBoard />} /> 
                <Route path="jobPosting" element={<JobPost_list />} />
                <Route path="candidate" element={<Candidate_list />} />
                <Route path="interview" element={<Interview_list />} />
                <Route path="offer" element={<Offer_list />} />
              
              </Route>
              <Route path="meetingmanagemnetsystem" element={<Sidebar   SidebarData={MMSidebarData}  heading={"Meeting Management"}/>}>
                <Route path="Meeting" element={<MeetingMainaPage />} />
                <Route path="meeting/:meetingId" element={<MeetingdetailPage/>} />
                
               
              </Route>

              <Route path="remotetracking" element={<Sidebar SidebarData={RTSidebarData} heading={"Remote Tracking"} />}>
                 <Route path="board" element={<RemoteTrackingMainPage />} />   
                {/* <Route path="board" element={<Calendar />} />  */}
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
