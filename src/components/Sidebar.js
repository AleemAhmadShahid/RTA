import React, { useState } from "react";
import styled from "styled-components";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { CgMenuRight } from "react-icons/cg";
import { Outlet } from "react-router-dom";

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

  @media (min-width: 845px) {
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
  margin-top: 1rem;
`;

export const MobileIcon = styled.div`
  position: fixed;
  top: 70px;
  left: ${({ sidebar }) => (sidebar ? "250px" : "20px")};
  background-color: #ffffff;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 11;
  display: none;

  @media (max-width: 845px) {
    display: block;
  }
`;

const Sidebar = ({heading,SidebarData}) => {
  const [sidebar, setSidebar] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const toggleSubMenu = (index) => {
    if (activeSubMenu === index) {
      setActiveSubMenu(null); 
    } else {
      setActiveSubMenu(index); 
    }
  };

  return (
    <>
      <Outlet />
      <IconContext.Provider value={{ color: "#000" }}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <Heading>
              <MobileIcon sidebar={sidebar} onClick={toggleSidebar}>
                <CgMenuRight />
              </MobileIcon>
              {heading}
            </Heading>
            {SidebarData.map((item, index) => {
              return (
                <div key={index}>
                  <SubMenu
                    item={item}
                    toggleSubMenu={() => toggleSubMenu(index)}
                  />
                  {item.subNavOpen &&
                    item.subNav.map((subItem, subIndex) => {
                      return(
                      <SubMenu
                        item={subItem}
                        key={subIndex}
                      />);
                      })}
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