import React, { useState, useEffect } from "react";
// import BarChart from "../../../components/BarChart";
import { CenteredContainer } from "../../../styles/TableStyling";
import Calendar from "react-calendar";
import "../../../styles/CalenderCom.css";
import ReactWeather from "react-open-weather";
import PieChartCom from "../../../components/PieChart";
import styled from "styled-components";
import BarChartCom from "../../../components/BarChart";
import EmployeeInfo from "../../../components/EmployeeInfo";
import { LeftColumn,RightColumn,ColumnContainer } from "../../EmpSetting";
import SurveyPieChart from "../../../components/SurveyPieChart";
import { AiOutlineUser } from "react-icons/ai";
import { H6 } from "../../../styles/MultiStepFormStyling";
const Chardata = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const Surveydata = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];



const MiddleColumn=styled.div`
flex:1;
padding:0px 10px;
`
const ContentAreaCards = styled.div`
  display: flex;

  gap: 16px;
  // width: 400px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  margin-bottom: 10px;
`;
const DashBoardCompBox=styled.div`
background:white;
border-radius:10px;
box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
padding:10px;
// width:400px;
margin-bottom:10px;
`
const Icon = styled.div`
  background: lightgrey;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px; 
  height: 45px; 
  margin-right: 20px; 
  color:grey;
`;



const EmpDashBoard = (employees) => {
  const currentDate = new Date();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const key = "8dad3db309e50de33c8cdefbe69cec74";
  const lat = "48.137154";
  const lon = "11.576124";
  const lang = "en";
  const unit = "metric";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&lang=${lang}&appid=${key}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const result = await response.json();
        console.log("Weather data fetched:", result);
        setData(result);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [key, lat, lon, lang, unit]);

  const tileDisabled = ({ date }) => {
    return (
      date.getMonth() !== currentDate.getMonth() ||
      date.getFullYear() !== currentDate.getFullYear()
    );
  };

  return (
    <CenteredContainer>
      <ColumnContainer>
      <LeftColumn style={{paddingRight:'0'}}>
      <div
        style={{
          height: "500px",
          background: "white",
          // width: "400px",
          padding: "20px",
          marginRight:"10px",
          marginBottom: "10px",
          borderRadius: "10px",
          boxShadow: "0 4px 24px 0 rgba(34, 41, 47, 0.1)",
        }}
      >
        
        <Calendar tileDisabled={tileDisabled} value={currentDate} />
        <hr />
        <h5>Upcoming Events</h5>
        
                <EmployeeInfo  />
              
      </div>
      </LeftColumn>
      <MiddleColumn>
      <DashBoardCompBox style={{padding:"20px"}}>
        <h4>Summery</h4>
        <div style={{ display: 'flex', alignItems: 'center',marginBottom:"20px" }}>
          <Icon>
      <AiOutlineUser style={{ fontSize: '24px' }} />
       </Icon>
      <div>
        <H6 style={{fontWeight:"bold",margin: '0'}}>89</H6> 
        <H6 style={{color:"grey",margin: '0'}}>interview</H6>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center',marginBottom:"20px" }}>
          <Icon>
      <AiOutlineUser style={{ fontSize: '24px' }} />
       </Icon>
      <div>
        <H6 style={{fontWeight:"bold",margin: '0'}}>89</H6> 
        <H6 style={{color:"grey",margin: '0'}}>interview</H6>
      </div>
    </div>
      </DashBoardCompBox>
      </MiddleColumn > 
      <RightColumn style={{paddingRight:'0',marginRight:'0'}}>
      <div>
        <ContentAreaCards>
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
      </div>
      
      {/* <div>
        {/* {isLoading && <p>Loading weather data...</p>}
        {errorMessage && <p>Error: {errorMessage}</p>} 
        {data && (
          <ReactWeather
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang="en"
            locationLabel="Munich"
            unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
            showForecast
          />
        )}
      </div> */}
      <DashBoardCompBox style={{height:"300px"}}>
        {/* <h1>aleem</h1> */}
        <SurveyPieChart/>
      </DashBoardCompBox>
      </RightColumn>
      </ColumnContainer>
      <DashBoardCompBox style={{width:"50%"}}>
      <BarChartCom data={Chardata}/>
      </DashBoardCompBox>
      
      
    </CenteredContainer>
  );
};

export default EmpDashBoard;

