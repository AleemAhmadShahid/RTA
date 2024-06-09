import React  from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  H6,
} from "../../../styles/MultiStepFormStyling";


const ViewAppliedLeaves = ({ appliedLeave}) => {
  return (
    <FormStep active>
      <FormGroup>
        <FormLabel>User</FormLabel>
        <H6 style={{ width: "300px" }}>{appliedLeave.employee}</H6>
      </FormGroup>

      <FormGroup>
        <FormLabel>Leave Type</FormLabel>
        <H6 style={{ width: "300px" }}>{appliedLeave.leaveType}</H6>
      </FormGroup>
     
       
      {appliedLeave.startDate && (
        <FormGroup>
          <FormLabel>Start Date</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6 style={{ width: "300px" }}>
              {new Date(appliedLeave?.startDate).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit"
              })}
            </H6>
          </div>
        </FormGroup>
      )}

      {appliedLeave.endDate && (
        <FormGroup>
          <FormLabel>End Date</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6 style={{ width: "300px" }}>
              {new Date(appliedLeave?.endDate).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit"
              })}
            </H6>
          </div>
        </FormGroup>
      )}

      {appliedLeave.reason && (
        <FormGroup>
          <FormLabel>Reason</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6 style={{ width: "300px" }}>
              {appliedLeave.reason}
            </H6>
          </div>
        </FormGroup>
      )}

      {appliedLeave.remarks && (
        <FormGroup>
          <FormLabel>Remarks</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6 style={{ width: "300px" }}>
              {appliedLeave.remarks}
            </H6>
          </div>
        </FormGroup>
      )}
     
    </FormStep>
  );
};

export default ViewAppliedLeaves;
