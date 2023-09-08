import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SidebarData } from "./Sidebardata";

import SubMenu from "./Submenu";
import { IconContext } from "react-icons/lib";
import Emp_list from "../pages/Emp_list";
import { Outlet } from 'react-router-dom';

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #000; /* Set font color to black */
`;

const SidebarNav = styled.nav`
  background: #ffffff;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;

  z-index: 10;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #000; /* Set font color to black */

  /* Set font color of all children to black */
  & * {
    color: #000;
  }
`;

const SidebarWrap = styled.div`
  width: 91%;
`;

const Heading = styled.h3`
  color: #000;
  margin-left: 1rem;
  margin-top: -4rem;
  font-size: 1.2rem;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  // Function to toggle the submenu
  const toggleSubMenu = (index) => {
    SidebarData[index].subNavOpen = !SidebarData[index].subNavOpen;
  };
  return (
    <>
    <Outlet/>
      <IconContext.Provider value={{ color: "#000" }}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#" onClick={() => setSidebar(!sidebar)}>
              {/* Add a button or icon to toggle the sidebar */}
            </NavIcon>
            <Heading>Employee Management</Heading>
            {SidebarData.map((item, index) => {
              return (
                <div key={index}>
                  <SubMenu
                    item={item}
                    toggleSubMenu={() => toggleSubMenu(index)}
                  />
                  {item.subNavOpen &&
                    item.subNav.map((subItem, subIndex) => (
                      <SubMenu item={subItem} key={subIndex} />
                    ))}
                </div>
              );
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
