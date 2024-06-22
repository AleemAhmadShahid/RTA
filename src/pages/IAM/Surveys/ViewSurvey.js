import React, { useState, useEffect }  from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  H6,
} from "../../../styles/MultiStepFormStyling";

import EmployeeInfo from "../../../components/EmployeeInfo";
import { createGetRequest } from "../../../global/requests";

const ViewSurvey = ({ survey}) => {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const params = {
      surveys: survey._id,
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
        <FormLabel>Title</FormLabel>
        <H6 style={{ width: "300px" }}>{survey.title}</H6>
      </FormGroup>
     
       
      {survey.content && survey.content !== "" && (
        <FormGroup>
          <FormLabel>Content</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6>{survey.content}</H6>
          </div>
        </FormGroup>
      )}
      
    </FormStep>
  );
};

export default ViewSurvey;
