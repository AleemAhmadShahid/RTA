import React from "react";
import styled from "styled-components";

const DialogBoxContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  width: 190px;
  height: 40px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
`;
const Checkmark = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #32cd32;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  margin-right: 10px;
`;

const Text = styled.div`
  font-size: 14px;
  color: #6e6b7b;
`;
export const DialogOverlay = styled.div`
  position: absolute;

  right: 1.7%;
  z-index: 1;
  display: ${(props) => (props.show ? "block" : "none")};
  z-index: 30px;
`;

const DialogBox = ({ message }) => {
  return (
    <DialogBoxContainer>
      <Checkmark>&#10004;</Checkmark>
      <Text>{message || "Successfully Toasted"}</Text>
    </DialogBoxContainer>
  );
};

export default DialogBox;
