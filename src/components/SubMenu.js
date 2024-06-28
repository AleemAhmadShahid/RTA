import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {  useLocation } from "react-router-dom"; 
import {  useSelector } from "react-redux";

const SidebarLink = styled(Link)`
  display: flex;
  color: #ffffff;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  list-style: none;
  height: 45px;
  text-decoration: none;
  font-size: 15px;
  border-radius: 0 15px 15px 0; 
  &:hover {
  
    color: black;
    background: ${({ location, theme }) => 
      location.pathname.includes('projectmanagement') ? theme.projectManagement.hoverBackgroundMain : theme.default.hoverBackgroundMain};
    cursor: pointer;
    border-radius: 5px 5px 5px 5px;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: ${({ active }) => (active ? 'linear-gradient(to right, #ffa500, #ffd000)' : 'transparent')};
  height: 45px;
  padding-left: 2rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000000;
  font-size: 15px;
  border-radius: 5px;

  &:hover {
    color: #ffffff;
     background: ${({ location, theme }) => 
      location.pathname.includes('projectmanagement') ? theme.projectManagement.hoverBackground : theme.default.hoverBackground};
    // background: #f5f5f5;
    cursor: pointer;
    border-radius: 5px 5px 5px 5px;
  }
`;

const SubMenuLink = styled(SidebarLink)`
  background: ${({ active }) => (active ? 'linear-gradient(to right, #ffa500, #ffd000)' : 'transparent')};
  box-shadow:  ${({ active }) => (active ? 'rgba(115, 103, 240, 0.48) 0px 2px 6px' : '')};
`;

const SubMenu = ({ item, active, onSubmenuClick, closeSubmenu,location,theme }) => {

  // const location = useLocation();
  const [subnav, setSubnav] = useState(false);

  // const active = location.pathname === item.path;

  const showSubnav = () => {
    setSubnav(!subnav);
    if (closeSubmenu) {
      closeSubmenu(); 
    }
  };

  return (
    <>
      <SubMenuLink to={item.path} onClick={item.subNav && showSubnav} active={active} theme={theme} location={location}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item?.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            
            : null}
        </div>
      </SubMenuLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index} active={item.path == location.pathname} location={location}
            theme={theme}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
