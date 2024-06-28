import React, {useState, useEffect} from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  FormHalfInput,
  H6,
} from "../../../styles/MultiStepFormStyling";
import { StyledErrorH6 } from "../../Login";
import {
  EntriesDropdown,
  dropDownStyle
  } from "../../../styles/TableStyling";
import { createGetRequest } from "../../../global/requests";
import {  validateAlphabeticWithSpace, validateEmail, validateNumeric } from "../../../global/validators";

const StepOne = ({ formData, errors, handleChange }) => {
  const [jobPost, setJobPosts] = useState([{}]);
  const [selectedJobPost, setSelectedJobPost] = useState({label: "Select", "value": {}});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/jobPost");
        if (data.status === 200)
        {
          const jobPosts = data.jobPosts.map((jobPost) => ({ label: jobPost.postingTitle, value: jobPost._id }));
          setJobPosts(jobPosts);
          if(formData?.jobPost)
          {
            const findSelectedJobPost = data.jobPosts.find((jobPostObj)=> formData.jobPost === jobPostObj._id);
            setSelectedJobPost({ label: findSelectedJobPost.postingTitle, value: findSelectedJobPost._id });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

  },[]);


  return (
    <FormStep active>
      <H6>Personal Information</H6>


      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormInput
          type="text"
          value={formData.name || ""}
          placeholder={" Name"}
          onChange={(e) => handleChange("name", e.target.value, validateAlphabeticWithSpace)}
          onBlur={(e) => handleChange("name", e.target.value, validateAlphabeticWithSpace)}
          required
        />
      </FormGroup>
      {errors.name && <StyledErrorH6>{errors.name}</StyledErrorH6>}
      <FormGroup>
        <FormLabel>Email</FormLabel>
        <FormInput
          type="email"
          value={formData.email || ""}
          placeholder={" candidate@example.com"}
          onBlur={(e) => handleChange("email", e.target.value, validateEmail)}
          onChange={(e) => handleChange("email", e.target.value, validateEmail)}
          disabled={formData._id !== undefined}
        />
      </FormGroup>
      {errors.email && <StyledErrorH6>{errors.email}</StyledErrorH6>}
   

      <FormGroup>
        <FormLabel>Phone Number</FormLabel>
        <FormInput
          type="text"
          value={formData?.phoneNo?.[0] || ""}
          onChange={(e) => handleChange("phoneNo.0", e.target.value)}
          placeholder={" +92"}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Address</FormLabel>
        <FormInput
          type="text"
          value={(formData.address && formData.address.street) || ""}
          onChange={(e) => handleChange("address.street", e.target.value)}
          placeholder={" Street"}
        />
      </FormGroup>
      <FormGroup>
        <div style={{ display: "flex", width: "100%" }}>
          <FormHalfInput
            type="text"
            value={(formData.address && formData.address.city) || ""}
            onChange={(e) => handleChange("address.city", e.target.value)}
            placeholder=" City"
            style={{ marginRight: "10px" }}
          />
          <FormHalfInput
            type="text"
            value={(formData.address && formData.address.zipCode) || ""}
            onChange={(e) => handleChange("address.zipCode", e.target.value, validateNumeric)}
            placeholder=" Zip Code"
          />
        </div>
        <FormInput
          style={{ marginTop: "13px" }}
          type="text"
          value={(formData.address && formData.address.country) || ""}
          onChange={(e) => handleChange("address.country", e.target.value)}
          placeholder={" Country"}
        />
      </FormGroup>
      {errors?.address?.zipCode && <StyledErrorH6>{errors.address.zipCode}</StyledErrorH6>}


      <FormGroup>
        <FormLabel>Current Salary</FormLabel>
        <FormInput
          type="text"
          value={formData.currentSalary || ""}
          placeholder={" 1000"}
          onChange={(e) => handleChange("currentSalary", e.target.value, validateAlphabeticWithSpace)}
          onBlur={(e) => handleChange("currentSalary", e.target.value, validateAlphabeticWithSpace)}
          required
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Expected Salary</FormLabel>
        <FormInput
          type="text"
          value={formData.expectedSalary || ""}
          placeholder={" 1000"}
          onChange={(e) => handleChange("expectedSalary", e.target.value, validateAlphabeticWithSpace)}
          onBlur={(e) => handleChange("expectedSalary", e.target.value, validateAlphabeticWithSpace)}
          required
        />
      </FormGroup>
      
      <FormGroup>
        <FormLabel>Job Post</FormLabel>
        <EntriesDropdown
            width="100%"
            value={selectedJobPost}
            onChange={(selectedOption) =>{
              setSelectedJobPost(selectedOption);
              handleChange("jobPost", selectedOption.value);
            }}
            options={jobPost}
            styles={dropDownStyle}
          />
      </FormGroup>

      {/* <FormButton>Next</FormButton> */}
    </FormStep>
  );
};

export default StepOne;
