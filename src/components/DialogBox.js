import React from "react";
import styled from "styled-components";

const DialogBoxContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 128, 0, 0.5); /* Green shadow for the box */
  width: 100px;
  padding: 5px;
  text-align: center;
`;

const Checkmark = styled.div`
  color: green;
  font-size: 10px;
  margin-bottom: 10px;
`;

const Text = styled.div`
  font-size: 10px;
`;

const DialogBox = () => {
  return (
    <DialogBoxContainer>
      <Checkmark>&#10004;</Checkmark>
      <Text>Successfully Tasted</Text>
    </DialogBoxContainer>
  );
};

export default DialogBox;
