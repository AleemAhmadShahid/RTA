import React, { useState } from "react";
import styled from "styled-components";
import * as MdIcons from "react-icons/md";


export const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  
`;
const Checkmark = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color:white ;
  border: 2px solid #32CD32; 
  display: flex;
  align-items: center;
  justify-content: center;
  color: #32CD32;
  font-size: 20px;
  margin-right:10px;
`;
export const CrossIcon = styled(MdIcons.MdClose)`

  width: 45px;
  height: 45px;
  background-color: white;
  border-radius: 50%;
  margin-top:20px;
  border: 2px solid red; /* Set the border color for the cross mark */
  color: red; /* Set the color for the cross mark */
  font-size: 26px;
  cursor: pointer; /* Add cursor pointer for hover effect */
  margin-top:30px;
`;



export const ErrorText = styled.div`
  font-size: 22px;
  margin-top: 10px; /* Add some space between the cross icon and error text */
  margin-top:20px;
`;

export const ClickedText = styled.div`
  font-size: 16px;
  margin-top: 10px;
  margin-top:1px;
`;
export const DialogOverlay1 = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
 z-index: 100;
display: ${(props) => (props.show ? "flex" : "none")};
align-items: center;
justify-content: center;

`;

export const DialogBoxContainer1 = styled.div`
background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  width: 390px; /* Increase the width as desired */
  height: 270px; /* Increase the height as desired */
  padding: 15px;
  text-align: center;
  position: relative;
`;


export const OKButton = styled.button`
  background-color: #ffa500;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 7px 19px;
  margin-top: 15px; /* Add space between text and button */
  cursor: pointer;
  margin-top:30px;
 
`;

const ErrorDialog = ({ show, handleClose , message, title, handleYes}) => {
    return (
      <>
        {show && (
          <DialogOverlay1 show={show}>
            <DialogBoxContainer1>
              <CrossIcon />
              <ErrorText>{title&&<Checkmark/> || "Error!"}</ErrorText>
              <ClickedText>{message}</ClickedText>
              { handleYes == undefined ?
                <OKButton onClick={handleClose}>OK</OKButton>:
                <OKButton onClick={handleYes} style={{marginRight: "20px", backgroundColor: "red"}}>Yes</OKButton>
              }
              {handleYes !== undefined ? <OKButton onClick={handleClose}>No</OKButton> : ""}
            </DialogBoxContainer1>
          </DialogOverlay1>
        )}
      </>
    );
  };
  

export default ErrorDialog;
