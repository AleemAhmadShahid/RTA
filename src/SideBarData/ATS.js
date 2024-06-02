import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as CgIcons from "react-icons/cg";

export const ATSSidebarData = [
  {
    title: "Dashboard",
    //path: "/",
    icon: <BsIcons.BsShieldCheck />,
  },
  {
    title: "Job Posting",
    icon: <AiIcons.AiOutlineUser />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,
    subNav: [
      {
        title: "List",
        path: "/portal/applicationtrackingsystem/jobPosting",
        icon: <BiIcons.BiRadioCircle />,
      }
    ],

  },
  {
    title: "Interviews",
    // path: "/Roles",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        path: "/portal/applicationtrackingsystem/interview",
        icon: <BiIcons.BiRadioCircle />,
      },
    ],
  },
  {
    title: "Candidates",
    // path: "/Teams",
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        path: "/portal/applicationtrackingsystem/candidate",
        icon: <BiIcons.BiRadioCircle />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Offer",
    // path: "/Departments",
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        path: "/portal/applicationtrackingsystem/offer",
        icon: <BiIcons.BiRadioCircle />,
      },
    ],
  },
  
];
