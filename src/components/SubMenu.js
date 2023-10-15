import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  border-radius: 0 15px 15px 0; /* Rounded corners on the right side */

  &:hover {
    color: #ffffff;
    background: linear-gradient(to right, #ffa500, #ffd000);
    cursor: pointer;
    border-radius: 5px 5px 5px 5px;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #ffffff;
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
    background: linear-gradient(to right, #ffa500, #ffd000);
    cursor: pointer;
    border-radius: 5px 5px 5px 5px;
  }
`;

const SubMenuLink = styled(SidebarLink)`
  background: ${({ active }) => (active ? 'linear-gradient(to right, #ffa500, #ffd000)' : 'transparent')};
`;

const SubMenu = ({ item, active, onSubmenuClick, closeSubmenu }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => {
    setSubnav(!subnav);
    if (closeSubmenu) {
      closeSubmenu(); // Close other submenus if provided
    }
  };

  return (
    <>
      <SubMenuLink to={item.path} onClick={item.subNav && showSubnav} active={active}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SubMenuLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
