import React, { useState } from "react";
import SurveysCom from "../../../components/SurveysCom";
import { CenteredContainer } from "../../../styles/TableStyling";
import styled from "styled-components";
import { TextArea } from "../../CardsPopup";
const SurvyTopBar = styled.div`
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


const Surveys = () => {
  const [isRead, setRead] = useState(true);

  const toggleReadState = () => {
    setRead((prevIsRead) => !prevIsRead);
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

  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");

  const handleSurveyTitleChange = (event) => {
    setSurveyTitle(event.target.value, 50);
  };

  const handleSurveyDescriptionChange = (event) => {
    setSurveyDescription(event.target.value, 100);
  };
 
  return (
    <div>
      <CenteredContainer>
        <SurvyTopBar>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <textarea
              value={surveyTitle}
              onChange={handleSurveyTitleChange}
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
              placeholder={isRead ? "" : "Enter Survey title..."}
              readOnly={isRead}
            />

            <textarea
              value={surveyDescription}
              onChange={handleSurveyDescriptionChange}
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
        <button onClick={toggleReadState}>Toggle Read</button>
      </CenteredContainer>
      <SurveysCom isRead={isRead} />
    </div>
  );
};

export default Surveys;
