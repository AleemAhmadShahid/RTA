import React, { useState } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

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
} from "react-icons/ai";
import { CgMenuGridR } from "react-icons/cg";

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
    /* Width for desktop view */
    width: 79.1%;
    top: 2.5%;
    left: 273px;
  }

  border-radius: 5px;
  
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

const BellIcon = styled(AiOutlineBell)`
  font-size: 20px;
  cursor: pointer;
  margin-left: 13px;
`;

const MenuIcon = styled(CgMenuGridR)`
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
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

const DropdownButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 5px;
  padding: 13px 16px;
  cursor: pointer;
  border-radius: 90%;
  transition: background-color 0.3s ease;
  svg {
    font-size: 20px;
  }
  &:hover {
    background-color: #ffa500;
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
  height: 50px;
`;

const Topbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user);
 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <Outlet />
      <Nav>
        <IconContainer>
          <MenuIcon onClick={toggleDropdown} />
          <DropdownContainer isOpen={isDropdownOpen}>
            <DropdownGrid>
              <div>
                <DropdownButton>
                  <AiOutlineHome />
                </DropdownButton>
                <DropdownLabel>Self Service Portal</DropdownLabel>
              </div>
              <div>
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
              <div>
                <DropdownButton>
                  <AiOutlineMail />
                </DropdownButton>
                <DropdownLabel>Attendance Management</DropdownLabel>
              </div>
              <div>
                <DropdownButton>
                  <AiOutlineFileText />
                </DropdownButton>
                <DropdownLabel>ATS</DropdownLabel>
              </div>
              <div>
                <DropdownButton>
                  <AiOutlineSearch />
                </DropdownButton>
                <DropdownLabel>Project Management</DropdownLabel>
              </div>
              <div>
                <DropdownButton>
                  <AiOutlinePieChart />
                </DropdownButton>
                <DropdownLabel>Remote Tracking</DropdownLabel>
              </div>
              <div>
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
          <SettingIcon />
          <SimpleText>{user?.user?.name}</SimpleText>
        </IconContainer>
      </Nav>
    </>
  );
};

export default Topbar;
