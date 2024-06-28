import React, {useState, useEffect} from "react";
import {
  FormStep,
  FormGroup,
  FormLabel,
  FormInput,
  FormHalfInput,
  H6,
} from "../../../styles/MultiStepFormStyling";
import {
  EntriesDropdown,
  dropDownStyle
  } from "../../../styles/TableStyling";
import { StyledErrorH6 } from "../../Login";
import {
  createGetRequest,
} from "../../../global/requests";
import Select from 'react-select';


const StepOne = ({ formData, errors, handleChange }) => {
  const [jobPosts, setJobPosts] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedJobPost, setSelectedJobPost] = useState();
  const [selectedCandidate, setSelectedCandidates] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();


  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const allCandidates = await createGetRequest(`/api/candidate`, {});
        setCandidates(
          allCandidates.candidates.map(item => ({ label: item.name, value: item._id }))
        );
        const candidate = allCandidates.candidates.find(candidate => candidate._id == formData.candidate);
        if (candidate)
          setSelectedCandidates({label : candidate.name, value: candidate._id});
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const allJobPosts = await createGetRequest(`/api/jobPost`, {});
        setJobPosts(
          allJobPosts.jobPosts.map(item => ({ label: item.postingTitle, value: item._id }))
        );
        const jobPost = allJobPosts.jobPosts.find(jobPost => jobPost._id == formData.jobPost);
        if (jobPost)
          setSelectedJobPost({label : jobPost.postingTitle, value: jobPost._id});
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const allDepartments = await createGetRequest(`/api/department?type=1`, {});
        setDepartments(
          allDepartments.departments.map(item => ({ label: item.name, value: item._id }))
        );
        const department = allDepartments.departments.find(department => department._id == formData.department);
        if (department)
          setSelectedDepartment({label : department.name, value: department._id});
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };
    fetchData();

  },[]);



  return (
    <FormStep active>

      <FormGroup>
        <FormLabel>Job Post</FormLabel>
        <EntriesDropdown
            width="100%"
            value={selectedJobPost}
            onChange={(selectedOption) =>{
              setSelectedCandidates(selectedOption);
              handleChange("jobPost", selectedOption.value);
            }}
            options={jobPosts}
            styles={dropDownStyle}
          />
      </FormGroup>
      
      {errors.candidate && <StyledErrorH6>{errors.candidate}</StyledErrorH6>}

      
      <FormGroup>
        <FormLabel>Candidate</FormLabel>
        <EntriesDropdown
            width="100%"
            value={selectedCandidate}
            onChange={(selectedOption) =>{
              setSelectedCandidates(selectedOption);
              handleChange("candidate", selectedOption.value);
            }}
            options={candidates}
            styles={dropDownStyle}
          />
      </FormGroup>
      
      {errors.candidate && <StyledErrorH6>{errors.candidate}</StyledErrorH6>}

      <FormGroup>
        <FormLabel>Department</FormLabel>
        <EntriesDropdown
            width="100%"
            value={selectedDepartment}
            onChange={(selectedOption) =>{
              setSelectedDepartment(selectedOption);
              handleChange("department", selectedOption.value);
            }}
            options={departments}
            styles={dropDownStyle}
          />
      </FormGroup>

      <FormGroup>
        <FormLabel>Expected Joining Date</FormLabel>
        <FormInput
          type="date"
          value={formData.expectedJoiningDate && formData.expectedJoiningDate.split('T')[0] || ""}
          placeholder={" Expected Joining Date"}
          onBlur={(e) => handleChange("expectedJoiningDate", e.target.value)}
          onChange={(e) => handleChange("expectedJoiningDate", e.target.value)}
         
        />
      </FormGroup>


      <FormGroup>
        <FormLabel>Valid Till</FormLabel>
        <FormInput
          type="date"
          value={formData.expiryDate && formData.expiryDate.split('T')[0] || ""}
          placeholder={" Expiry Date"}
          onBlur={(e) => handleChange("expiryDate", e.target.value)}
          onChange={(e) => handleChange("expiryDate", e.target.value)}
         
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Compensation Amount</FormLabel>
        <FormInput
          type="number"
          value={formData.compensationAmount || ""}
          placeholder={" Compensation Amount"}
          onChange={(e) => handleChange("compensationAmount", e.target.value)}
          onBlur={(e) => handleChange("compensationAmount", e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Status</FormLabel>
        <EntriesDropdown
            width="100%"
            value={{label : formData.status, value: formData.status}}
            onChange={(selectedOption) =>{
              handleChange("status", selectedOption.value);
            }}
            options={[
              "Draft",
              "Sent",
              "Accepted",
              "Rejected"
            ].map((value) => ({label: value, value: value}))}
            styles={dropDownStyle}
          />
      </FormGroup>

      

     
    
   

      {/* <FormButton>Next</FormButton> */}
    </FormStep>
  );
};

export default StepOne;
