import React, { useState, useRef } from "react";
import { CloseButton, P } from "../styles/MultiStepFormStyling";
import styled from "styled-components";
// import { AddButton } from "../components/AddTask";
import { AddButton } from "./CardsPopup";
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
import "../styles/Calender.css";
import FilterBox from "../components/FilterBox";
import EntriesDropdown from "../components/CheckBoxMenu";
import EmployeeInfo from "../components/EmployeeInfo";

const Box = styled.div`
  z-index: 20;
  position: absolute;
  background: white;
  width: 300px;
  border-radius: 5px;
  height: auto;
  padding: 10px;
  border: 0.2px solid #f5f5f5;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 35px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  border-radius: 3px;
  margin-bottom: 20px;
  font-size: 12px;
  box-shadow: inset 0 0 0 2px var(--ds-border-input, #091e4224);
  line-height: 22px;
  border: 2px solid;
  &:focus {
    border-color: skyblue;
    outline: none;
  }
`;
const HeadingContainer = styled.div`
  position: relative;
  //  justify-content:center;
  justify-content: space-between;
  display: flex;
`;
const H6 = styled.h6`
  flex: 2; /* Adjust the flex value as needed */
  text-align: center; /* Center the heading text */
  margin-top: 5px;
`;
const CloseButtonContainer = styled.div`
  margin-left: auto; /* Push the close button to the right */
  margin-bottom:10px;
  margin-top:-3px;
  padding:0 3px;
  border-radius:10px;
  &:hover {
    background-color:lightgrey;
`;
const LabelContainer = styled.div`
  //   display: flex;
  align-items: center;
  margin-top: 10px;
`;

const LabelCheckbox = styled.input`
  margin-right: 10px;
  margin-left: 5px;
  margin-bottom: 10px;
`;

const LabelColorStrip = styled.div`
  width: 240px;
  height: 30px;
  border-radius: 5px;
  background-color: ${(props) => props.color || "transparent"};
  margin-bottom: 10px;
`;
const DateInput = styled.input`
  width: 40%;
  padding: 3px;
  border: 1px solid #ccc;
  border-radius: 2px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.3s ease;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  background-color: ${(props) => (props.disabled ? "#f0f0f0" : "white")};
  margin-bottom: 5px;
  margin-right: 10px;
  &:focus {
    border-color: blue;
  }
`;

const GenericPopup = ({
  fields,
  onClose,
  onSubmit,
  buttonText,
  onCloseButtonClick,
  left,
  top,
  heading,
  onColorChange,
  checkedColors,
  onAddButtonClick,
}) => {
  const isColorChecked = (color) =>
    checkedColors && checkedColors.includes(color);
  const [formValues, setFormValues] = useState({});

  const [dueDate, setdueDate] = useState({ value: null, label: "Select" });
  const [isEditable, setIsEditable] = useState(true);
  const handleCheckboxChange = () => {
    setIsEditable(!isEditable);
  };

  const dueDateOptions = [
    { value: "option1", label: "After 1 hour " },
    { value: "option2", label: "After 2 hour" },
  ];

  const handleChange = (fieldName, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formValues);
    onClose();
  };
  const handleColorChange = (color) => {
    onColorChange(color);
  };

  const fileInputRef = useRef(null);
  const handleImageSelection = (event) => {
    const file = event.target.files[0];
    // Handle the selected image here
    console.log("Selected image:", file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const CheckListOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "CheckList" },
  ];
  const [CheckListOption, setCheckListOption] = useState({
    value: {},
    label: "Select",
  });

  const ChecklistButtonClick = () => {
    if (typeof onAddButtonClick === "function") {
      onAddButtonClick(true);
    }
  };
  return (
    <Box left={left} top={top}>
      {fields.map((field) => (
        <div key={field.name}>
          <HeadingContainer>
            <H6>{field.name}</H6>
            <CloseButtonContainer>
              <CloseButton onClick={onCloseButtonClick || onClose}>
                &#10005;
              </CloseButton>
            </CloseButtonContainer>
          </HeadingContainer>

          {field.name === "Members" && (
            <>
              <Input
                type={field.type}
                value={formValues[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
              />

              <AddButton
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleSubmit}
              >
                {buttonText || "Submit"}
              </AddButton>
            </>
          )}
          {field.name === "Label" && (
            <>
              <Input
                type={field.type}
                value={formValues[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
              />
              <LabelContainer>
                <div style={{ display: "flex" }}>
                  <LabelCheckbox
                    type="checkbox"
                    onChange={() => onColorChange("#4bce97")}
                    checked={isColorChecked("#4bce97")}
                  />
                  <LabelColorStrip color="#4bce97" />{" "}
                </div>
                <div style={{ display: "flex" }}>
                  <LabelCheckbox
                    type="checkbox"
                    onChange={() => onColorChange("#FFE140")}
                    checked={isColorChecked("#FFE140")}
                  />
                  <LabelColorStrip color="#FFE140" />{" "}
                </div>
                <div style={{ display: "flex" }}>
                  <LabelCheckbox type="checkbox" />
                  <LabelColorStrip color="#faa53d" />{" "}
                </div>
                <div style={{ display: "flex" }}>
                  <LabelCheckbox type="checkbox" />
                  <LabelColorStrip color=" #f87462" />{" "}
                </div>
                <div style={{ display: "flex" }}>
                  <LabelCheckbox type="checkbox" />
                  <LabelColorStrip color="#9f8fef" />{" "}
                </div>
                <div style={{ display: "flex" }}>
                  <LabelCheckbox type="checkbox" />
                  <LabelColorStrip color="#579dff" />{" "}
                </div>
              </LabelContainer>
            </>
          )}
          {field.name === "Checklist" && (
            <>
              <H6
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                Title
              </H6>

              <Input />
              <H6
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                Copy Item from
              </H6>
              <FilterBox
                width={"100%"}
                marginRight={"0px"}
                options={CheckListOptions}
                onValueChange={(selectedOption) =>
                  setCheckListOption(selectedOption)
                }
                selectedValue={CheckListOption}
                title=""
              />

              <div style={{ display: "flex", width: "100px" }}>
                <AddButton
                  style={{
                    textAlign: "center",
                    background: "#0096FF",
                    color: "white",
                    justifyContent: "center",
                    marginRight: "10px",
                  }}
                  onClick={ChecklistButtonClick}
                >
                  {"Add"}
                </AddButton>
              </div>
            </>
          )}
          {field.name === "Date" && (
            <>
              <Calendar />
              <P
                style={{
                  marginBottom: "1px",
                  fontSize: "12px",
                  marginLeft: "-4px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Start date
              </P>
              <div style={{ display: "flex" }}>
                <input
                  style={{ marginRight: "5px" }}
                  type="checkbox"
                  checked={isEditable}
                  onChange={handleCheckboxChange}
                />
                {isEditable ? (
                  <DateInput
                    type="text"
                    id="dateInput"
                    name="dateInput"
                    // value={selectedDate}
                    // onChange={handleDateChange}
                    placeholder="M/D/YYYY"
                  />
                ) : (
                  <span>
                    <DateInput
                      type="text"
                      id="dateInput"
                      name="dateInput"
                      disabled={!isEditable}
                      // value={selectedDate}
                      // onChange={handleDateChange}
                      placeholder="M/D/YYYY"
                    />
                  </span>
                )}
              </div>
              <P
                style={{
                  marginBottom: "1px",
                  fontSize: "12px",
                  marginLeft: "-4px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Due date
              </P>
              <div style={{ display: "flex" }}>
                <DateInput
                  type="text"
                  id="dateInput"
                  name="dateInput"
                  // value={selectedDate}
                  // onChange={handleDateChange}
                  placeholder="M/D/YYYY"
                />
                <DateInput
                  type="text"
                  id="dateInput"
                  name="dateInput"
                  // value={selectedDate}
                  // onChange={handleDateChange}
                  placeholder="h:mm A"
                />
              </div>
              {/* <p> Set due date Reminder</p> */}

              <FilterBox
                width="100%"
                options={dueDateOptions}
                onValueChange={(selectedOption) => setdueDate(selectedOption)}
                selectedValue={dueDate}
                title="Set Due Date Reminder"
              />
              <P
                style={{
                  marginBottom: "1px",
                  fontSize: "14px",
                  marginLeft: "-4px",
                }}
              >
                {" "}
                Reminders will be send toall members and watches of this card
              </P>

              <AddButton
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleSubmit}
              >
                {"Save"}
              </AddButton>

              <AddButton
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "white",
                }}
                onClick={handleSubmit}
              >
                {"Remove"}
              </AddButton>
            </>
          )}

          {field.name === "Attachment" && (
            <>
              <H6
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Attach a file from your computer
              </H6>

              <P
                style={{
                  textAlign: "left",
                  marginLeft: "-2px",
                  fontSize: "12px",
                }}
              >
                You can also drag and drop files to upload them
              </P>
              <AddButton
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleButtonClick}
              >
                {"Choose a file"}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageSelection}
                />
              </AddButton>
              <hr />
              <P>Search or paste a link</P>
              <Input />

              <P>Display text</P>
              <Input />
              <div style={{ display: "flex", width: "100px" }}>
                <AddButton
                  style={{
                    textAlign: "center",

                    justifyContent: "center",
                    marginRight: "10px",
                  }}
                  onClick={onClose}
                >
                  {"Cancel"}
                </AddButton>
                <AddButton
                  style={{
                    textAlign: "center",

                    justifyContent: "center",
                  }}
                  onClick={handleSubmit}
                >
                  {"Submit"}
                </AddButton>
              </div>
            </>
          )}
          {field.name === "Cover" && (
            <AddButton
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleSubmit}
            >
              {buttonText || "Submit"}
            </AddButton>
          )}
          {field.name === "Custom Fields" && (
            <AddButton
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleSubmit}
            >
              {buttonText || "Submit"}
            </AddButton>
          )}
          {field.name === "Move" && (
            <>
              <P>Board</P>
              <FilterBox
                width={"100%"}
                marginRight={"0px"}
                options={CheckListOptions}
                onValueChange={(selectedOption) =>
                  setCheckListOption(selectedOption)
                }
                selectedValue={CheckListOption}
                title=""
              />

              <div style={{ display: "flex" }}>
                <div>
                  <P style={{ marginBottom: "0px" }}>Card</P>
                  <FilterBox
                    style={{ flex: 2 }}
                    width={"100%"}
                    marginRight={"10px"}
                    options={CheckListOptions}
                    onValueChange={(selectedOption) =>
                      setCheckListOption(selectedOption)
                    }
                    selectedValue={CheckListOption}
                    title=""
                  />
                </div>
                <div>
                  <P style={{ marginBottom: "0px" }}>Position</P>
                  <FilterBox
                    style={{ flex: 1 }}
                    width={"100%"}
                    marginRight={"0px"}
                    options={CheckListOptions}
                    onValueChange={(selectedOption) =>
                      setCheckListOption(selectedOption)
                    }
                    selectedValue={CheckListOption}
                    title=""
                  />
                </div>
              </div>

              <AddButton
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleSubmit}
              >
                {buttonText || "Submit"}
              </AddButton>
            </>
          )}
          {field.name === "Copy" && (
            <>
              <Input type={field.type} />
              <FilterBox
                width={"100%"}
                marginRight={"0px"}
                options={CheckListOptions}
                onValueChange={(selectedOption) =>
                  setCheckListOption(selectedOption)
                }
                selectedValue={CheckListOption}
                title=""
              />
              <AddButton
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleSubmit}
              >
                {buttonText || "Submit"}
              </AddButton>
            </>
          )}
          {field.name === "Filters" && (
            <>
              <H6
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                Title
              </H6>

              <Input style={{ marginBottom: 0 }} />
              <hr />
              <H6
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                Members
              </H6>
              {/* <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                />
                <EmployeeInfo />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                />
                <EmployeeInfo />
              </div> */}
              <div style={{ display: "flex", alignItems: "center" }}>
  <input
    type="checkbox"
    style={{ width: "14px", height: "14px", marginLeft: "10px", marginBottom: "10px" }}
  />
  <EmployeeInfo />
</div>
<div style={{ display: "flex", alignItems: "center" }}>
  <input
    type="checkbox"
    style={{ width: "14px", height: "14px", marginLeft: "10px", marginBottom: "10px" }}
  />
  <EmployeeInfo />
</div>


              <AddButton
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleSubmit}
              >
                {buttonText || "Submit"}
              </AddButton>
            </>
          )}
        </div>
      ))}
    </Box>
  );
};

export default GenericPopup;
