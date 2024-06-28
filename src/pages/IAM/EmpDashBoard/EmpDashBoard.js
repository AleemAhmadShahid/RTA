import React, { useState, useEffect } from "react";
// import BarChart from "../../../components/BarChart";
import { CardsContainer, CenteredContainer } from "../../../styles/TableStyling";
import Calendar from "react-calendar";
import "../../../styles/CalenderCom.css";

import { createGetRequest,createDeleteRequest,
  createPutRequest, } from "../../../global/requests";
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
import SimpleLineChart from "../../../components/LineChart";
// import { Linedata } from "../../ATS/ATSDashBoard/ATSDashBoard";
// import UpcomingEvent from "../../../components/UpcomingEvent";
export const Linedata = [
  {
    name: '2017',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '2018',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '2019',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '2020',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '2021',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '2022',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '2023',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '2024',
    uv: 3490,
    pv: 4300,
    amt: 2100,
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
const SurveyPiedata = [
  { name: 'Men', value: 400 },
  { name: 'Women', value: 300 },
  
];

export const Surveydata = [
  { name: "Employees", pv: 99, amt: 20, color: "#8884d8" },
  { name: "Team Lead", pv: 23, amt: 20, color: "#82ca9d" },
  { name: "HR", pv: 3, amt: 9, color: "#ffc658" },
  { name: "Managers", pv: 39, amt: 20, color: "#ff7300" },
  { name: "Roles", pv: 48, amt: 41, color: "	#87CEEB" },
  { name: "Interns", pv: 39, amt: 9, color: "#8884d8" },
  { name: "Terminated", pv: 8, amt: 1, color: "red" },
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

const EmpDashBoard = ({}) => {
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

  const [loading, setLoading] = useState(true);
const [employees,setEmployees]=useState([]);
const [employeeCountByWorkType, setEmployeeCountByWorkType] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await createGetRequest("/api/dashboard/desktopDashbaord");
        console.log(data);
        if (data.status === 404) {
          setEmployees([]);
        } else {
          setEmployees(data.users);
          setEmployeeCountByWorkType(data.employeeCountByWorkType);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployees([]);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  console.log("aleem",employeeCountByWorkType);
 
  return (
    <CenteredContainer>
      <CardsContainer>
      <ContentAreaCards>
            <PieChartCom
              colors={["#e4e8ef", "blue"]}
              percentFillValue={40}
              cardInfo={{
                title: "Total Employees",
                value: employeeCountByWorkType.length > 0 ? employeeCountByWorkType[0].count.toString() : "0",
                
              }}
            />
          </ContentAreaCards>
          <ContentAreaCards>
            <PieChartCom
              colors={["#e4e8ef", "#ffa500"]}
              percentFillValue={5}
              cardInfo={{
                title: "Total Departments",
                 value: "5",
                // text:"Absent Employee are 5",
                
              }}
            />
          </ContentAreaCards><ContentAreaCards>
            <PieChartCom
              colors={["#e4e8ef", "green"]}
              percentFillValue={65}
              cardInfo={{
                title: "Total Teams",
                value: "25",
                
              }}
            />
          </ContentAreaCards><ContentAreaCards>
            <PieChartCom
              colors={["#e4e8ef", "#8884d8"]}
              percentFillValue={77}
              cardInfo={{
                title: "Inters",
                value: "39",
                // text: "We have sold 123 items.",
              }}
            />
          </ContentAreaCards>
          </CardsContainer>
      
      <ColumnContainer>
        <LeftColumn style={{ paddingRight: "0",flex:"2" }}>
          <DashBoardCompBox>
            <h5 style={{marginLeft:"20px",marginTop:"20px"}}>Employees By Role</h5>
          <SurveyBarChart data={Surveydata} layout="horizontal"/>
          </DashBoardCompBox>
            <DashBoardCompBox >
        {/* <BarChartCom data={Chardata} /> */}
        <h5 style={{marginLeft:"20px",marginTop:"20px"}}>Yearly Growth</h5>
        <SimpleLineChart data={Linedata}/>
      </DashBoardCompBox>
        </LeftColumn>
       
        <RightColumn>
          {/* <ContentAreaCards>
            <PieChartCom
              colors={["#e4e8ef", "#475be8"]}
              percentFillValue={69}
              cardInfo={{
                title: "Todays Sales",
                value: "$20.4K",
                text: "We have sold 123 items.",
              }}
            />
          </ContentAreaCards>
          <ContentAreaCards>
            <PieChartCom
              colors={["#e4e8ef", "green"]}
              percentFillValue={67}
              cardInfo={{
                title: "Shaheers BSDK level",
                value: "$69K",
                text: "We have sold 123 items.",
              }}
            />
          </ContentAreaCards>

          <DashBoardCompBox style={{ padding: "20px" }}>
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
          </DashBoardCompBox>
          <DashBoardCompBox style={{ height: "300px" }}>
            <SurveyPieChart />
          </DashBoardCompBox> */}
          <DashBoardCompBox style={{padding:"20px"}}>
          <h5>Upcoming Events</h5>

<UpcomingEvent event="Data science workshop" date="1 March 2024" />
<UpcomingEvent event="Machine Learning workshop" date="21 March 2024" />
<UpcomingEvent event="VIS" date="1 May 2024" />
<UpcomingEvent event="CC workshop" date="2 July 2024" />

          </DashBoardCompBox>
           <DashBoardCompBox style={{ padding: "20px" }}>
            <h4>Summery</h4>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Icon>
                <AiOutlineUser style={{ fontSize: "24px" }} />
              </Icon>
              <div>
                <H6 style={{ fontWeight: "bold", margin: "0" }}>89</H6>
                <H6 style={{ color: "grey", margin: "0" }}>Active Employee</H6>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Icon>
                <AiOutlineUser style={{ fontSize: "24px" }} />
              </Icon>
              <div>
                <H6 style={{ fontWeight: "bold", margin: "0" }}>19</H6>
                <H6 style={{ color: "grey", margin: "0" }}>Total Projects</H6>
              </div>
            </div>
          </DashBoardCompBox>
          <DashBoardCompBox style={{ height: "300px" }}>
          <h5 style={{marginLeft:"20px",marginTop:"20px"}}>Work force Diversity (Men/Women)</h5>
            <SurveyPieChart data={SurveyPiedata} cx="50%" cy="40%"/>
          </DashBoardCompBox>
        </RightColumn>
      </ColumnContainer>
      {/* <DashBoardCompBox >
        <BarChartCom data={Chardata} />
        <SimpleLineChart data={data}/>
      </DashBoardCompBox> */}
      {/* <DashBoardCompBox style={{ width: "100%", padding: "20px" }}>
        <ColumnContainer>
          <LeftColumn>
            <h6>1.How would you rate the overall quality of the porduct</h6>
            <StarRating readOnly />
          </LeftColumn>
          <RightColumn>
            <SurveyBarChart data={Surveydata} />
          </RightColumn>
        </ColumnContainer> 
      </DashBoardCompBox>*/}
      
    </CenteredContainer>
  );
};

export default EmpDashBoard;
