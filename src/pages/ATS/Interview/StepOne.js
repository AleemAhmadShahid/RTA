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

import {  validateAlphabeticWithSpace, validateEmail, validateNumeric } from "../../../global/validators";

const StepOne = ({ formData, errors, handleChange }) => {
  const [interviewName, setInterviewName] = useState({label: "Select", "value": {}});
  const [postIndustry, setPostIndustry] = useState({label: "Select", "value": {}});
  const [employees, setEmployees] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedCandidate, setSelectedCandidates] = useState();


  useEffect(() => {
    const fetchData = async () => {
      try {
       
        if(formData._id)
        {
          if (formData.status)
            setInterviewName({label: formData.status, "value": formData.status})
          if (formData.industry)
            setPostIndustry({label: formData.industry, "value": formData.industry})
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      try {
        const allUsers = await createGetRequest(`/api/user`, {});
        setEmployees(
          allUsers.users.map(item => ({ label: item.name, value: item._id }))
        );
        setSelectedEmployees(
          allUsers.users
            .filter(item => formData.interviewers.includes(item._id)) 
            .map(item => ({ label: item.name, value: item._id }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }

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
    };
    fetchData();

  },[]);



  const handleChanger = (selected) => {
    setSelectedEmployees(selected);
    handleChange("interviewers", selected.map(item => item.value));
  };

  return (
    <FormStep active>
      
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
        <FormLabel>Interview Name</FormLabel>
        <EntriesDropdown
            width="100%"
            value={{label : formData.interviewName, value: formData.interviewName}}
            onChange={(selectedOption) =>{
              setInterviewName(selectedOption);
              handleChange("interviewName", selectedOption.value);
            }}
            options={[
              "Internal Interview",
              "General Interview",
              "Online Interview",
              "Phone Interview",
              "Level 1 Interview",
              "Level 2 Interview",
              "Level 3 Interview",
              "Level 4 Interview"
            ].map((value) => ({label: value, value: value}))}
            styles={dropDownStyle}
          />
      </FormGroup>


      <FormGroup>
        <FormLabel>From</FormLabel>
        <FormInput
          type="datetime-local"
          value={formData.from && new Date(formData.from).toISOString().slice(0, 16) || ""}
          placeholder={" From"}
          onBlur={(e) => handleChange("from", new Date(e.target.value).toISOString())}
          onChange={(e) => handleChange("from", new Date(e.target.value).toISOString())}
         
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>To</FormLabel>
        <FormInput
          type="datetime-local"
          value={formData.to &&  new Date(formData.to).toISOString().slice(0, 16) || ""}
          placeholder={" To"}
          onBlur={(e) => handleChange("to",new Date(e.target.value).toISOString())}
          onChange={(e) => handleChange("to",new Date(e.target.value).toISOString())}
         
        />
      </FormGroup>

      
      <FormGroup>
        <FormLabel>Assessment</FormLabel>
        <EntriesDropdown
            width="100%"
            value={postIndustry}
            onChange={(selectedOption) =>{
              setPostIndustry(selectedOption);
              handleChange("industry", selectedOption.value);
            }}
            options={[
              { "label": "Communications", "value": "Communications" },
              { "label": "Technology", "value": "Technology" },
              { "label": "Government/Military", "value": "Government/Military" },
              { "label": "Manufacturing", "value": "Manufacturing" },
              { "label": "Financial Services", "value": "Financial Services" },
              { "label": "IT Services", "value": "IT Services" },
              { "label": "Education", "value": "Education" },
              { "label": "Pharma", "value": "Pharma" },
              { "label": "Real Estate", "value": "Real Estate" },
              { "label": "Consulting", "value": "Consulting" },
              { "label": "Health Care", "value": "Health Care" },
              { "label": "Administration", "value": "Administration" },
              { "label": "Advertising", "value": "Advertising" },
              { "label": "Agriculture", "value": "Agriculture" },
              { "label": "Architecture & Construction", "value": "Architecture & Construction" },
              { "label": "Arts & Graphics", "value": "Arts & Graphics" },
              { "label": "Airline - Aviation", "value": "Airline - Aviation" },
              { "label": "Accounting", "value": "Accounting" },
              { "label": "Automotive", "value": "Automotive" },
              { "label": "Banking", "value": "Banking" },
              { "label": "Biotechnology", "value": "Biotechnology" },
              { "label": "Broadcasting", "value": "Broadcasting" },
              { "label": "Business Management", "value": "Business Management" },
              { "label": "Charity", "value": "Charity" },
              { "label": "Catering", "value": "Catering" },
              { "label": "Customer Service", "value": "Customer Service" },
              { "label": "Chemicals", "value": "Chemicals" },
              { "label": "Construction", "value": "Construction" },
              { "label": "Computer", "value": "Computer" },
              { "label": "Consumer", "value": "Consumer" },
              { "label": "Cosmetics", "value": "Cosmetics" },
              { "label": "Design", "value": "Design" },
              { "label": "Defence", "value": "Defence" },
              { "label": "Electronics", "value": "Electronics" },
              { "label": "Engineering", "value": "Engineering" },
              { "label": "Energy and Utilities", "value": "Energy and Utilities" },
              { "label": "Entertainment", "value": "Entertainment" },
              { "label": "Employment - Recruiting - Staffing", "value": "Employment - Recruiting - Staffing" },
              { "label": "Environmental", "value": "Environmental" },
              { "label": "Exercise - Fitness", "value": "Exercise - Fitness" },
              { "label": "Export/Import", "value": "Export/Import" },
              { "label": "Fashion", "value": "Fashion" },
              { "label": "FMCG/Foods/Beverage", "value": "FMCG/Foods/Beverage" },
              { "label": "Fertilizers/Pesticides", "value": "Fertilizers/Pesticides" },
              { "label": "Furniture", "value": "Furniture" },
              { "label": "Grocery", "value": "Grocery" },
              { "label": "Gas", "value": "Gas" },
              { "label": "Government & Public Sector", "value": "Government & Public Sector" },
              { "label": "Gems & Jewellery", "value": "Gems & Jewellery" },
              { "label": "Human Resources", "value": "Human Resources" },
              { "label": "Hospitality", "value": "Hospitality" },
              { "label": "Hotels and Lodging", "value": "Hotels and Lodging" },
              { "label": "HVAC", "value": "HVAC" },
              { "label": "Hardware", "value": "Hardware" },
              { "label": "Insurance", "value": "Insurance" },
              { "label": "Installation", "value": "Installation" },
              { "label": "Industrial", "value": "Industrial" },
              { "label": "Internet Services", "value": "Internet Services" },
              { "label": "Import - Export", "value": "Import - Export" },
              { "label": "Legal", "value": "Legal" },
              { "label": "Logistics", "value": "Logistics" },
              { "label": "Landscaping", "value": "Landscaping" },
              { "label": "Leisure and Sport", "value": "Leisure and Sport" },
              { "label": "Library Science", "value": "Library Science" },
              { "label": "Marketing", "value": "Marketing" },
              { "label": "Management", "value": "Management" },
              { "label": "Merchandising", "value": "Merchandising" },
              { "label": "Medical", "value": "Medical" },
              { "label": "Media", "value": "Media" },
              { "label": "Metals", "value": "Metals" },
              { "label": "Mining", "value": "Mining" },
              { "label": "Mortgage", "value": "Mortgage" },
              { "label": "Marine", "value": "Marine" },
              { "label": "Maritime", "value": "Maritime" },
              { "label": "Nonprofit Charitable Organizations", "value": "Nonprofit Charitable Organizations" },
              { "label": "NGO/Social Services", "value": "NGO/Social Services" },
              { "label": "Newspaper", "value": "Newspaper" },
              { "label": "Oil & Gas", "value": "Oil & Gas" },
              { "label": "Other", "value": "Other" },
              { "label": "Other/Not Classified", "value": "Other/Not Classified" },
              { "label": "Polymer / Plastic / Rubber", "value": "Polymer / Plastic / Rubber" },
              { "label": "Pharma/Biotech/Clinical Research", "value": "Pharma/Biotech/Clinical Research" },
              { "label": "Public Sector and Government", "value": "Public Sector and Government" },
              { "label": "Printing/Packaging/Publishing", "value": "Printing/Packaging/Publishing" },
              { "label": "Personal and Household Services", "value": "Personal and Household Services" },
              { "label": "Property & Real Estate", "value": "Property & Real Estate" },
              { "label": "Paper", "value": "Paper" },
              { "label": "Pet Store", "value": "Pet Store" },
              { "label": "Public Relations", "value": "Public Relations" },
              { "label": "Retail", "value": "Retail" },
              { "label": "Retail & Wholesale", "value": "Retail & Wholesale" },
              { "label": "Recreation", "value": "Recreation" },
              { "label": "Real Estate and Property", "value": "Real Estate and Property" },
              { "label": "Recruitment/Employment Firm", "value": "Recruitment/Employment Firm" },
              { "label": "Real Estate/Property Management", "value": "Real Estate/Property Management" },
              { "label": "Restaurant/Food Services", "value": "Restaurant/Food Services" },
              { "label": "Rental Services", "value": "Rental Services" },
              { "label": "Research & Development", "value": "Research & Development" },
              { "label": "Repair / Maintenance Services", "value": "Repair / Maintenance Services" },
              { "label": "Sales - Marketing", "value": "Sales - Marketing" },
              { "label": "Science & Technology", "value": "Science & Technology" },
              { "label": "Security/Law Enforcement", "value": "Security/Law Enforcement" },
              { "label": "Shipping/Marine", "value": "Shipping/Marine" },
              { "label": "Security and Surveillance", "value": "Security and Surveillance" },
              { "label": "Sports and Physical Recreation", "value": "Sports and Physical Recreation" },
              { "label": "Staffing/Employment Agencies", "value": "Staffing/Employment Agencies" },
              { "label": "Social Services", "value": "Social Services" },
              { "label": "Sports Leisure & Lifestyle", "value": "Sports Leisure & Lifestyle" },
              { "label": "Semiconductor", "value": "Semiconductor" },
              { "label": "Services - Corporate B2B", "value": "Services - Corporate B2B" },
              { "label": "Travel", "value": "Travel" },
              { "label": "Training", "value": "Training" },
              { "label": "Transportation", "value": "Transportation" },
              { "label": "Telecommunications", "value": "Telecommunications" },
              { "label": "Trade and Services", "value": "Trade and Services" },
              { "label": "Travel and Tourism", "value": "Travel and Tourism" },
              { "label": "Textiles/Garments/Accessories", "value": "Textiles/Garments/Accessories" },
              { "label": "Tyres", "value": "Tyres" },
              { "label": "Utilities", "value": "Utilities" },
              { "label": "Wireless", "value": "Wireless" },
              { "label": "Wood / Fibre / Paper", "value": "Wood / Fibre / Paper" },
              { "label": "Waste Management", "value": "Waste Management" },
              { "label": "Wholesale Trade/Import-Export", "value": "Wholesale Trade/Import-Export" }
            ]}
            styles={dropDownStyle}
          />
      </FormGroup>
     
      <FormGroup>
        <FormLabel>Select Members</FormLabel>
        <Select
          isMulti 
          options={employees}
          value={selectedEmployees}
          onChange={handleChanger}
          styles={ {
            control: (base) => ({
              ...base,
              width: 300
            }),
            valueContainer: (base) => ({
              ...base,
              display: 'flex',
              flexWrap: 'wrap',
              overflow: 'hidden'
            }),
            multiValue: (base) => ({
              ...base,
              margin: '2px',
              display: 'flex'
            })
          }}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Schedule Comments</FormLabel>
        <textarea
            style={{ borderRadius: "5px" }}
            value={formData.scheduleComments || ""}
            placeholder={" Benefits"}
            onChange={(e) => handleChange("scheduleComments", e.target.value)}
            rows={6} 
            cols={40} 
        ></textarea>
      </FormGroup>

      {/* <FormButton>Next</FormButton> */}
    </FormStep>
  );
};

export default StepOne;
