import React, { useState, useEffect }  from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  H6,
  UploadBox
} from "../../../styles/MultiStepFormStyling";

import EmployeeInfo from "../../../components/EmployeeInfo";

const ViewAttendance = ({ attendance}) => {

  return (
    <FormStep active>  
       
      {attendance.employee  && (
        <FormGroup>
          <FormLabel>User</FormLabel>
          <div style={{ maxWidth: "320px" }}>
            <H6>{attendance.employee}</H6>
          </div>
        </FormGroup>
      )}

      {attendance.clockIn.date  && (

        <FormGroup>
          <FormLabel>Clock In</FormLabel>
          <H6 style={{ width: "300px" }}>
            {new Date(attendance?.clockIn?.date).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            })}
        </H6>
          <UploadBox>
            {attendance.clockIn.image ? (
              <img
                src={attendance.clockIn.image}
                alt="Employee Image"
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
            ) : (
             ""
            )}
          </UploadBox>
        </FormGroup>
      )}

      {attendance.clockOut.date  && (

        <FormGroup>
          <FormLabel>Clock Out</FormLabel>
          <H6 style={{ width: "300px" }}>
            {new Date(attendance?.clockOut?.date).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            })}
          </H6>

          <UploadBox>
            {attendance.clockIn.image ? (
              <img
                src={attendance.clockIn.image}
                alt="Employee Image"
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
            ) : (
             ""
            )}
          </UploadBox>
        </FormGroup>
      )}
   
      
    </FormStep>
  );
};

export default ViewAttendance;
