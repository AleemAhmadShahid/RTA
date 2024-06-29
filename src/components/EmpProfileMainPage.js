import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { CenteredContainer } from "../styles/TableStyling";
import { Box } from "../pages/ForgetPassword";
import { useNavigate } from "react-router-dom";
import { SaveAndNextButton } from "../styles/MultiStepFormStyling";
import { ColumnContainer, LeftColumn, RightColumn } from "../pages/EmpSetting";
import { FaBriefcase } from "react-icons/fa";
// import { UploadBox } from "../../styles/MultiStepFormStyling";
import { AiOutlineUser,AiOutlineTeam,AiOutlineProject  } from "react-icons/ai";
import { PiCrownSimple } from "react-icons/pi";
import { MdDone } from "react-icons/md";
import { CiFlag1 } from "react-icons/ci";
import { IoLanguageOutline } from "react-icons/io5";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { StyledButton } from "../pages/EmpSetting";
import { ButtonContainer } from "../pages/EmpSetting";
import { IoMdArrowBack } from "react-icons/io";
import { FiLink } from "react-icons/fi";
import Timeline from "@mui/lab/Timeline";

import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import Typography from "@mui/material/Typography";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import { createGetRequest } from "../global/requests";

import InfoBox from "./Cards";
import { FiUserX } from "react-icons/fi";
import { useParams } from "react-router-dom";

import EmployeeCard  from "./EmployeeCard";
import {ScrollContainer, DashBoardCompBox} from "../pages/IAM/EmpDashBoard/EmpDashBoard";

import Switch from "./Switch";
const BackgroundWallpaper = styled.div`
  height: 180px;
  margin-top: 0px;
  background: blue;
  border-radius: inherit;
  position: relative;
  background-image: url("/login.jpg");
`;
export const BoxContainer = styled.div`
  border-radius: 5px;
  background: #ffffff;
  margin-top: 20px;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  margin-bottom: 10px;
`;
export const UploadBox = styled.div`
  background-color: #ededed;
  padding: 5px;
  border: 5px solid white;
  border-radius: 5px;
  background-image: url("/Shaheer.jpeg");
  background-size: cover;
  background-position: center;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  margin-right: 20px;
  
  transform: ${({ transform }) => transform || "translateY(-50%)"};
`;

export const UploadContainer = styled.div`
  background: blue;
  padding: 5px;
  width: {
  }
`;
const Icon = styled.div`
  display: flex;
  margin-right: 10px;
`;

const Subtitle = styled.h6`
  margin: 0;
  margin-right: 20px;
  font-weight:400;
`;
export const GreyHeading = styled.h6`
  color: grey;
  font-size: 14px;
`;
export const Details = styled.h6`
  font-size: 14px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  font-weight:400;
`;
export const DetailContainer = styled.div`
  display: flex;
  //   align-items: center;
  margin-bottom: 15px;
`;

const slide = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(20px);
  }
`;
const BackIcon = styled.div`
  position: absolute;
  background-color: white;
  padding: 10px;
  width: 40px;
 border-radius: 10px;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease;
  left: 10px;
  top: 10px; 

  &:hover {
    color: white;
    background-color: #ffa500;
    animation: ${slide} 0.3s forwards;
  }
`;

const AttedanceManagement = (team) => {
  

  return (
    <>
      <br></br>
      <ScrollContainer>
        <DashBoardCompBox style={{ marginRight: "10px" }}>
          <EmployeeCard name="Shaheer Imran" role="Banana Eater" />
        </DashBoardCompBox>
        <DashBoardCompBox style={{ marginRight: "10px" }}>
          <EmployeeCard name="Muhammad Shaheer" role="Banana Eater" />{" "}
        </DashBoardCompBox>
        <DashBoardCompBox style={{ marginRight: "10px" }}>
          <EmployeeCard name="Shaheer " role="Banana Eater" />
        </DashBoardCompBox>
        <DashBoardCompBox style={{ marginRight: "10px" }}>
          <EmployeeCard name="Imran" role="Banana Eater" />
        </DashBoardCompBox>

        <DashBoardCompBox style={{ marginRight: "10px" }}>
          <EmployeeCard name="Shaheer Imran" role="Banana Eater" />
        </DashBoardCompBox>
        <DashBoardCompBox style={{ marginRight: "10px" }}>
          <EmployeeCard name="Shaheer Imran" role="Banana Eater" />
        </DashBoardCompBox>
      </ScrollContainer>
  </>
  );
};


const Team = (team) => {
  

  return (
    <>
      <br></br>
      <ScrollContainer>
        <DashBoardCompBox style={{ marginRight: "10px" }}>
          <EmployeeCard name="Shaheer Imran" role="Banana Eater" />
        </DashBoardCompBox>
        <DashBoardCompBox style={{ marginRight: "10px" }}>
          <EmployeeCard name="Muhammad Shaheer" role="Banana Eater" />{" "}
        </DashBoardCompBox>
        <DashBoardCompBox style={{ marginRight: "10px" }}>
          <EmployeeCard name="Shaheer " role="Banana Eater" />
        </DashBoardCompBox>
        <DashBoardCompBox style={{ marginRight: "10px" }}>
          <EmployeeCard name="Imran" role="Banana Eater" />
        </DashBoardCompBox>

        <DashBoardCompBox style={{ marginRight: "10px" }}>
          <EmployeeCard name="Shaheer Imran" role="Banana Eater" />
        </DashBoardCompBox>
        <DashBoardCompBox style={{ marginRight: "10px" }}>
          <EmployeeCard name="Shaheer Imran" role="Banana Eater" />
        </DashBoardCompBox>
      </ScrollContainer>
  </>
  );
};


const Profile = (employee) => {
  
  const customTextStyle = {
    color: "grey",
  };
  
  useEffect(() => {
    console.log('Employee state:', employee); 
  }, [employee]);
  
  return (
    <>
      <ColumnContainer>
        <LeftColumn>
          <BoxContainer>
            <Box>
              <GreyHeading>ABOUT</GreyHeading>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <DetailContainer>
                  <AiOutlineUser />
                  <Details>Full Name: {employee ? employee.name : "Loading..."}</Details>
                </DetailContainer>
                <DetailContainer>
                  <MdDone />
                  <Details>Status:{employee.status}</Details>
                </DetailContainer>
                <DetailContainer>
                  <PiCrownSimple />
                  <Details>Role: a</Details>
                </DetailContainer>
                <DetailContainer>
                  <CiFlag1 />
                  <Details>Country: Pakistan</Details>
                </DetailContainer>
                <DetailContainer>
                  <IoLanguageOutline />
                  <Details>Language: Urdu</Details>
                </DetailContainer>
              </div>
              <GreyHeading>Contacts</GreyHeading>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <DetailContainer>
                  <MdOutlinePhoneInTalk />
                  <Details>Contact: (123)456-7890</Details>
                </DetailContainer>
              </div>
            </Box>
          </BoxContainer>
        </LeftColumn>

        <RightColumn style={{ flex: "2" }}>
          <BoxContainer>
            <Box>
              <GreyHeading style={{marginBottom:"30px"}} >Onboarding </GreyHeading>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{display:"flex"}}>
                <Switch />
                <Details style={{fontSize:"16px",fontWeight:"500"}}> Office Tour</Details>
              </div>
              100%
              
              </div><hr/>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{display:"flex"}}>
                <Switch />
                <Details style={{fontSize:"16px",fontWeight:"500"}}> Management</Details>
              </div>
              100%
              
              </div><hr/><div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{display:"flex"}}>
                <Switch />
                <Details style={{fontSize:"16px",fontWeight:"500"}}> Work Tools</Details>
              </div>
              100%
              
              </div><hr/>
            </Box>
          </BoxContainer>
          {/* <BoxContainer>
            <Box>
              <h5>Activity TimeLine</h5>
              <Timeline
                sx={{
                  [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                  },
                }}
              >
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="secondary" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    12 invoices have been paid
                    <Typography style={customTextStyle}>
                      Invoces have been paid to the company
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="success" />
                  </TimelineSeparator>
                  <TimelineContent>Client meeting</TimelineContent>
                </TimelineItem>
              </Timeline>
            </Box>
          </BoxContainer> */}
        </RightColumn>
      </ColumnContainer>
    </>
  );
};

const EmpProfile = ({}) => {
  const [currentPage, setCurrentPage] = useState("Profile");
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState();
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await createGetRequest(`/api/user/${employeeId}`);
        if (data.status == 200) setEmployee(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  const renderContent = () => {
    if (currentPage === "Profile") {
      return (
        <>
          <Profile employee={employee} />
        </>
      );
    } else if (currentPage === "Team") {
      return (<>
          <Team/>
        </>);
    } 
    else if (currentPage === "AttedanceManagement")  {
      return (<>
        <Team/>
      </>)
    }
    else if (currentPage === "Connections") {
      return;
    }
  };
  return (
    <CenteredContainer>
      <BoxContainer>
        <BackgroundWallpaper>
          <BackIcon
            onClick={() => navigate(`/portal/iam/employee`)}           
          >
            {" "}
            <IoMdArrowBack />
          </BackIcon>
        </BackgroundWallpaper>

        <Box style={{ height: "120px", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <UploadBox />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
                flex: 1,
                marginTop: "-40px",
              }}
            >
              <h5 style={{ margin: 0,fontWeight:"400" }}>{employee ? employee.name : "Loading..."}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon>
                      <FaBriefcase />
                    </Icon>
                    <Subtitle>UX designer</Subtitle>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon>
                      <FaBriefcase />
                    </Icon>
                    <Subtitle>BackEnd</Subtitle>
                  </div>
                </div>
                <SaveAndNextButton style={{ marginLeft: "auto" }}>
                  Connected
                </SaveAndNextButton>
              </div>
            </div>
          </div>
        </Box>
      </BoxContainer>

      <ButtonContainer>
        <StyledButton
          currentPage={currentPage}
          page="Profile"
          onClick={() => setCurrentPage("Profile")}
        >
          <AiOutlineUser />
          Profile
        </StyledButton>
        <StyledButton  currentPage={currentPage}  page="Team" onClick={() => setCurrentPage("Team")}>
          Team
        </StyledButton>
        {/* <StyledButton  currentPage={currentPage}  page="Schedule" onClick={() => setCurrentPage("Schedule")}>
          Schedule
        </StyledButton>
        <StyledButton page="AttedanceManagement"  currentPage={currentPage} onClick={() => setCurrentPage("AttedanceManagement")}>
          Attedance Management
        </StyledButton>
        <StyledButton page="ProjectManagement"  currentPage={currentPage} onClick={() => setCurrentPage("ProjectManagement")}>
          Project Management
        </StyledButton>
        <StyledButton page="RemoteTracking"  currentPage={currentPage} onClick={() => setCurrentPage("RemoteTracking")}>
          RemoteTracking
        </StyledButton>
        <StyledButton page="Performance"  currentPage={currentPage} onClick={() => setCurrentPage("Performance")}>
          Performance
        </StyledButton>
        <StyledButton page="Team" onClick={() => setCurrentPage("Team")}>
        <AiOutlineTeam />
          Team
        </StyledButton>
        <StyledButton page="Project" onClick={() => setCurrentPage("Project")}>
          <AiOutlineProject />
          Project
        </StyledButton>
        <StyledButton
          page="Connection"
          onClick={() => setCurrentPage("Connection")}
        >
          <FiLink />
          Connection
        </StyledButton> */}
      </ButtonContainer>

      {renderContent()}
    </CenteredContainer>
  );
};
export default EmpProfile;
