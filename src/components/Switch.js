import React from "react";
import styled from "styled-components";

export const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 16px;
  margin-right: 10px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ededed;
  border-radius: 34px;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    left: 4px;
    bottom: 4.5px;
    background-color: grey;
    border-radius: 50%;
    transition: 0.4s;
  }
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: #ffa500;
  }

  &:checked + ${Slider}:before {
    transform: translateX(14px);
    background-color: white;
  }
`;

const Switch = ({ checked, onChange }) => {
  return (
    <SwitchContainer>
      <Input type="checkbox" checked={checked} onChange={onChange} />
      <Slider />
    </SwitchContainer>
  );
};

export default Switch;
