import React, { useState, useEffect } from "react";
// import BarChart from "../../../components/BarChart";
import {
  CardsContainer,
  CenteredContainer,
} from "../../../styles/TableStyling";
import Calendar from "react-calendar";
import "../../../styles/CalenderCom.css";

import PieChartCom from "../../../components/PieChart";
import styled from "styled-components";
import BarChartCom from "../../../components/BarChart";
import EmployeeInfo from "../../../components/EmployeeInfo";
import { LeftColumn, RightColumn, ColumnContainer } from "../../EmpSetting";
import SurveyPieChart from "../../../components/SurveyPieChart";
import { AiOutlineUser } from "react-icons/ai";
import { H6 } from "../../../styles/MultiStepFormStyling";
import EmployeeCard from "../../../components/EmployeeCard";
import SurveyBarChart from "../../../components/SurveyBarChart";
import StarRating from "../../../components/StarRating";
import UpcomingEvent from "../../../components/UpcomingEvent";
import { Details } from "../../MM/MeetingMainPage";
import SimpleLineChart from "../../../components/LineChart";

export const Linedata = [
  {
    name: 'Jan 24',
    uv: 4000,
    // pv: 2400,
    // amt: 2400,
  },
  {
    name: 'Feburary 24',
    uv: 3000,
    // pv: 1398,
    // amt: 2210,
  },
  {
    name: 'March 24',
    uv: 2000,
    // pv: 9800,
    // amt: 2290,
  },
  {
    name: 'April 24',
    uv: 2780,
    // pv: 3908,
    // amt: 2000,
  },
  {
    name: 'May 24',
    uv: 1890,
    // pv: 4800,
    // amt: 2181,
  },
  {
    name: 'June 24',
    uv: 2390,
    // pv: 3800,
    // amt: 2500,
  },
  {
    name: 'July 24',
    uv: 3490,
    // pv: 4300,
    // amt: 2100,
  },
];
export const Chardata = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export const data = [
  { name: "1 star", pv: 24, amt: 2400, color: "#8884d8" },
  { name: "2 star", pv: 13, amt: 2210, color: "#82ca9d" },
  { name: "3 star", pv: 98, amt: 2290, color: "#ffc658" },
  { name: "4 star", pv: 39, amt: 2000, color: "#ff7300" },
  { name: "5 star", pv: 48, amt: 2181, color: "#387908" },
];
const Surveydata = [
     { name: 'Group A', value: 400 },
     { name: 'Group B', value: 300 },
     { name: 'Group C', value: 300 },
     { name: 'Group D', value: 200 },
   ];

export const MiddleColumn = styled.div`
  flex: 1;
  padding: 0px 10px;
`;

export const ContentAreaCards = styled.div`
  border-radius: 10px;
  background: white;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  margin-bottom: 10px;
`;

export const DashBoardCompBox = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  padding: 10px;
  margin-bottom: 10px;
`;
export const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const Icon = styled.div`
  background: lightgrey;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  margin-right: 20px;
  color: grey;
`;

const AMDashBoard = (employees) => {
  const currentDate = new Date();
  const [data, setData] = useState(null);
  const [date, setDate] = useState(currentDate);

  const tileDisabled = ({ date, view }) => {
    return (
      view === "month" &&
      (date.getMonth() !== currentDate.getMonth() ||
        date.getFullYear() !== currentDate.getFullYear())
    );
  };

  const renderNavigationLabel = ({ date, view }) => {
    const isCurrentMonth =
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear();
    return isCurrentMonth ? (
      <span>
        {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
      </span>
    ) : (
      <button disabled>
        {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
      </button>
    );
  };

  return (
    <CenteredContainer>
      <CardsContainer>
        <ContentAreaCards>
          <PieChartCom
            colors={["#e4e8ef", "blue"]}
            percentFillValue={40}
            cardInfo={{
              title: "Active Employees",
              value: "40",
              text: "Today",
            }}
          />
        </ContentAreaCards>
        <ContentAreaCards>
          <PieChartCom
            colors={["#e4e8ef", "#ffa500"]}
            percentFillValue={5}
            cardInfo={{
              title: "Absent Employees",
              value: "5",
              text: "Today",
            }}
          />
        </ContentAreaCards>
        <ContentAreaCards>
          <PieChartCom
            colors={["#e4e8ef", "green"]}
            percentFillValue={35}
            cardInfo={{
              title: "On Time",
              value: "35",
              text: "Today",
            }}
          />
        </ContentAreaCards>
        <ContentAreaCards>
          <PieChartCom
            colors={["#e4e8ef", "red"]}
            percentFillValue={0}
            cardInfo={{
              title: "Late",
              value: "0",
              text: "Today",
              // text: "We have sold 123 items.",
            }}
          />
        </ContentAreaCards>
      </CardsContainer>
      <ColumnContainer>
      <LeftColumn>
      <DashBoardCompBox >Monthly Attedance Report<br></br><SimpleLineChart data={Linedata}/></DashBoardCompBox></LeftColumn>
      <RightColumn>
      <DashBoardCompBox ><SimpleLineChart data={Linedata}/></DashBoardCompBox></RightColumn>
      </ColumnContainer>
      <ColumnContainer>
        <LeftColumn style={{ flex: "2"}}>
          <DashBoardCompBox style={{padding:"20px"}}>
            <ColumnContainer>
              <LeftColumn>
                <h5>Leave Summary (Monthly)</h5>
                <Details style={{fontWeight:"400"}}>Approved Leaves: 5</Details>
                <Details style={{fontWeight:"400"}}>Pending Leaves: 10</Details>
                <Details style={{fontWeight:"400"}}>Rejected Leaves: 7</Details>
                <Details style={{fontWeight:"400"}}>Total Leaves: 22</Details>
              </LeftColumn>
              <RightColumn>
                <DashBoardCompBox
                  style={{ height: "200px", border: "none", boxShadow: "none" }}
                >
                  <SurveyPieChart data={Surveydata} />
                </DashBoardCompBox>
              </RightColumn>
            </ColumnContainer>
          </DashBoardCompBox>
        </LeftColumn>
        <RightColumn style={{ flex: "1" }}>
          <DashBoardCompBox style={{padding:"20px"}}>
            <h5>Approved Leaves (Today)</h5>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <Icon>
                <AiOutlineUser style={{ fontSize: "24px" }} />
              </Icon>
              <div>
                <H6 style={{ fontWeight: "bold", margin: "0" }}>3</H6>
                <H6 style={{ color: "grey", margin: "0" }}>Casual</H6>
              </div>
            </div>
            
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <Icon>
                <AiOutlineUser style={{ fontSize: "24px" }} />
              </Icon>
              <div>
                <H6 style={{ fontWeight: "bold", margin: "0" }}>1</H6>
                <H6 style={{ color: "grey", margin: "0" }}>Half Day</H6>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <Icon>
                <AiOutlineUser style={{ fontSize: "24px" }} />
              </Icon>
              <div>
                <H6 style={{ fontWeight: "bold", margin: "0" }}>2</H6>
                <H6 style={{ color: "grey", margin: "0" }}>Sick</H6>
              </div>
            </div>
          </DashBoardCompBox>
        </RightColumn>
      </ColumnContainer>
    </CenteredContainer>
  );
};

export default AMDashBoard;
