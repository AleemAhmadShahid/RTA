import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as CgIcons from "react-icons/cg";

export const SelfServiceSidebarData = [
  {
    title: "Dashboard",
    //path: "/",
    icon: <BsIcons.BsShieldCheck />,
  },
  {
    title: "Attendance",
    icon: <AiIcons.AiOutlineUser />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,
    subNav: [
      {
        title: "List",
        path: "/portal/selfservice/attendance",
        icon: <BiIcons.BiRadioCircle />,
      }
    ],

  },
  {
    title: "Leave",
    // path: "/Roles",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        path: "/portal/selfservice/leaves",
        icon: <BiIcons.BiRadioCircle />,
      },
    ],
  },
  {
    title: "Pay Slips",
    // path: "/Roles",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        ///path: "/portal/selfservice/reim",
        icon: <BiIcons.BiRadioCircle />,
      },
    ],
  },
  {
    title: "My Evaluation",
    // path: "/Roles",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        ///path: "/portal/selfservice/reim",
        icon: <BiIcons.BiRadioCircle />,
      },
    ],
  },
  
  {
    title: "My Team",
    // path: "/Teams",
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
      //  path: "/portal/attedancemanagement/holiday",
        icon: <BiIcons.BiRadioCircle />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Approvals",
    // path: "/Teams",
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "Leave",
      //  path: "/portal/attedancemanagement/holiday",
        icon: <BiIcons.BiRadioCircle />,
        cName: "sub-nav",
      },
      {
        title: "Expense Reimbursement",
      //  path: "/portal/attedancemanagement/holiday",
        icon: <BiIcons.BiRadioCircle />,
        cName: "sub-nav",
      },
    ],
  }  ,
  {
    title: "Performance Evaluation",
    // path: "/Teams",
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
      //  path: "/portal/attedancemanagement/holiday",
        icon: <BiIcons.BiRadioCircle />,
        cName: "sub-nav",
      }
    ],
  }  
];
