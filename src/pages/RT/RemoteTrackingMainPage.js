import React, {useEffect, useState} from "react";
import { CenteredContainer } from "../../styles/TableStyling";
import RemoteTrackingTable, { FirstBox } from "../../components/RemoteTrackingTable"; // Assuming the path to RemoteTrackingTable is correct
import { Box } from "../../components/RemoteTrackingTable";
import { Details } from "../../components/EmpProfileMainPage";
import {createGetRequest} from '../../global/requests'

const RemoteTrackingMainPage = ({}) => {

  const [tasks, setTasks] = useState({})

  useEffect(() => {
    const fetchData =  async () => {

      const response  =  await createGetRequest(`/api/selfservice/mss/upcomingTasks/`);
      delete response.status;
      setTasks(response);
    }

    fetchData();

  }, [])

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
      {
  Object.keys(tasks).map(key => (
    <React.Fragment key={key}>
      <Box style={{ background: "transparent", boxShadow: "none", padding: "20px" }}>
        <FirstBox>
          <Details style={{ fontSize: "18px", fontWeight: "500" }}>{`#${key}`}</Details>
          <Details style={{ fontSize: "14px", color: "grey" }}>{`. ${tasks[key].length} tasks`}</Details>
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
  ))
}


     
    </CenteredContainer>
  );
};

export default RemoteTrackingMainPage;
