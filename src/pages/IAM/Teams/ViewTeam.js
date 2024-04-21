import React, { useState, useEffect }  from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  H6,
} from "../../../styles/MultiStepFormStyling";

import EmployeeInfo from "../../../components/EmployeeInfo";
import { createGetRequest } from "../../../global/requests";

const ViewTeam = ({ team}) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const params = {
      teams: team._id,
    };

    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/user", params);
        if (data.status === 404) {
          setEmployees([]);
          return;
        }
        setEmployees(data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };
   
    fetchData();

  });

  return (
    <FormStep active>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <H6 style={{ width: "300px" }}>{team.name}</H6>
      </FormGroup>
     
       
      {team.description && team.description !== "" && (
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6>{team.description}</H6>
          </div>
        </FormGroup>
      )}

    {
        employees.length > 0 &&
        (
          <FormGroup>
            <FormLabel>Employees with this team</FormLabel>
            {employees.map((employee)=> <EmployeeInfo employee={employee}/>)}
          </FormGroup>
        )
    }
      
    </FormStep>
  );
};

export default ViewTeam;
