import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  AiOutlineBell,
  AiOutlineSetting,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineMail,
  AiOutlineFileText,
  AiOutlineSearch,
  AiOutlineDashboard,
  AiOutlinePieChart,
  AiOutlineAppstore,
  AiOutlineLogout,
  AiOutlineMenu,
} from "react-icons/ai";
import { CgMenuGridR,CgMenuRight  } from "react-icons/cg";
import { clearUser } from "../redux/userSlice";
import Sidebar from "./Sidebar";
import { MdOutlinePolicy } from "react-icons/md";
const Nav = styled.div`
  background: #ffffff;
  height: 57px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #000000;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  position: fixed;

  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  @media (min-width: 1200px) {
    
    width: 79.4%;
    top: 2.5%;
    left: 273px;
  }

  border-radius: 5px;
  z-index: 12;
`;

const SimpleText = styled.span`
  font-size: 16px;
  margin-right: 10px;
`;


const SettingIcon = styled(AiOutlineSetting)`
  font-size: 20px;
  margin-right: 13px;
  margin-left: 10px;
  cursor: pointer;
`;


const PolicyIcon = styled(MdOutlinePolicy)`
  font-size: 20px;
  margin-right: 13px;
  margin-left: 10px;
  cursor: pointer;
`;
const BellIcon = styled(AiOutlineBell)`
  font-size: 20px;
  cursor: pointer;
  margin-left: 13px;
`;



const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 70%;
  margin-top: 10px;
  display: flex;
  justify-content: left;
  background: #ffffff;
  border: 0px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  width: 30%;  
  padding: 10px;
  @media screen and (max-width: 845px) {
    position: absolute;
    right: auto;
    width: 90%;
  }
`;
const slide = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(20px);
  }
`;
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;
const DropdownButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 5px;
  padding: 13px 16px;
  cursor: pointer;
  border-radius: 30%;
  transition: background-color 0.3s ease;
  svg {
    font-size: 20px;
  }
  &:hover {
     background-color: #ffa500;
    color:white;
  //  animation: ${slide} 0.7s forwards;
   animation: ${bounce} 2s infinite;

  }
`;
const DropdownGrid = styled.div`
  display: grid;
  left: 0;
  margin-top: 1px;
  margin-bottom: 5px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  justify-items: center;
  align-items: center;

  text-align: center;

  padding: 10px;
`;
const SettingDropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0%; 
  margin-top: 10px;
  display: flex;
  justify-content: left;
  background: #ffffff;
  border: 0px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  width: 15%;
  padding: 10px;
  @media screen and (max-width: 845px) {
    position: absolute;
    
    width: 50%;
    right: 20px;
  }
  z-index: 1000;
`;

const SettingDropdownButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: none;
  width: 100%; 
  border-radius: 5px;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;
  svg {
    font-size: 20px;
  }
  &:hover {
    background-color: #ffa500;
    color: white;
  }
  @media screen and (max-width: 845px) {
    width: 100%;
  }
`;

const DropdownLabel = styled.div`
  font-size: 14px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  height: 40px;
`;
const SettingDropdownGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  text-align: center;
  padding: 2px;
  margin-bottom: 2px;
`;

const SettingDropdownItem = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  gap: 10px;
`;
const Sidebariconcontainer = styled.div`
  display: none;
  @media screen and (max-width: 845px) {
    display: block;
  }
`;



const MenuIcon = styled(CgMenuGridR)`
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
 
`;









const SideMenu = styled(AiOutlineMenu)`
  font-size: 20px;
  margin-right: 13px;
  margin-left: 10px;
  cursor: pointer;
  
  left: ${({ sidebar }) => (sidebar ? "250px" : "20px")};
  background-color: #ffffff;
  
 

  @media (max-width: 845px) {
    display: block; 
  }
`;





export const MobileIcon = styled.div`
font-size: 20px;
margin-right: 10px;
margin-left: 10px;
cursor: pointer;

left: ${({ sidebar }) => (sidebar ? "250px" : "20px")};
background-color: #ffffff;



@media (max-width: 845px) {
  display: block; 
}
`;




const Topbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user);

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    } else {
      setIsDropdownOpen(true);
      setIssettingDropdownOpen(false); 
    }
  };
  
  const [issettingDropdownOpen, setIssettingDropdownOpen] = useState(false);

  const togglesettingDropdown = () => {
    setIssettingDropdownOpen(!issettingDropdownOpen);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [sidebar, setSidebar] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const dropdownRef = useRef(null);
  const settingsRef = useRef(null);
  
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target))
     setIsDropdownOpen(false);
    if (settingsRef.current && !settingsRef.current.contains(event.target))
     setIssettingDropdownOpen(false);
  };

  useEffect(() => {

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <>
      <Outlet />
      <Nav>
        <IconContainer>
        <Sidebariconcontainer>
            <MobileIcon sidebar={sidebar} onClick={toggleSidebar}> <CgMenuRight/></MobileIcon>
          </Sidebariconcontainer>
          <MenuIcon onClick={toggleDropdown} />
          <DropdownContainer isOpen={isDropdownOpen}  ref={dropdownRef}>
            <DropdownGrid>
              <div onClick={() => {setIsDropdownOpen(false);  navigate('/portal/selfservice/dashboard');}}>
                <DropdownButton>
                  <AiOutlineHome />
                </DropdownButton>
                <DropdownLabel>Self Service Portal</DropdownLabel>
              </div>
              <div onClick={() => {setIsDropdownOpen(false);  navigate('/portal/iam/dashboard');}}>
                <DropdownButton>
                  <AiOutlineUser />
                </DropdownButton>
                <DropdownLabel>Employee Management</DropdownLabel>
              </div>
              <div>
                <DropdownButton>
                  <AiOutlineCalendar />
                </DropdownButton>
                <DropdownLabel>Payroll Management</DropdownLabel>
              </div>
              <div  onClick={() => {setIsDropdownOpen(false);  navigate('/portal/attedancemanagement/dashboard');}}>
                <DropdownButton>
                  <AiOutlineMail />
                </DropdownButton>
                <DropdownLabel>Attendance Management</DropdownLabel>
              </div>
              <div  onClick={() => {setIsDropdownOpen(false);  navigate('/portal/applicationtrackingsystem/dashboard');}}>
                <DropdownButton>
                  <AiOutlineFileText />
                </DropdownButton>
                <DropdownLabel>ATS</DropdownLabel>
              </div>
              <div onClick={() => {setIsDropdownOpen(false); navigate('/portal/projectmanagement/board')}} >
                <DropdownButton>
                  <AiOutlineSearch />
                </DropdownButton>
                <DropdownLabel>Project Management</DropdownLabel>
              </div>
              <div onClick={() => {setIsDropdownOpen(false); navigate('/portal/remotetracking/board')}}>
                <DropdownButton>
                  <AiOutlinePieChart />
                </DropdownButton>
                <DropdownLabel>Remote Tracking</DropdownLabel>
              </div>
              <div  onClick={() => {setIsDropdownOpen(false); navigate('/portal/meetingmanagemnetsystem/Meeting')}}>
                <DropdownButton>
                  <AiOutlineAppstore />
                </DropdownButton>
                <DropdownLabel>Meeting Management</DropdownLabel>
              </div>
            </DropdownGrid>
          </DropdownContainer>
          
        </IconContainer>
        <IconContainer>
          <BellIcon />
          <SettingIcon onClick={togglesettingDropdown} />
          <SettingDropdownContainer isOpen={issettingDropdownOpen}  ref={settingsRef}>
            <SettingDropdownGrid>
              <SettingDropdownItem>
                <SettingDropdownButton
                  onClick={() => {setIssettingDropdownOpen(false);  navigate("/portal/iam/settings");}}
                >
                  <AiOutlineSetting />
                  <span>Settings</span>
                </SettingDropdownButton>
              </SettingDropdownItem>
              <SettingDropdownItem>
                <SettingDropdownButton
                  onClick={() => {setIssettingDropdownOpen(false);  navigate("/portal/iam/companyPolicy");}}
                >
                  <MdOutlinePolicy />
                  <span>Company Policy</span>
                </SettingDropdownButton>
              </SettingDropdownItem>
              <SettingDropdownItem
                onClick={() => {
                  dispatch(clearUser());
                  localStorage.setItem("token", "");
                  navigate("/login");
                }}
              >
                <SettingDropdownButton>
                  <AiOutlineLogout />
                  <span>Logout</span>
                </SettingDropdownButton>
              </SettingDropdownItem>
             
            </SettingDropdownGrid>
          </SettingDropdownContainer>

          <SimpleText>{user?.user?.name}</SimpleText>
        </IconContainer>
      </Nav>
    </>
  );
};

export default Topbar;
