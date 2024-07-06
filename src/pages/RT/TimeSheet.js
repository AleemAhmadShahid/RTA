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

const TimeSheet = ({}) => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await createGetRequest(
        `/api/session/`
      );
      delete response.status;
      setSessions(response.sessions);
    };

    fetchData();
  }, []);



 

  return (
    <CenteredContainer>

      {sessions.map((session, index) => (
        <>
          <b>{new Date(session.startTime).toLocaleDateString()} - {index} hours</b>
          <br></br>
          <br></br>
          {session.screenshots.map((screenshot) =>  (<img src={screenshot}></img>))}
          {session.screenshots.length === 0 && (
            <>
              <br />
              No Screenshots found!
              <br />
            </>
          )}

          <br></br>
        </>
      ))}
    
    

    </CenteredContainer>
  );
};

export default TimeSheet;
