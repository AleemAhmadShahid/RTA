import React  from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  H6,
} from "../../../styles/MultiStepFormStyling";

const ViewJobDescription = ({ jobDescription}) => {

  return (
    <FormStep active>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <H6 style={{ width: "300px" }}>{jobDescription.name}</H6>
      </FormGroup>
     
       
      {jobDescription.description && jobDescription.description !== "" && (
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6>{jobDescription.description}</H6>
          </div>
        </FormGroup>
      )}

      {
        jobDescription.skills && jobDescription.skills.length > 0 && (
          <FormGroup>
          <FormLabel>Skills</FormLabel>
            {jobDescription.skills.map((skill) => (
              <div style={{ maxWidth: "320px" }}>
                <H6>{skill.skill} - {skill.weightage} %</H6>
               </div>
            ))}
           
        </FormGroup>
        )
      }

      

    </FormStep>
  );
};

export default ViewJobDescription;
