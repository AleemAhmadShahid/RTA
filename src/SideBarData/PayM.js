import React from "react";
import * as FaIcons from "react-icons/fa";



import { AiFillProject } from "react-icons/ai";
import { HiOutlineTemplate } from "react-icons/hi";
import { TbWaveSawTool } from "react-icons/tb";
import { MdGridView } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";

import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
export const PayMSidebarData = [
  
  {
    title: "dashboard",
    icon: <AiFillProject />,
   
     path: "/portal/payrollmanagement/dashboard",
    

  }, 
  {
    title: "Cycle",
    // path: "/Departments",
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "List",
        path: "/portal/payrollmanagement/cycle",
        icon: <BiIcons.BiRadioCircle />,
      },
    ],
  }, 
  {
    title: "Policy",
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
    title: "Processing",
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
    title: "Reimbursement",
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
]
