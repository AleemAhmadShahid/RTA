import React from "react";

import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";

import { PiScreencast } from "react-icons/pi";
import { TiGroupOutline } from "react-icons/ti";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FaRegClipboard } from "react-icons/fa";
export const ATSSidebarData = [
  {
    title: "Dashboard",
    path: "/portal/applicationtrackingsystem/dashboard",
    icon: <BsIcons.BsShieldCheck />,
  },
  {
    title: "Job Posting",
    icon: <FaRegClipboard />,
    iconClosed: <RiIcons.RiArrowDropDownLine />,
    iconOpened: <RiIcons.RiArrowDropUpLine />,
    subNav: [
      {
        title: "List",
        path: "/portal/applicationtrackingsystem/jobPosting",
        icon: <BiIcons.BiRadioCircle />,
      },
    ],
  },
  {
    title: "Interviews",
    // path: "/Roles",
    icon: <PiScreencast />,
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
    icon: <TiGroupOutline />,
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
    icon: <MdOutlineLocalOffer />,

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
