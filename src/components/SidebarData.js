import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as CgIcons from "react-icons/cg";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/Roles",
    icon: <BsIcons.BsShieldCheck />,
  },
  {
    title: "Employees",
    // path: "/Employees",
    icon: <AiIcons.AiOutlineUser />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        // path: "/Employees/List",
        icon: <BiIcons.BiRadioCircle />,
      },
      {
        title: "Add",
        // path: "/Employees/Add",
        icon: <BiIcons.BiSolidAddToQueue />,
      },
    ],
  },
  {
    title: "Roles",
    // path: "/Roles",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,
  },
  {
    title: "Teams",
    // path: "/Teams",
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        // path: "/Teams/List",
        icon: <BiIcons.BiRadioCircle />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Departments",
    // path: "/Departments",
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        // path: "/Departments/List",
        icon: <BiIcons.BiRadioCircle />,
      },
    ],
  },
  {
    title: "Job Descriptions",
    // path: "/Job Descriptions",
    icon: <CgIcons.CgFileDocument />,

    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        // path: "/Job Descriptions/List",
        icon: <BiIcons.BiRadioCircle />,
      },
    ],
  },
  {
    title: "Surveys",
    // path: "/Surveys",
    icon: <RiIcons.RiSurveyLine />,

    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        // path: "/Survrys/List",
        icon: <BiIcons.BiRadioCircle />,
      },
      {
        title: "Add",
        // path: "/Survrys/Add",
        icon: <BiIcons.BiSolidAddToQueue />,
      },
    ],
  },
  {
    title: "Announcements",
    // path: "/Announcements",
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        // path: "/Announcements/List",
        icon: <BiIcons.BiRadioCircle />,
      },
      {
        title: "Add",
        // path: "/Announcements/Add",
        icon: <BiIcons.BiSolidAddToQueue />,
      },
    ],
  },
];
