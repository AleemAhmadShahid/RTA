import React, { useState } from "react";
import styled from "styled-components";
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
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 2.5%;
  right: 2%;
  width: 78%;
  border-radius: 5px;
`;

const SimpleText = styled.span`
  font-size: 16px;
  margin-right: 30px;
  margin-left: 10px;
`;

const SettingIcon = styled(AiOutlineSetting)`
  font-size: 20px;
  // margin-right: 10px;
  // margin-left: px;
  cursor: pointer;
  
`;

const BellIcon = styled(AiOutlineBell)`
  font-size: 20px;
  //  margin-right: 30px;
  margin-left: 800px;
  cursor: pointer;
  
`;

const MenuIcon = styled(CgMenuGridR)`
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 70%;
  margin-top:10px;
  display: flex;
  justify-content: left;
  background: #ffffff;
  border: 0px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  width: 30%; /* Make the dropdown 20% wider */
  padding: 10px;
`;

const DropdownGrid = styled.div`
  display: grid;
  left: 0;
  
  margin-top:23px;
  margin-bottom:25px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  justify-items: center; /* Center the items horizontally */
  align-items: center; /* Center the items vertically */
`;

const DropdownButton = styled.button`
  background-color: #ffa500;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 13px 16px;
  cursor: pointer;
  border-radius: 40%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff8000;
  }
`;

const DropdownLabel = styled.div`
  font-size: 14px;
  text-align: center;
  margin-top: 5px; /* Add some space between the icon and label */
`;

const Topbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Nav>
      <IconContainer>
        <MenuIcon onClick={toggleDropdown} />
        <DropdownContainer isOpen={isDropdownOpen}>
          <DropdownGrid>
            <div>
              <DropdownButton>
                <AiOutlineHome />
              </DropdownButton>
              <DropdownLabel>Home</DropdownLabel>
            </div>
            <div>
              <DropdownButton>
                <AiOutlineUser />
              </DropdownButton>
              <DropdownLabel>User</DropdownLabel>
            </div>
            <div>
              <DropdownButton>
                <AiOutlineCalendar />
              </DropdownButton>
              <DropdownLabel>Calendar</DropdownLabel>
            </div>
            <div>
              <DropdownButton>
                <AiOutlineMail />
              </DropdownButton>
              <DropdownLabel>Mail</DropdownLabel>
            </div>
            <div>
              <DropdownButton>
                <AiOutlineFileText />
              </DropdownButton>
              <DropdownLabel>File Text</DropdownLabel>
            </div>
            <div>
              <DropdownButton>
                <AiOutlineSearch />
              </DropdownButton>
              <DropdownLabel>Search</DropdownLabel>
            </div>
            <div>
              <DropdownButton>
                <AiOutlineDashboard />
              </DropdownButton>
              <DropdownLabel>Dashboard</DropdownLabel>
            </div>
            <div>
              <DropdownButton>
                <AiOutlinePieChart />
              </DropdownButton>
              <DropdownLabel>Pie Chart</DropdownLabel>
            </div>
            <div>
              <DropdownButton>
                <AiOutlineAppstore />
              </DropdownButton>
              <DropdownLabel>App Store</DropdownLabel>
            </div>
          </DropdownGrid>
        </DropdownContainer>
        
      </IconContainer><BellIcon />
        <SettingIcon />
      <SimpleText>Company Name</SimpleText>
    </Nav>
  );
};

export default Topbar;
