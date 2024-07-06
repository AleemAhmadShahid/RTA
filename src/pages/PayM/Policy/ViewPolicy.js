import React, { useState, useEffect }  from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  H6,
} from "../../../styles/MultiStepFormStyling";

import EmployeeInfo from "../../../components/EmployeeInfo";
import { createGetRequest } from "../../../global/requests";

const ViewPolicy = ({ policy}) => {

 


  return (
    <FormStep active>
      <FormGroup>
        <FormLabel>Policy Type</FormLabel>
        <H6 style={{ width: "300px" }}>{policy.policyType}</H6>
      </FormGroup>
           
    </FormStep>
  );
};

export default ViewPolicy;
