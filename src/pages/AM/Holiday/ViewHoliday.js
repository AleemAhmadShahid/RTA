import React  from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  H6,
} from "../../../styles/MultiStepFormStyling";


const ViewHoliday = ({ holiday}) => {
  return (
    <FormStep active>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <H6 style={{ width: "300px" }}>{holiday.name}</H6>
      </FormGroup>
     
       
      {holiday.date && (
        <FormGroup>
          <FormLabel>Date</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6 style={{ width: "300px" }}>
              {new Date(holiday?.date).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              })}
            </H6>
          </div>
        </FormGroup>
      )}

      
    </FormStep>
  );
};

export default ViewHoliday;
