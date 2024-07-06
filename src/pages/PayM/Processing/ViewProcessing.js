import React, { useState, useEffect }  from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  H6,
} from "../../../styles/MultiStepFormStyling";

import EmployeeInfo from "../../../components/EmployeeInfo";
import { createGetRequest } from "../../../global/requests";

const ViewProcessing = ({ processing}) => {

 


  return (
    <FormStep active>
      <FormGroup>
        <FormLabel>Start Date </FormLabel>
        <H6 style={{ width: "300px" }}>{processing.payPeriodStart}</H6>
      </FormGroup>
      <FormGroup>
        <FormLabel>End Date</FormLabel>
        <H6 style={{ width: "300px" }}>{processing.payPeriodEnd}</H6>
      </FormGroup>
    </FormStep>
  );
};

export default ViewProcessing;
