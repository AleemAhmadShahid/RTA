import React, { useEffect, useState } from "react";
import SurveysCom from "../../components/FormBuilderHelper";
import { CenteredContainer } from "../../styles/TableStyling";
import styled from "styled-components";
import { changeHandler, saveHandler } from "../../global/helper";
import { TextArea } from "../CardsPopup";
import { useParams } from "react-router-dom";
import {
  createGetRequest,
  createDeleteRequest,
  createPutRequest,
} from "../../global/requests";
export const SurvyTopBar = styled.div`
  width: 100%;
  border: none;
  display: flex;

  align-items: center;
  text-align: left;

  background-color: white;
  height: 104px;
  padding: 30px;
  border-radius: 3px;
  border-bottom: 4px solid #50c878;
  overflow: hidden;
`;
const limitTextLength = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength);
  }
  return text;
};

const handleSingleLineInput = (event, maxLength) => {
  const element = event.target;
  if (element.scrollHeight > element.clientHeight || element.value.length > maxLength) {
    element.value = element.value.slice(0, -1);
  }
};


const FormBuilder = ({isRead}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [reload, setReload] = useState(false);
  const {type,id} = useParams();


  const handleChange = (
    field,
    value,
    setError = false,
    data = { ...formData }
  ) => {
    changeHandler(setFormData, setErrors, errors, data, field, value,setError);
  };

  const handleSave = async (nextStep = null) => {
    const copyFormData = { ...formData };
    copyFormData.profileImg = /\/([^/?]+)\?/.test(formData.profileImg)
      ? formData.profileImg.match(/\/([^/?]+)\?/)[1]
      : formData.profileImg;

    saveHandler(nextStep, ["name"] ,"/api/form/completeForm", `/api/form/completeForm/${formData._id}/`, "Form updated Successfully!", "form", errors, copyFormData, setErrors, handleChange, setReload, reload, () => {});

  };

  const toggleReadState = () => {
  };
  const [text, setText] = useState("RTA Survey Questions");
  const [isEditable, setIsEditable] = useState(false);

  const handleFocus = () => {
    setIsEditable(true);
  };

  const handleBlur = () => {
    if (text.trim() === "") {
      setText("Enter your text here...");
    }
    setIsEditable(false);
  };


  useEffect(() => {
    if(id)
    {
      const fetchData = async () => {
        try {
          const data = await createGetRequest(`/api/form/${id}`);
          if (data.status==200)
            setFormData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
  
      };
      fetchData();
    }
    else
      setFormData({...formData, type: type})
  },[])

  console.log(formData);

  return (
    <div>
      <CenteredContainer>
        <SurvyTopBar>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <textarea
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onInput={(e) => handleSingleLineInput(e, 50)}
              style={{
                height: "40px",
                fontSize: "26px",
                color: "#50C878",
                fontWeight: "bold",
                resize: "none",
                border: "none",
                pointerEvents: isRead ? "auto" : "auto",
                userSelect: isRead ? "auto" : "none",
                background: "transparent",
                outline: "none",
                marginTop: "20px",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              placeholder={isRead ? "" : "Enter Title..."}
              readOnly={isRead}
            />

            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onInput={(e) => handleSingleLineInput(e, 140)}
              style={{
                fontSize: "16px",
                resize: "none",
                border: "none",
                pointerEvents: isRead ? "auto" : "auto",
                userSelect: isRead ? "auto" : "none",
                background: "transparent",
                outline: "none",
                marginTop: "0px",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              placeholder={isRead ? "" : "Enter Description..."}
              readOnly={isRead}
            />
          </div>
        </SurvyTopBar>
      </CenteredContainer>
      <br/><br/>
      <SurveysCom isRead={isRead} handleChange={handleChange} handleSave={handleSave} formData={formData}/>
    </div>
  );
};

export default FormBuilder;
