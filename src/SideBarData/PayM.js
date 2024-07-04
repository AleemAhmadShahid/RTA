import React from "react";
import * as FaIcons from "react-icons/fa";

import * as RiIcons from "react-icons/ri";


import { AiFillProject } from "react-icons/ai";
import { HiOutlineTemplate } from "react-icons/hi";
import { TbWaveSawTool } from "react-icons/tb";
import { MdGridView } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
export const PayMSidebarData = [
  
  {
    title: "dashboard",
    icon: <AiFillProject />,
   
     path: "/portal/payrollmanagement/dashboard",
    

  },
  {
    title: "Templates",
    // path: "/Templates",
    icon: <HiOutlineTemplate  />,
  
 },
  {
    title: "Home",
    // path: "/home",
    icon: <TbWaveSawTool/>,
  
   },
   { type: 'separator' },
  //  <hr/>
  {
    title: "Workspaces",
    // path: "/Workspaces",
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,

    subNav: [
      {
        title: "Boards",
        // path: "/portal/PM/Boards",
        icon: <AiFillProject />,
      },
   
      {
        title: "Highlights",
        // path: "/portal/PM/Highlights",
        icon: <FiHeart/>,
      },
    
      {
        title: "Views",
        // path: "/portal/PM/Views",
        icon: <MdGridView/>,
      },
   
      {
        title: "Settings",
        // path: "/portal/PM/Setting",
        icon: <IoMdSettings/>,
      },
    ],
  },
]
