import React from "react";
import styled from "styled-components";

const DialogBoxContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2); /* Green shadow for the box */
  width: 190px;
  padding: 5px;
  display: flex; /* Use flexbox layout */
  align-items: center; /* Center items vertically */
  justify-content: center; /* Center items horizontally */
`;
const Checkmark = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: green;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  margin-right:10px;
`;

const Text = styled.div`
  font-size: 14px;
`;

const DialogBox = () => {
  return (
    <DialogBoxContainer>
      <Checkmark>&#10004;</Checkmark>
      <Text>Successfully Toasted</Text>
    </DialogBoxContainer>
  );
};

export default DialogBox;
