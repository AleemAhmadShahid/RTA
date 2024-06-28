import React  from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  H6,
} from "../../../styles/MultiStepFormStyling";


const ViewAllotedLeaves = ({ allotedLeaves}) => {
  return (
    <FormStep active>
      <FormGroup>
        <FormLabel>Employee</FormLabel>
        <H6 style={{ width: "300px" }}>{allotedLeaves.employee}</H6>
      </FormGroup>
     
       
      {allotedLeaves.duration && (
        <FormGroup>
          <FormLabel>Duration</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6 style={{ width: "300px" }}>
              {allotedLeaves.duration}
            </H6>
          </div>
        </FormGroup>
      )}

      {allotedLeaves.renewAt && (
        <FormGroup>
          <FormLabel>Renew At</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6 style={{ width: "300px" }}>
              {allotedLeaves.renewAt }
            </H6>
          </div>
        </FormGroup>
      )}

    </FormStep>
  );
};

export default ViewAllotedLeaves;
