// import React, { useState, useEffect } from "react";
// // import BarChart from "../../../components/BarChart";
// import { CardsContainer, CenteredContainer } from "../../../styles/TableStyling";
// import Calendar from "react-calendar";
// import "../../../styles/CalenderCom.css";

// import PieChartCom from "../../../components/PieChart";
// import styled from "styled-components";
// import BarChartCom from "../../../components/BarChart";
// import EmployeeInfo from "../../../components/EmployeeInfo";
// import { LeftColumn, RightColumn, ColumnContainer } from "../../EmpSetting";
// import SurveyPieChart from "../../../components/SurveyPieChart";
// import { AiOutlineUser } from "react-icons/ai";
// import { H6 } from "../../../styles/MultiStepFormStyling";
// import EmployeeCard from "../../../components/EmployeeCard";
// import SurveyBarChart from "../../../components/SurveyBarChart";
// import StarRating from "../../../components/StarRating";
// import UpcomingEvent from "../../../components/UpcomingEvent";
// export const Chardata = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

// export const Surveydata = [
//   { name: "1 star", pv: 24, amt: 2400, color: "#8884d8" },
//   { name: "2 star", pv: 13, amt: 2210, color: "#82ca9d" },
//   { name: "3 star", pv: 98, amt: 2290, color: "#ffc658" },
//   { name: "4 star", pv: 39, amt: 2000, color: "#ff7300" },
//   { name: "5 star", pv: 48, amt: 2181, color: "#387908" },
// ];

// export const MiddleColumn = styled.div`
//   flex: 1;
//   padding: 0px 10px;
// `;

// export const ContentAreaCards = styled.div`
//   border-radius: 10px;
//   background: white;
//   box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
//   margin-bottom: 10px;
// `;

// export const DashBoardCompBox = styled.div`
//   background: white;
//   border-radius: 10px;
//   box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
//   padding: 10px;
//   margin-bottom: 10px;
// `;
// export const ScrollContainer = styled.div`
//   display: flex;
//   overflow-x: auto;
//   white-space: nowrap;
//   -webkit-overflow-scrolling: touch;

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;
// export const Icon = styled.div`
//   background: lightgrey;
//   border-radius: 15px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 45px;
//   height: 45px;
//   margin-right: 20px;
//   color: grey;
// `;

// const EmpDashBoard = (employees) => {
//   const currentDate = new Date();
//   const [data, setData] = useState(null);
//   const [date, setDate] = useState(currentDate);

//   const tileDisabled = ({ date, view }) => {
//     return (
//       view === "month" &&
//       (date.getMonth() !== currentDate.getMonth() ||
//         date.getFullYear() !== currentDate.getFullYear())
//     );
//   };

//   const renderNavigationLabel = ({ date, view }) => {
//     const isCurrentMonth =
//       date.getMonth() === currentDate.getMonth() &&
//       date.getFullYear() === currentDate.getFullYear();
//     return isCurrentMonth ? (
//       <span>
//         {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
//       </span>
//     ) : (
//       <button disabled>
//         {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
//       </button>
//     );
//   };

//   return (
//     <CenteredContainer>
//       <CardsContainer>
//       <ContentAreaCards>
//             <PieChartCom
//               colors={["#e4e8ef", "blue"]}
//               percentFillValue={40}
//               cardInfo={{
//                 title: "Active Employees",
//                 value: "40",
                
//               }}
//             />
//           </ContentAreaCards>
//           <ContentAreaCards>
//             <PieChartCom
//               colors={["#e4e8ef", "#ffa500"]}
//               percentFillValue={5}
//               cardInfo={{
//                 title: "Absent Employees",
//                  value: "5",
//                 text:"Absent Employee are 5",
                
//               }}
//             />
//           </ContentAreaCards><ContentAreaCards>
//             <PieChartCom
//               colors={["#e4e8ef", "green"]}
//               percentFillValue={65}
//               cardInfo={{
//                 title: "On Time Today",
//                 value: "25",
                
//               }}
//             />
//           </ContentAreaCards><ContentAreaCards>
//             <PieChartCom
//               colors={["#e4e8ef", "red"]}
//               percentFillValue={0}
//               cardInfo={{
//                 title: "Late Today",
//                 value: "0",
//                 // text: "We have sold 123 items.",
//               }}
//             />
//           </ContentAreaCards>
//           </CardsContainer>
//       <ScrollContainer>
//         <DashBoardCompBox style={{ marginRight: "10px" }}>
//           <EmployeeCard name="Shaheer Imran" role="Banana Eater" />
//         </DashBoardCompBox>
//         <DashBoardCompBox style={{ marginRight: "10px" }}>
//           <EmployeeCard name="Muhammad Shaheer" role="Banana Eater" />{" "}
//         </DashBoardCompBox>
//         <DashBoardCompBox style={{ marginRight: "10px" }}>
//           <EmployeeCard name="Shaheer " role="Banana Eater" />
//         </DashBoardCompBox>
//         <DashBoardCompBox style={{ marginRight: "10px" }}>
//           <EmployeeCard name="Imran" role="Banana Eater" />
//         </DashBoardCompBox>

//         <DashBoardCompBox style={{ marginRight: "10px" }}>
//           <EmployeeCard name="Shaheer Imran" role="Banana Eater" />
//         </DashBoardCompBox>
//         <DashBoardCompBox style={{ marginRight: "10px" }}>
//           <EmployeeCard name="Shaheer Imran" role="Banana Eater" />
//         </DashBoardCompBox>
//       </ScrollContainer>
//       <ColumnContainer>
//         <LeftColumn style={{ paddingRight: "0" }}>
//           <div
//             style={{
//               // height: "500px",
//               background: "white",

//               padding: "20px",
//               marginRight: "10px",
//               marginBottom: "10px",
//               borderRadius: "10px",
//               boxShadow: "0 4px 24px 0 rgba(34, 41, 47, 0.1)",
//             }}
//           >
//             <h6>Calender</h6>
//             <Calendar
//               value={date}
//               onChange={setDate}
//               tileDisabled={tileDisabled}
//               view="month"
//               navigationLabel={renderNavigationLabel}
//               prev2Label={null}
//               next2Label={null}
//               showNeighboringMonth={false}
//             />
//             <div style={{ marginBottom: "30px" }}></div>
//             <h6>Upcoming Events</h6>

//             <UpcomingEvent event="Data science workshop" date="1 March 2024" />
//             <UpcomingEvent event="Data science workshop" date="1 March 2024" />
//             <UpcomingEvent event="Data science workshop" date="1 March 2024" />
//           </div>
//         </LeftColumn>
//         <MiddleColumn>
//           <DashBoardCompBox style={{ padding: "20px" }}>
//             <h4>Summery</h4>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginBottom: "20px",
//               }}
//             >
//               <Icon>
//                 <AiOutlineUser style={{ fontSize: "24px" }} />
//               </Icon>
//               <div>
//                 <H6 style={{ fontWeight: "bold", margin: "0" }}>89</H6>
//                 <H6 style={{ color: "grey", margin: "0" }}>interview</H6>
//               </div>
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginBottom: "20px",
//               }}
//             >
//               <Icon>
//                 <AiOutlineUser style={{ fontSize: "24px" }} />
//               </Icon>
//               <div>
//                 <H6 style={{ fontWeight: "bold", margin: "0" }}>89</H6>
//                 <H6 style={{ color: "grey", margin: "0" }}>interview</H6>
//               </div>
//             </div>
//           </DashBoardCompBox>
//         </MiddleColumn>
//         <RightColumn>
//           <ContentAreaCards>
//             <PieChartCom
//               colors={["#e4e8ef", "#475be8"]}
//               percentFillValue={69}
//               cardInfo={{
//                 title: "Todays Sales",
//                 value: "$20.4K",
//                 text: "We have sold 123 items.",
//               }}
//             />
//           </ContentAreaCards>
//           <ContentAreaCards>
//             <PieChartCom
//               colors={["#e4e8ef", "green"]}
//               percentFillValue={67}
//               cardInfo={{
//                 title: "Shaheers BSDK level",
//                 value: "$69K",
//                 text: "We have sold 123 items.",
//               }}
//             />
//           </ContentAreaCards>

//           <DashBoardCompBox style={{ padding: "20px" }}>
//             <h5 style={{ fontWeight: "bold" }}>Offer acceptance</h5>
//             <ContentAreaCards
//               style={{
//                 display: "flex",
//                 justifyContent: "space-evenly",
//                 alignItems: "center",
//                 boxShadow: "none",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <PieChartCom
//                   colors={["#e4e8ef", "green"]}
//                   percentFillValue={76}
//                   cardInfo={{
//                     title: "",
//                     value: "",
//                     text: "",
//                   }}
//                 />
//                 <h6>Accepted</h6>
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <PieChartCom
//                   colors={["#e4e8ef", "orange"]}
//                   percentFillValue={23}
//                   cardInfo={{
//                     title: "",
//                     value: "",
//                     text: "",
//                   }}
//                 />
//                 <h6>Rejected</h6>
//               </div>
//             </ContentAreaCards>
//           </DashBoardCompBox>
//           <DashBoardCompBox style={{ height: "300px" }}>
//             <SurveyPieChart />
//           </DashBoardCompBox>
//         </RightColumn>
//       </ColumnContainer>
//       <DashBoardCompBox style={{ width: "50%" }}>
//         <BarChartCom data={Chardata} />
//       </DashBoardCompBox>
//       <DashBoardCompBox style={{ width: "100%", padding: "20px" }}>
//         <ColumnContainer>
//           <LeftColumn>
//             <h6>1.How would you rate the overall quality of the porduct</h6>
//             <StarRating readOnly />
//           </LeftColumn>
//           <RightColumn>
//             <SurveyBarChart data={Surveydata} />
//           </RightColumn>
//         </ColumnContainer>
//       </DashBoardCompBox>
//       <DashBoardCompBox style={{}}>
//         {/* <StarRating /> */}

//         {/* <h2>Disabled Rating main</h2>
//       <StarRating disabled /> */}
//       </DashBoardCompBox>
//     </CenteredContainer>
//   );
// };

// export default EmpDashBoard;
