import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { CgMenuRight } from "react-icons/cg"; // Menu icon for mobile view
import { Outlet } from "react-router-dom";

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #000; /* Set font color to black */
  display: none; /* Hide the icon by default */

  @media (max-width: 767px) {
    display: flex; /* Display the icon in mobile view only */
  }
`;

const SidebarNav = styled.nav`
  background: #ffffff;
  width: ${({ sidebar }) => (sidebar ? "250px" : "80px")};
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-250px")};
  z-index: 10;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #000;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    left: 0; /* Keep the sidebar fixed on desktop view */
    width: 250px;
  }

  & * {
    color: #000;
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Heading = styled.h3`
  color: #000;
  margin-left: 1rem;
  font-size: 1.2rem;
  margin-top:1rem;

  // @media (max-width: 767px) {
  //   display: none;
  // }

  // @media (min-width: 768px) {
  //   display: block !important;
  // }
`;

const MobileIcon = styled.div`
  position: fixed;
  top: 70px;
  left: ${({ sidebar }) => (sidebar ? "250px" : "20px")};
  background-color: #ffffff;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 11;
  display: none; /* Hide the icon by default */

  @media (max-width: 767px) {
    display: block; /* Display the icon in mobile view only */
  }
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const toggleSubMenu = (index) => {
    SidebarData[index].subNavOpen = !SidebarData[index].subNavOpen;
  };

  return (
    <>
      <Outlet />
      <IconContext.Provider value={{ color: "#000" }}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <MobileIcon sidebar={sidebar} onClick={toggleSidebar}>
              <CgMenuRight />
            </MobileIcon>
            <Heading><MobileIcon sidebar={sidebar} onClick={toggleSidebar}>
              <CgMenuRight />
            </MobileIcon>Employee Management</Heading>
            {SidebarData.map((item, index) => {
              return (
                <div key={index}>
                  <SubMenu item={item} toggleSubMenu={() => toggleSubMenu(index)} />
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
