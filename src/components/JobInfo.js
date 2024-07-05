import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { CenteredContainer } from "../styles/TableStyling";
import { BoxContainer} from "./EmpProfileMainPage";
import { useNavigate } from "react-router-dom";
import { ColumnContainer, LeftColumn, RightColumn } from "../pages/EmpSetting";
import { Box } from "./RemoteTrackingTable";
import { DashBoardCompBox } from "../pages/PayM/PayMDashBoard";
import CandidateTable from "./CandidateTable";
import { BackIcon} from "./EmpProfileMainPage";
import { IoMdArrowBack } from "react-icons/io";
import LoaderComponent from "./Loader";
const GreyHeading = styled.span`
  font-weight:500;
  color: grey;
   flex: 0 0 40%;
   font-size:14px;
`;

const Details = styled.div`
  margin-bottom: 10px;
  font-weight:600;

  display: flex;
  align-items: center;
 
`;
const TextWithLine = styled.span`
  flex: 1;
   font-size:14px;
  border-bottom: 0.5px solid #ededed;
`;

const JobInfo=()=>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchData = async () => {
      
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <CenteredContainer>
        <LoaderComponent />
      </CenteredContainer>
    );
  }
   
    return(
<CenteredContainer>
    
<BackIcon style={{background:"orange"}}
            onClick={() => navigate(`/portal/applicationtrackingsystem/jobPosting`)}           
          >
            {" "}
            <IoMdArrowBack />
          </BackIcon>
      <DashBoardCompBox style={{ padding: "20px" }}>
        <h5 style={{ fontWeight:"bold" ,marginLeft:"30px"}}>Job Opening Information</h5>
        <ColumnContainer style={{padding:"40px"}}>
          <LeftColumn>
            <Details>
                
              <GreyHeading>Posting Title:</GreyHeading> 
              <TextWithLine>Accountant</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Number of Positions:</GreyHeading>
              <TextWithLine> 1</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Assigned Recruiters:</GreyHeading> 
              <TextWithLine>John Doe, Jane Smith</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Target Date:</GreyHeading> 
              <TextWithLine>2024-08-01</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Job Opening Status:</GreyHeading> 
              <TextWithLine>In Progress</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Industry:</GreyHeading>
              <TextWithLine>Finance</TextWithLine> 
            </Details>
            <Details>
              <GreyHeading>Salary:</GreyHeading> 
              <TextWithLine>$60,000 - $70,000</TextWithLine>
            </Details>
          </LeftColumn>
          <RightColumn>
            <Details>
              <GreyHeading>Job Opening ID:</GreyHeading> 
              <TextWithLine>12345</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Department Name:</GreyHeading>
              <TextWithLine>Accounting</TextWithLine> 
            </Details>
            <Details>
              <GreyHeading>Hiring Manager:</GreyHeading>
              <TextWithLine>Michael Johnson</TextWithLine> 
            </Details>
            <Details>
              <GreyHeading>Date Opened:</GreyHeading>
              <TextWithLine>2024-07-01</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Job Type:</GreyHeading>
              <TextWithLine>Full-Time</TextWithLine> 
            </Details>
            <Details>
              <GreyHeading>Work Experience:</GreyHeading> 
              <TextWithLine>3-5 years</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Modified By:</GreyHeading> 
              <TextWithLine>Sarah Lee</TextWithLine>
            </Details>
          </RightColumn>
        </ColumnContainer>
</DashBoardCompBox>
<DashBoardCompBox>
       
        <CandidateTable
          loading={false} // Replace with your loading state
          data={[{ id: 1, name: "John Doe", position: "Developer" }, { id: 2, name: "Jane Smith", position: "Designer" },{ id: 4, name: "Jane Smith", position: "Designer" },{ id: 3, name: "Jane Smith", position: "Designer" }]} // Replace with your candidate data
          columns={[
            { field: "name", label: "Name" },
            { field: "position", label: "Position" },
          ]}
          keyField="id"
          searchQuery=""
          entries="10"
          onSearch={() => {}}
          onEntriesChange={() => {}}
          buttontext="Add Employee"
        />
      </DashBoardCompBox>
    </CenteredContainer>
    );
}
export default JobInfo