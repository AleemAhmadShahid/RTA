import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as CgIcons from "react-icons/cg";
import { MdOutlineHolidayVillage } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuCalendarCheck } from "react-icons/lu";
import { IoIosTimer } from "react-icons/io";
import { IoTime } from "react-icons/io5";
export const AMSidebarData = [
  {
    title: "Dashboard",
    path: "/portal/attedancemanagement/dashboard",
    icon: <BsIcons.BsShieldCheck />,
  },
  {
    title: "Attendance",
    icon: <LuCalendarCheck/>,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,
    subNav: [
      {
        title: "List",
        path: "/portal/attedancemanagement/attendance",
        icon: <BiIcons.BiRadioCircle />,
      }
    ],

  },
  {
    title: "Leave",
    // path: "/Roles",
    icon: <FaRegCalendarAlt />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "Assign leaves",
        path: "/portal/attedancemanagement/assignLeaves",
        icon: <BiIcons.BiRadioCircle />,
      },
      {
        title: "Applied leaves",
        path: "/portal/attedancemanagement/appliedLeaves",
        icon: <BiIcons.BiRadioCircle />,
      },
    ],
  },
  {
    title: "Holiday",
    // path: "/Teams",
    icon: <MdOutlineHolidayVillage/>,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        path: "/portal/attedancemanagement/holiday",
        icon: <BiIcons.BiRadioCircle />,
        cName: "sub-nav",
      },
      {
        title: "Calender",
        //path: "/portal/iam/team",
        icon: <BiIcons.BiRadioCircle />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Shift",
    // path: "/Departments",
    icon: <IoTime />,

    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        path: "/portal/attedancemanagement/shift",
        icon: <BiIcons.BiRadioCircle />,
      },
    ],
  },
  
];
