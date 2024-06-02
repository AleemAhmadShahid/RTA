import React  from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  H6,
} from "../../../styles/MultiStepFormStyling";


const ViewShift = ({ shift}) => {
  return (
    <FormStep active>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <H6 style={{ width: "300px" }}>{shift.name}</H6>
      </FormGroup>
     
       
      {shift.startTime && (
        <FormGroup>
          <FormLabel>Start Time</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6 style={{ width: "300px" }}>
              {new Date(shift?.startTime).toLocaleString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit"
              })}
            </H6>
          </div>
        </FormGroup>
      )}

      {shift.endTime && (
        <FormGroup>
          <FormLabel>End Time</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6 style={{ width: "300px" }}>
              {new Date(shift?.endTime).toLocaleString("en-GB", {
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
            <H6>{shift.breakDuration} minute(s)</H6>
          </div>
        </FormGroup>
      )}
      
    </FormStep>
  );
};

export default ViewShift;
