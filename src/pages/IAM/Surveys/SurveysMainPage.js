import React, { useState } from "react";
import SurveysCom from "../../../components/SurveysCom";
import { CenteredContainer } from "../../../styles/TableStyling";

const Surveys = () => {
  const [isRead, setRead] = useState(true);

 
  const toggleReadState = () => {
    setRead((prevIsRead) => !prevIsRead);
  };

  return (
    <div>
      <CenteredContainer>
        <button onClick={toggleReadState}>Toggle Read</button>
      </CenteredContainer>
      <SurveysCom isRead={isRead} />
    </div>
  );
};

export default Surveys;
