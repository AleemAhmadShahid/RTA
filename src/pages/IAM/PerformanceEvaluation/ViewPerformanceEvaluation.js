import React  from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  H6,
} from "../../../styles/MultiStepFormStyling";

const ViewPerformanceEvaluation = ({ performanceEvaluation}) => {

  return (
    <FormStep active>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <H6 style={{ width: "300px" }}>{performanceEvaluation.name}</H6>
      </FormGroup>
     
       
      {performanceEvaluation.description && performanceEvaluation.description !== "" && (
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6>{performanceEvaluation.description}</H6>
          </div>
        </FormGroup>
      )}

      {
        performanceEvaluation.skills && performanceEvaluation.skills.length > 0 && (
          <FormGroup>
          <FormLabel>Skills</FormLabel>
            {performanceEvaluation.skills.map((skill) => (
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

export default ViewPerformanceEvaluation;
