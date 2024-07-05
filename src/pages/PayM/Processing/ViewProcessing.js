import React, { useState, useEffect }  from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  H6,
} from "../../../styles/MultiStepFormStyling";

import EmployeeInfo from "../../../components/EmployeeInfo";
import { createGetRequest } from "../../../global/requests";

const ViewCycle = ({ cycle}) => {

 


  return (
    <FormStep active>
      <FormGroup>
        <FormLabel>Cycle Type</FormLabel>
        <H6 style={{ width: "300px" }}>{cycle.cycleType}</H6>
      </FormGroup>
           
    </FormStep>
  );
};

export default ViewCycle;
