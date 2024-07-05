import React, { useEffect, useState } from "react";
import {
  AddEmployeeButton,
  CenteredContainer,
  EntriesDropdown,
} from "../../styles/TableStyling";
import RemoteTrackingTable, {
  FirstBox,
} from "../../components/RemoteTrackingTable"; // Assuming the path to RemoteTrackingTable is correct
import { Box } from "../../components/RemoteTrackingTable";
import { Details } from "../../components/EmpProfileMainPage";
import { createGetRequest } from "../../global/requests";
// import styled from "styled-components";
import { AddButton } from "../../components/AddTask";
import { Icon } from "../CardsPopup";
import { VscEye } from "react-icons/vsc";
import { AiOutlineUser } from "react-icons/ai";
// import { AddButton } from "../CardsPopup";
import { dropDownStyle } from "../../styles/TableStyling";
import CandidateTable from "../../components/CandidateTable";
import { Td } from "../../styles/TableStyling";
import { DashBoardCompBox } from "../IAM/EmpDashBoard/EmpDashBoard";
const RemoteTrackingMainPage = ({}) => {
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await createGetRequest(
        `/api/selfservice/mss/upcomingTasks/`
      );
      delete response.status;
      setTasks(response);
    };

    fetchData();
  }, []);

  const data = [
    { _id: 1, name: "John Doe", designation: "Developer", performance: "Good" },
    {
      _id: 2,
      name: "Jane Doe",
      designation: "Manager",
      performance: "Average",
    },
    {
      _id: 3,
      name: "Alice Smith",
      designation: "Designer",
      performance: "Good",
    },
  ];

  const columns = [
    { key: "name", heading: "Name" },
    { key: "designation", heading: "Designation" },
    { key: "performance", heading: "Performance" },
  ];

  const keyField = "_id";
  const [selectedCheck, setSelectedCheck] = useState([]);
  
  const CheckOptions = ["Option 1", "Option 2", "Option 3"];

  const handleCheckChange = (option) => {
    if (selectedCheck.includes(option)) {
      setSelectedCheck(selectedCheck.filter((item) => item !== option));
    } else {
      setSelectedCheck([...selectedCheck, option]);
    }
  };








  const [searchQuery, setSearchQuery] = useState("");
  const [entries, setEntries] = useState("10");

  const Tdata = [
    { id: 1, name: "John Doe", age: 28 },
    { id: 2, name: "Jane Smith", age: 34 },
    { id: 3, name: "Jane Smith", age: 34 },
    { id: 4, name: "Jane Smith", age: 34 },
    
  ];

  const Tcolumns = [
    { field: "id", label: "ID" },
    { field: "name", label: "Name" },
    { field: "age", label: "Age" },
    
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleEntriesChange = (value) => {
    setEntries(value);
  };

  const renderRow = (item, columns) => {
    return columns.map(column => (
      <Td key={column.field}>{item[column.field]}</Td>
    ));
  };











  return (
    <CenteredContainer>
      <Box
        style={{
          background: "white",
          // boxShadow: "none",
          padding: "20px",
          justifyContent:"none"
        }}
      >
       
  <div style={{ display: "flex", gap: "10px" }}>
    <div style={{display:"flex",alignItems:"center"}}>
  <EntriesDropdown
                  value={"Select"}
                  options={CheckOptions.map((option) => ({
                    value: option,
                    label: (
                      <div
                        // onClick={() =>
                        //   handleCheckChange(
                        //     option,
                        //     selectedCheck,
                        //     setSelectedCheck
                        //   )
                        // }
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        
                        <span>{option}</span>
                      </div>
                    ),
                  }))}
                  styles={{ ...dropDownStyle }}
                />
                </div>

    <AddButton
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 10px",
      }}
    >
      <Icon>
        <VscEye />
      </Icon>
      Show
    </AddButton>
    <AddButton
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 10px",
       
      }}
    >
      <Icon>
        <AiOutlineUser/>
      </Icon>
     <span  style={{ whiteSpace: "nowrap"}}>My Team</span> 
    </AddButton>
  </div>
  <div style={{ marginLeft: "auto" }}>
    <AddEmployeeButton>+ Add new task</AddEmployeeButton>
  </div>
{/* </div> */}

      </Box>
      {Object.keys(tasks).map((key) => (
        <React.Fragment key={key}>
          <Box
            style={{
              background: "transparent",
              boxShadow: "none",
              padding: "20px",
            }}
          >
            <FirstBox>
              <Details
                style={{ fontSize: "18px", fontWeight: "500" }}
              >{`#${key}`}</Details>
              <Details
                style={{ fontSize: "14px", color: "grey" }}
              >{`. ${tasks[key].length} tasks`}</Details>
            </FirstBox>
            <Details>Due Date</Details>
            <Details>Status</Details>
            <Details>Assigned To</Details>
            <Details>Action</Details>
          </Box>
          {Array.isArray(tasks[key]) ? (
            tasks[key].map((task, index) => (
              <React.Fragment key={task._id}>
                <RemoteTrackingTable task={tasks[key][index]} />
              </React.Fragment>
            ))
          ) : (
            <div></div>
          )}
        </React.Fragment>
      ))}
      
       <DashBoardCompBox style={{marginTop:"20px"}}>
        <CandidateTable
        loading={false}
        data={Tdata}
        columns={Tcolumns}
        renderRow={renderRow}
        keyField="id"
        searchQuery={searchQuery}
        entries={entries}
        onSearch={handleSearch}
        onEntriesChange={handleEntriesChange}
        buttontext={"Add candidate"}
        
        />

      </DashBoardCompBox>
    </CenteredContainer>
  );
};

export default RemoteTrackingMainPage;
