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
import { H6, Line } from "../../../styles/MultiStepFormStyling";
import EmployeeCard from "../../../components/EmployeeCard";
import SurveyBarChart from "../../../components/SurveyBarChart";
import StarRating from "../../../components/StarRating";
import MeetingInvitation from "../../../components/MeetingInvitation";
// import UpcomingEvent from "../../../components/UpcomingEvent";
import { Details } from "../../MM/MeetingMainPage";
import SimpleLineChart from "../../../components/LineChart";
import UpcomingEvent from "../../../components/UpcomingEvent";


import { Td,Tr,
    Th,
    AddEmployeeContainer,
    Table,
    SuccessBadge,
    DangerBadge,
    CreateEmployeeHeading,
    BoxContainer,
    AddEmployeeButton,
    HeadingAndSearchContainer,
    TableContainer,
    
    
    IconWrapper,
   

 } from "../../../styles/TableStyling";
 import * as MdIcons from "react-icons/md";
 import LoaderComponent from "../../../components/Loader";
import CheckIn from "../../../components/CheckIn";
















export const Linedata = [
  {
    name: 'Jan 24',
    Attendance: 20,
    // pv: 2400,
    // amt: 2400,
  },
  {
    name: 'Feburary 24',
    Attendance: 21,
    // pv: 1398,
    // amt: 2210,
  },
  {
    name: 'March 24',
    Attendance: 29,
    // pv: 9800,
    // amt: 2290,
  },
  {
    name: 'April 24',
    Attendance: 31,
    // pv: 3908,
    // amt: 2000,
  },
  {
    name: 'May 24',
    Attendance: 30,
    // pv: 4800,
    // amt: 2181,
  },
  {
    name: 'June 24',
    Attendance: 28,
    // pv: 3800,
    // amt: 2500,
  },
  {
    name: 'July 24',
    Attendance: 27,
    // pv: 4300,
    // amt: 2100,
  },
];
export const Chardata = [
  {
    name: "Page A",
    Attendance: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    Attendance: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    Attendance: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    Attendance: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    Attendance: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    Attendance: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    Attendance: 3490,
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

const SSDashBoard = (employees) => {

    const [selectedCheck, setSelectedCheck] = useState([
        "User",
        "Designation",
        "Performance",
       
        "Actions",
      ]);



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
        <LeftColumn style={{ flex: "2" }}>
            <ColumnContainer>
            <LeftColumn><DashBoardCompBox style={{padding:"0"}}>
          <CheckIn width="100%" saveAndNextButtonText="Check In" saveButtonText="Check Out"/>
          </DashBoardCompBox></LeftColumn>
            <RightColumn><DashBoardCompBox style={{padding:"20px"}}>
          <div style={{ marginBottom: "30px" }}>
            <h5>Task Deadlines</h5>

            <UpcomingEvent event="Fix#11 Status Code" date="29 June 2024" />
            <UpcomingEvent event="Feature#77 Extension Development " date="1 July 2024" />
            <UpcomingEvent event="Feature#78 Help Document " date="4 July 2024" />
          </div>
          </DashBoardCompBox></RightColumn></ColumnContainer>
          <DashBoardCompBox>
            <h5 style={{ marginLeft: "10px", marginTop: "10px" }}>
              Remaining Leaves
            </h5>
            <CardsContainer>
              <ContentAreaCards style={{ boxShadow: "none" }}>
                <PieChartCom
                  colors={["#e4e8ef", "blue"]}
                  percentFillValue={40}
                  cardInfo={{
                    title: "Annual",
                    value: "40",
                    text: "Today",
                  }}
                />
              </ContentAreaCards>
              <ContentAreaCards style={{ boxShadow: "none" }}>
                <PieChartCom
                  colors={["#e4e8ef", "#ffa500"]}
                  percentFillValue={5}
                  cardInfo={{
                    title: "Sick",
                    value: "5",
                    text: "Today",
                  }}
                />
              </ContentAreaCards>
              <ContentAreaCards style={{ boxShadow: "none" }}>
                <PieChartCom
                  colors={["#e4e8ef", "green"]}
                  percentFillValue={65}
                  cardInfo={{
                    title: "Family",
                    value: "25",
                    text: "Today",
                  }}
                />
              </ContentAreaCards>
              <ContentAreaCards style={{ boxShadow: "none" }}>
                <PieChartCom
                  colors={["#e4e8ef", "red"]}
                  percentFillValue={0}
                  cardInfo={{
                    title: "Others",
                    value: "0",
                    text: "Today",
                  }}
                />
              </ContentAreaCards>
            </CardsContainer>
          </DashBoardCompBox>
          <DashBoardCompBox style={{ height: "300px" }}>
            <SimpleLineChart data={Linedata} height={300} />
          </DashBoardCompBox>






          <DashBoardCompBox >
          <h5 style={{ marginLeft: "10px", marginTop: "10px" }}>
            Employee Performance
            </h5>
          <TableContainer>
               <Table>
                <thead>
                  <Tr>
                    
                    {selectedCheck.includes("User") && <Th style={{ background: "white", textAlign: "left" }}>Name</Th>}
                    
                    {selectedCheck.includes("Designation") && (
                      <Th style={{ background: "white", textAlign: "left" }}>Desigenation</Th>
                    )}
                    {selectedCheck.includes("Performance") && (
                      <Th style={{ background: "white", textAlign: "left" }}>Performance</Th>
                    )}
                    {/* {selectedCheck.includes("Member Since") && (
                      <Th>MEMBER SINCE</Th>
                    )}
                    {selectedCheck.includes("Status") && <Th>STATUS</Th>} */}
                    {selectedCheck.includes("Actions") && <Th style={{ background: "white", textAlign: "left" }}>ACTION</Th>}
                  </Tr>
                </thead>
                {/* <Line/> */}
                <tbody>
                  {/* {loading ? ( */}
                    <tr>
                      <td colSpan="6">
                        <LoaderComponent />
                      </td>
                    </tr>
                {/*   ) : (
                     employees &&
                    employees.map((employee) => (
                     <Tr key={employee._id}> */}
                        <Tr>
                        
                        {selectedCheck.includes("User") && (
                          <Td>
                            {/* <EmployeeInfo employee={employee} /> */}
                            <EmployeeInfo  />
                          </Td>
                        )}

                        {selectedCheck.includes("Designation") && (
                          <Td></Td>
                        )}
                        {/* {selectedCheck.includes("Performance") && (
                          <Td>
                            {(employee.lastLogin &&
                              new Date(employee.lastLogin).toLocaleString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )) ||
                              "Resend Invite"}
                          </Td>
                        )}
                         */}
                        {selectedCheck.includes("Performance") && (
                          <Td>
                            {/* {employee.status === 1 ? ( */}
                              <SuccessBadge >Good</SuccessBadge>
                            {/* ) :  */}
                            {/* employee.status === 2 ? ( */}

                              {/* <DangerBadge>Average</DangerBadge> */}
                            {/* ) : ( */}

                              {/* <DangerBadge>Deleted</DangerBadge> */}
                            {/* )} */}
                          </Td>
                        )}
                        {selectedCheck.includes("Actions") && (
                          <Td>
                            <IconWrapper>
                              <MdIcons.MdOutlineModeEditOutline
                                // onClick={() => {
                                //   setFormData(employee);
                                //   setShowForm(true);
                                //   setIsEditMode(!!employee);
                                // }}
                                style={{ fontSize: "18px" }}
                              />
                            </IconWrapper>

                            {/* <GrIcons.GrFormView
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => navigate(`/portal/iam/employee/${employee._id}`)}
                            />

                            <MdIcons.MdDeleteOutline
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => {
                                dispatch(setErrorModal({message: "Do you want to delete this employee?", handleYes: () => {
                                  deleteEmployee(employee._id);
                                }}));
                              }}
                            /> */}
                          </Td>
                        )}
                      </Tr>
                    {/* )) */}
                  {/* )} */}
                  {/* {!loading && (!employees || employees.length === 0) && (
                    <tr>
                      <td colSpan="6">No Data to Show</td>
                    </tr>
                  )} */}
                </tbody>
              </Table> 
            </TableContainer>
          </DashBoardCompBox>







        </LeftColumn>
        <RightColumn>
          <div
            style={{
              // height: "500px",
              background: "white",

              padding: "20px",
              //    marginLeft: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              boxShadow: "0 4px 24px 0 rgba(34, 41, 47, 0.1)",
            }}
          >
            <h6>Calender</h6>
            <Calendar
              value={date}
              onChange={setDate}
              tileDisabled={tileDisabled}
              view="month"
              navigationLabel={renderNavigationLabel}
              prev2Label={null}
              next2Label={null}
              showNeighboringMonth={false}
              //   width="100%"
            />
            <div style={{ marginBottom: "30px" }}></div>
            <h6>Upcoming Events</h6>

            <UpcomingEvent event="Data science workshop" date="2 July 2024" />
            <UpcomingEvent event="Weekly Team Meeting" date="2 July 2024" />
            <UpcomingEvent event="Dev Status" date="3 July 2024" />
          </div>

          <DashBoardCompBox style={{ border: "none", padding: "10px" }}>
            <h6>Pending Leaves</h6>
            <MeetingInvitation
              width="100%"
              saveButtonText="Accept"
              saveAndNextButtonText="Reject"
            />
            {/* <MeetingInvitation
              width="100%"
              saveButtonText="Accept"
              saveAndNextButtonText="Reject"
            /> */}
          </DashBoardCompBox>
        </RightColumn>
      </ColumnContainer>
     
    </CenteredContainer>
  );
};

export default SSDashBoard;
