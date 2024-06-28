import React from "react";
import { CenteredContainer } from "../../styles/TableStyling";
import RemoteTrackingTable, { FirstBox } from "../../components/RemoteTrackingTable"; // Assuming the path to RemoteTrackingTable is correct
import { Box } from "../../components/RemoteTrackingTable";
import { Details } from "../../components/EmpProfileMainPage";
const RemoteTrackingMainPage = ({}) => {
  // Example data and columns configuration
  const data = [
    { _id: 1, name: "John Doe", designation: "Developer", performance: "Good" },
    { _id: 2, name: "Jane Doe", designation: "Manager", performance: "Average" },
    { _id: 3, name: "Alice Smith", designation: "Designer", performance: "Good" },
  ];

  const columns = [
    { key: 'name', heading: 'Name' },
    { key: 'designation', heading: 'Designation' },
    { key: 'performance', heading: 'Performance' },
  ];

  const keyField = '_id';

  return (
    <CenteredContainer >
<Box style={{background:"transparent",boxShadow:"none",padding:"20px"}}>
  
    <FirstBox>
<Details style={{fontSize:"18px",fontWeight:"500"}}>#Done</Details>
     
      <Details style={{fontSize:"14px",color:"grey"}}>. 3 task</Details>
       
       </FirstBox>
       <Details>Storage type</Details>
       <Details>Due Date </Details>
       <Details >Prority</Details>
      <Details>Comments </Details>
      <Details >Status</Details>
      <Details>Assignee</Details>
      
</Box>
      <RemoteTrackingTable
      />
       <RemoteTrackingTable
      /> <RemoteTrackingTable
      />
    </CenteredContainer>
  );
};

export default RemoteTrackingMainPage;
