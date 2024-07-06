import React, { useState, useEffect }  from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  H6,
} from "../../../styles/MultiStepFormStyling";

import EmployeeInfo from "../../../components/EmployeeInfo";
import { createGetRequest } from "../../../global/requests";

const ViewPolicy = ({ reimbursement}) => {

 


  return (
    <FormStep active>
      <FormGroup>
        <FormLabel>Expense Type</FormLabel>
        <H6 style={{ width: "300px" }}>{reimbursement.expenseType}</H6>
      </FormGroup>
      <FormGroup>
        <FormLabel>Amount</FormLabel>
        <H6 style={{ width: "300px" }}>{reimbursement.amount}</H6>
      </FormGroup>
           
    </FormStep>
  );
};

export default ViewPolicy;
