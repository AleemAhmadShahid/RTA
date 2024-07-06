import React, { useState, useEffect } from "react";
// import BarChart from "../../../components/BarChart";
import { CardsContainer, CenteredContainer } from "../../styles/TableStyling";
import Calendar from "react-calendar";
import "../../styles/CalenderCom.css";

import PieChartCom from "../../components/PieChart";
import styled from "styled-components";
import BarChartCom from "../../components/BarChart";
import EmployeeInfo from "../../components/EmployeeInfo";
import { LeftColumn, RightColumn, ColumnContainer } from "../EmpSetting";
// import SurveyPieChart from "../../components/SurveyPieChart";
import { AiOutlineUser } from "react-icons/ai";
import { H6 } from "../../styles/MultiStepFormStyling";
import EmployeeCard from "../../components/EmployeeCard";
import SurveyBarChart from "../../components/SurveyBarChart";
// import StarRating from "../../components/StarRating";
import StarRating from "../../components/StarRating";
import UpcomingEvent from "../../components/UpcomingEvent";
import { Details } from "../MM/MeetingMainPage";
import SimpleLineChart from "../../components/LineChart";
import { Linedata } from "../IAM/EmpDashBoard/EmpDashBoard";
import { MLinedata } from "../AM/AMDashBoard/AMDashboard";
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

export const Surveydata = [
  { name: "1 star", pv: 24, amt: 2400, color: "#8884d8" },
  { name: "2 star", pv: 13, amt: 2210, color: "#82ca9d" },
  { name: "3 star", pv: 98, amt: 2290, color: "#ffc658" },
  { name: "4 star", pv: 39, amt: 2000, color: "#ff7300" },
  { name: "5 star", pv: 48, amt: 2181, color: "#387908" },
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

const PayMDashBoard = (employees) => {
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
      
      <ColumnContainer>
        <LeftColumn style={{ paddingRight: "0" }}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"10px"}}>
            {/* <CardsContainer> */}
      <ContentAreaCards>
            <PieChartCom
              colors={["#efeafd", "#7235fd"]}
              percentFillValue={40}
              cardInfo={{
                title: "New Employees",
                value: "40",
                
              }}
            />
          </ContentAreaCards>
          <ContentAreaCards>
            <PieChartCom
              colors={["#e0f2fe", "#0080f9"]}
              percentFillValue={5}
              cardInfo={{
                title: "Total Employees",
                 value: "5",
                text:"Absent Employee are 5",
                
              }}
            />
          </ContentAreaCards><ContentAreaCards>
            <PieChartCom
              colors={["#e2f2ee", "#09946f"]}
              percentFillValue={65}
              cardInfo={{
                title: "Payroll Accuracy",
                value: "25",
                
              }}
            />
          </ContentAreaCards><ContentAreaCards>
            <PieChartCom
              colors={["#fef4e3", "#fb8303"]}
              percentFillValue={66}
              cardInfo={{
                title: "Average salary",
                value: "0",
                // text: "We have sold 123 items.",
              }}
            />
          </ContentAreaCards>
          {/* </CardsContainer> */}
            </div>
         </LeftColumn>
        <RightColumn>
        <DashBoardCompBox>
            <h5 style={{marginLeft:"15px",marginTop:"15px"}}>Salary statistice</h5>
          <SurveyBarChart data={Surveydata} layout="horizontal" height="233px" showPvLabel={false}/>
          </DashBoardCompBox>

          {/* <DashBoardCompBox style={{ padding: "20px" }}>
            <h5 style={{ fontWeight: "bold" }}>Offer acceptance</h5>
            <ContentAreaCards
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                boxShadow: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <PieChartCom
                  colors={["#e4e8ef", "green"]}
                  percentFillValue={76}
                  cardInfo={{
                    title: "",
                    value: "",
                    text: "",
                  }}
                />
                <h6>Accepted</h6>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <PieChartCom
                  colors={["#e4e8ef", "orange"]}
                  percentFillValue={23}
                  cardInfo={{
                    title: "",
                    value: "",
                    text: "",
                  }}
                />
                <h6>Rejected</h6>
              </div>
            </ContentAreaCards>
          </DashBoardCompBox> */}
          
        </RightColumn>
      </ColumnContainer>
      <ColumnContainer>
      <LeftColumn style={{flex:"2"}}>
<DashBoardCompBox style={{  }}>
<h5 style={{marginLeft:"15px",marginTop:"15px"}}>Total Salary By unit</h5>
        <SimpleLineChart data={MLinedata}/>
      </DashBoardCompBox>
      </LeftColumn>
      <RightColumn>
      
      <DashBoardCompBox style={{ width: "100%", padding: "20px" }}>
        <ColumnContainer>
          <LeftColumn>
            <h6>1.How would you rate the overall quality of the porduct</h6>
            <StarRating readOnly />
          </LeftColumn>
          <RightColumn>
            <SurveyBarChart data={Surveydata} />
          </RightColumn>
        </ColumnContainer>
      </DashBoardCompBox>
      <DashBoardCompBox style={{}}>
        {/* <StarRating /> */}

        {/* <h2>Disabled Rating main</h2>
      <StarRating disabled /> */}
      </DashBoardCompBox>
      </RightColumn>
      </ColumnContainer>
      <ColumnContainer>
      <LeftColumn >
        <DashBoardCompBox style={{height:"300px"}}>
        <h5 style={{marginLeft:"20px",marginTop:"20px"}}>Employees Structure</h5>
      <ContentAreaCards 
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                boxShadow: "none",
              }}
            >
            <PieChartCom
              colors={["#daf6f9", "#0ac4d1"]}
              percentFillValue={67}
              cardInfo={{
                title: "",
                value: "",
                text: "",
              }}
             width={200}
             height={200}
             cx={70}
             cy={80}
            />
          </ContentAreaCards>
          </DashBoardCompBox>
      </LeftColumn>
      <RightColumn style={{flex:"2"}}>

      </RightColumn>
      </ColumnContainer>
    </CenteredContainer>
  );
};

export default PayMDashBoard;
