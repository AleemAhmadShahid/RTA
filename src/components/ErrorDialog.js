import React from "react";
import styled from "styled-components";
import * as MdIcons from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/modalSlice';

export const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;
const Checkmark  = styled(AiOutlineCheckCircle)`
color: #32cd32; 
font-size: 26px;
width: 45px;
  height: 45px;
  margin-top: 30px;
`;
export const CrossIcon = styled(MdIcons.MdClose)`
  width: 45px;
  height: 45px;
  background-color: white;
  border-radius: 50%;
  margin-top: 20px;
  border: 2px solid red;
  color: red;
  font-size: 26px;
  cursor: pointer;
  margin-top: 30px;
`;

export const ErrorText = styled.div`
  font-size: 22px;
  margin-top: 10px;
  margin-top: 20px;
`;

export const ClickedText = styled.div`
  font-size: 16px;
  margin-top: 10px;
  margin-top: 1px;
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
  width: 390px;
  height: 270px;
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
  margin-top: 15px;
  cursor: pointer;
  margin-top: 30px;
`;

const ErrorDialog = () => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.modal);
  const handleClose = () => dispatch(closeModal());
 
  return (
    <>
      {config.show && (
        <DialogOverlay1 show={config.show}>
          <DialogBoxContainer1>
            {config.title == "Success" ? <Checkmark />  : <CrossIcon />} 
            {/* {title ? <CrossIcon />:<Checkmark /> } */}
            <ErrorText>{config.title || "Error!"}</ErrorText>
            <ClickedText>{config.message}</ClickedText>
            {config.handleYes === undefined ? (
              <OKButton onClick={handleClose}>OK</OKButton>
            ) : (
              <>
                <OKButton
                  onClick={() => { config.handleYes(); handleClose()}}
                  style={{ marginRight: "20px", backgroundColor: "red" }}
                >
                  Yes
                </OKButton>
                <OKButton onClick={handleClose}>No</OKButton>
              </>
            )}
          </DialogBoxContainer1>
        </DialogOverlay1>
      )}
    </>
  );
};

export default ErrorDialog;
