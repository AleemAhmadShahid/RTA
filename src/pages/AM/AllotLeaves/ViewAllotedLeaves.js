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
        <FormLabel>Name</FormLabel>
        <H6 style={{ width: "300px" }}>{allotedLeaves.name}</H6>
      </FormGroup>
     
       
      {allotedLeaves.startTime && (
        <FormGroup>
          <FormLabel>Start Time</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6 style={{ width: "300px" }}>
              {new Date(allotedLeaves?.startTime).toLocaleString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit"
              })}
            </H6>
          </div>
        </FormGroup>
      )}

      {allotedLeaves.endTime && (
        <FormGroup>
          <FormLabel>End Time</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6 style={{ width: "300px" }}>
              {new Date(allotedLeaves?.endTime).toLocaleString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit"
              })}
            </H6>
          </div>
        </FormGroup>
      )}

      {(
        <FormGroup>
          <FormLabel>Break Duration</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6>{allotedLeaves.breakDuration} minute(s)</H6>
          </div>
        </FormGroup>
      )}
      
    </FormStep>
  );
};

export default ViewAllotedLeaves;
