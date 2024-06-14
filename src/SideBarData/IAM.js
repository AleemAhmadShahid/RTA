import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as CgIcons from "react-icons/cg";

export const IAMSidebarData = [
  {
    title: "Dashboard",
    path: "/portal/iam/dashboard",
    icon: <BsIcons.BsShieldCheck />,
  },
  {
    title: "Employees",
    icon: <AiIcons.AiOutlineUser />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,
    subNav: [
      {
        title: "List",
        path: "/portal/iam/employee",
        icon: <BiIcons.BiRadioCircle />,
      }
    ],

  },
  {
    title: "Roles",
    // path: "/Roles",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        path: "/portal/iam/role",
        icon: <BiIcons.BiRadioCircle />,
      },
    ],
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
        path: "/portal/iam/team",
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
        path: "/portal/iam/department",
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
    title: "Performance Evaluations",
    // path: "/Performance Evaluations",
    icon: <CgIcons.CgFileDocument />,

    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        // path: "/Performance Evaluations/List",
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
        path: "/portal/iam/surveys",
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
        path: "/portal/iam/announcement",
        icon: <BiIcons.BiRadioCircle />,
      }
    ],
  },
];
