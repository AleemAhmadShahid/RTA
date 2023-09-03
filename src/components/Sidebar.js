import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";

import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import Emp_list from "../pages/Emp_list";

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

  return (
    <>
      <IconContext.Provider value={{ color: "#000" }}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#"></NavIcon>
            <Heading>Employee Management</Heading>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
