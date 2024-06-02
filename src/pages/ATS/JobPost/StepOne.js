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

import {  validateAlphabeticWithSpace, validateEmail, validateNumeric } from "../../../global/validators";

const StepOne = ({ formData, errors, handleChange }) => {
  const [postStatus, setPostStatus] = useState({label: "Select", "value": {}});
  const [postIndustry, setPostIndustry] = useState({label: "Select", "value": {}});
  const [postType, setPostType] = useState({label: "Select", "value": {}});

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        if(formData._id)
        {
          if (formData.status)
            setPostStatus({label: formData.status, "value": formData.status})
          if (formData.industry)
            setPostIndustry({label: formData.industry, "value": formData.industry})
          if (formData.type)
            setPostType({label: formData.type, "value": formData.type})
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

  },[]);
  return (
    <FormStep active>
      <H6>General Information</H6>

      
      <FormGroup>
        <FormLabel>Posting Title</FormLabel>
        <FormInput
          type="text"
          value={formData.postingTitle || ""}
          placeholder={" Positing Title"}
          onChange={(e) => handleChange("postingTitle", e.target.value, validateAlphabeticWithSpace)}
          onBlur={(e) => handleChange("postingTitle", e.target.value, validateAlphabeticWithSpace)}
          required
        />
      </FormGroup>
      {errors.postingTitle && <StyledErrorH6>{errors.postingTitle}</StyledErrorH6>}
      <FormGroup>
        <FormLabel>Opening Date</FormLabel>
        <FormInput
          type="date"
          value={formData.dateOpened && formData.dateOpened.split('T')[0] || ""}
          placeholder={" Opening Date"}
          onBlur={(e) => handleChange("dateOpened", e.target.value)}
          onChange={(e) => handleChange("dateOpened", e.target.value)}
         
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Target Date</FormLabel>
        <FormInput
          type="date"
          value={formData.targetDate && formData.targetDate.split('T')[0] || ""}
          placeholder={" Target Date"}
          onBlur={(e) => handleChange("targetDate", e.target.value)}
          onChange={(e) => handleChange("targetDate", e.target.value)}
         
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Number of Positions</FormLabel>
        <FormInput
          type="number"
          value={formData.numberOfPositions || ""}
          onChange={(e) => handleChange("numberOfPositions", e.target.value)}
          placeholder={" Number of Positions"}
          min={"0"}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Status</FormLabel>
        <EntriesDropdown
            width="100%"
            value={postStatus}
            onChange={(selectedOption) =>{
              setPostStatus(selectedOption);
              handleChange("status", selectedOption.value);
            }}
            options={[
              { "label": "In-progress", "value": "In-progress" },
              { "label": "Waiting for approval", "value": "Waiting for approval" },
              { "label": "On-Hold", "value": "On-Hold" },
              { "label": "Filled", "value": "Filled" },
              { "label": "Cancelled", "value": "Cancelled" },
              { "label": "Declined", "value": "Declined" },
              { "label": "Inactive", "value": "Inactive" }
            ]}
            styles={dropDownStyle}
          />
      </FormGroup>
      <FormGroup>
        <FormLabel>Industry</FormLabel>
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
        <FormLabel>Type</FormLabel>
        <EntriesDropdown
            width="100%"
            value={postType}
            onChange={(selectedOption) =>{
              setPostType(selectedOption);
              handleChange("type", selectedOption.value);
            }}
            options={[
              { "label": "Full time", "value": "Full time" },
              { "label": "Part time", "value": "Part time" },
              { "label": "Temporary", "value": "Temporary" },
              { "label": "Contract", "value": "Contract" },
              { "label": "Any", "value": "Any" },
              { "label": "Permanent", "value": "Permanent" },
              { "label": "Training", "value": "Training" },
              { "label": "Volunteer", "value": "Volunteer" },
              { "label": "Seasonal", "value": "Seasonal" },
              { "label": "Freelance", "value": "Freelance" }
            ]}
            styles={dropDownStyle}
          />
      </FormGroup>
      <FormGroup>
        <FormLabel>Salary</FormLabel>
        <FormInput
          type="text"
          value={formData.salary  || ""}
          onChange={(e) => handleChange("salary", e.target.value)}
          placeholder={" salary"}
        />
      </FormGroup>

      {/* <FormButton>Next</FormButton> */}
    </FormStep>
  );
};

export default StepOne;
