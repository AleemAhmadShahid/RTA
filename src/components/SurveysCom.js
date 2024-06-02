import React, { useState } from "react";
import { CenteredContainer, EntriesDropdown } from "../styles/TableStyling";

import styled from "styled-components";
import { SaveAndNextButton } from "../styles/MultiStepFormStyling";
import { FaStarOfLife } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { HiOutlineDuplicate } from "react-icons/hi";
import { Icon } from "../pages/CardsPopup";
// import { SaveButton } from "../styles/MultiStepFormStyling";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import { BsCardText } from "react-icons/bs";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { MdOutlineStarRate } from "react-icons/md";
const BoxContainer = styled.div`
  padding: 10px;
  background-color: white;
  border: 1px solid orange;
  border-radius: 5px;
  margin-bottom: 20px;
`;
const TextArea = styled.textarea`
  border-radius: 5px;
  width: 100%;
  padding: 10px;
  background: #f5f5f5;
  margin-bottom: 5px;

  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border: none;
  outline: none;
`;
const Box = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const AddButton = styled.button`
  width: 120px;
  border: none;
  display: flex;
  margin-left: 10px;

  align-items: center;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 7px;
  background-color: white;

  font-weight: medium;
  padding: 5px;
  border-radius: 3px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffd580;
  }
`;
const CircleNumber = styled.div`
  display: flex;
  background-color: white;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);

  margin-left: 10px;
  cursor: pointer;
`;

const SurveysCom = ({ isRead }) => {
  const [Options] = useState([
    { label: "Text Area", icon: BsCardText },
    { label: "Check box ", icon: RiCheckboxMultipleLine },
    { label: "Rating Scale", icon: MdOutlineStarRate },
  ]);
  const [OptionValue, setOptionValue] = useState(null);

  const handleOptionChange = (selectedOption) => {
    setOptionValue({
      label: selectedOption.value,
      icon: selectedOption.icon,
    });
  };

  const [items, setItems] = useState([
    { id: 1, label: "Item 1", value: 1 },
    { id: 2, label: "Item 2", value: 2 },
    { id: 3, label: "Item 3", value: 3 },
  ]);
  const [checkedItems, setCheckedItems] = useState(false);

  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };
  const handleItemLabelChange = (id, newLabel) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, label: newLabel } : item
      )
    );
  };

  const handleAddClick = () => {
    const newItemId = items.length + 1;
    const newItem = {
      id: newItemId,
      label: `Item ${newItemId}`,
      value: newItemId,
    };
    setItems([...items, newItem]);
  };
  const handleRemoveClick = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
    const updatedCheckedItems = { ...checkedItems };
    delete updatedCheckedItems[`checkbox-${itemId}`];
    setCheckedItems(updatedCheckedItems);
  };

  const [text, setText] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  const handleFocus = (id) => {
    setComponentsData(
      componentsData.map((component) =>
        component.id === id ? { ...component, isEditable: true } : component
      )
    );
  };

  const handleBlur = (id) => {
    setComponentsData(
      componentsData.map((component) =>
        component.id === id && component.text.trim() === ""
          ? { ...component, text: "Enter your text here...", isEditable: false }
          : component
      )
    );
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const [componentsData, setComponentsData] = useState([]);

  const handleAddQuestionComponent = () => {
    setComponentsData([
      ...componentsData,
      {
        id: Date.now(),
        text: "Enter your text here...",
        isEditable: false,
        OptionValue: Options[0],
      },
    ]);
  };

  const [ratings, setRatings] = useState([1]);

  const addRating = () => {
    setRatings([...ratings, ratings.length + 1]);
  };
  const removeRating = () => {
    if (ratings.length > 1) {
      setRatings(ratings.slice(0, -1));
    }
  };

  const handleDeleteComponent = (id) => {
    setComponentsData(
      componentsData.filter((component) => component.id !== id)
    );
  };

  const handleComponentChange = (id, newText) => {
    setComponentsData(
      componentsData.map((component) =>
        component.id === id ? { ...component, text: newText } : component
      )
    );
  };

  const QuestionBoxComponent = (component, index) => (
    <BoxContainer key={index}>
      <Box>
        <div>
          {OptionValue && OptionValue.label === "Text Area" ? (
            <div>
              <textarea
                value={component.text}
                onFocus={() => handleFocus(component.id)}
                onBlur={() => handleBlur(component.id)}
                onChange={(e) =>
                  handleComponentChange(component.id, e.target.value)
                }
                style={{
                  color: isEditable ? "black" : "grey",
                  width: "100%",
                  height: "24px",
                  fontSize: "16px",
                  resize: "none",
                  border: "none",
                  pointerEvents: isRead ? "none" : "auto",
                  userSelect: isRead ? "none" : "auto",
                  background: isRead ? "transparent" : "transparent",
                }}
                placeholder={isEditable ? "" : "Enter here..."}
                readOnly={isRead}
              />
              <TextArea
                rows={4}
                placeholder="Enter description"
                style={{ width: "100%" }}
                readOnly={!isRead}
              />
            </div>
          ) : OptionValue && OptionValue.label === "Rating Scale" ? (
            <div>
              <textarea
                type="text"
                value={component.text}
                onFocus={() => handleFocus(component.id)}
                onBlur={() => handleBlur(component.id)}
                onChange={(e) =>
                  handleComponentChange(component.id, e.target.value)
                }
                style={{
                  color: isEditable ? "black" : "grey",
                  width: "100%",
                  fontSize: "16px",
                  border: "none",
                  pointerEvents: isRead ? "none" : "auto",
                  userSelect: isRead ? "none" : "auto",
                  background: isRead ? "transparent" : "transparent",
                }}
                placeholder={isEditable ? "" : "Enter Question here..."}
                readOnly={isRead}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                {!isRead && (
                  <>
                    <IoMdRemoveCircleOutline
                      onClick={removeRating}
                      style={{
                        marginLeft: "8px",
                        cursor: "pointer",
                        color: "red",
                      }}
                    />
                    <IoMdAddCircleOutline
                      onClick={addRating}
                      style={{
                        fontSize: "16px",
                        cursor: "pointer",
                        color: "green",
                        marginLeft: "8px",
                      }}
                    />
                  </>
                )}

                {ratings.map((rating) => (
                  <CircleNumber
                    key={rating}
                    onClick={() => (isRead ? alert("Button clicked") : null)}
                  >
                    {rating}
                  </CircleNumber>
                ))}

                {/* {!isRead && <AddCircleButton onClick={addRating}>+</AddCircleButton>} */}
              </div>
            </div>
          ) : (
            <>
              <textarea
                value={component.text}
                onFocus={() => handleFocus(component.id)}
                onBlur={() => handleBlur(component.id)}
                onChange={(e) =>
                  handleComponentChange(component.id, e.target.value)
                }
                style={{
                  color: isEditable ? "black" : "grey",
                  width: "100%",
                  height: "24px",
                  fontSize: "16px",
                  resize: "none",
                  border: "none",
                  pointerEvents: isRead ? "none" : "auto",
                  userSelect: isRead ? "none" : "auto",
                  background: isRead ? "transparent" : "transparent",
                }}
                placeholder={isEditable ? "" : "Enter Question here..."}
                readOnly={isRead}
              />
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  {!isRead && (
                    <IoMdRemoveCircleOutline
                      onClick={() => handleRemoveClick(item.id)}
                      style={{
                        marginLeft: "8px",
                        cursor: "pointer",
                        color: "red",
                        marginRight: "8px",
                      }}
                    />
                  )}
                  {isRead && (
                    <input
                      type="checkbox"
                      name={`checkbox-${item.value}`}
                      checked={checkedItems[`checkbox-${item.value}`] || false}
                      onChange={handleCheckboxChange}
                      style={{ marginRight: "8px" }}
                    />
                  )}

                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) =>
                      handleItemLabelChange(item.id, e.target.value)
                    }
                    readOnly={isRead}
                    style={{
                      border: "none",
                      background: "transparent",
                      fontSize: "16px",
                      color: isRead ? "grey" : "black",
                      pointerEvents: isRead ? "none" : "auto",
                      userSelect: isRead ? "none" : "auto",
                      background: isRead ? "transparent" : "transparent",
                    }}
                  />
                </div>
              ))}

              {!isRead && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
                  <IoMdAddCircleOutline
                    onClick={handleAddClick}
                    style={{
                      fontSize: "16px",
                      cursor: "pointer",
                      color: "green",
                      marginLeft: "8px",
                      marginRight: "8px",
                    }}
                  />
                  <span
                    style={{
                      marginLeft: "8px",
                      color: "grey",
                      opacity: 0.5,
                    }}
                  >
                    Add Item
                  </span>
                </div>
              )}
            </>
          )}
        </div>
        {!isRead && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <EntriesDropdown
              value={OptionValue}
              onChange={handleOptionChange}
              options={Options.map((option,index) => ({
                value: option.label,
                label: (
                  <div style={{ display: "flex", alignItems: "center" }}>
                   {option.icon && <option.icon />}
                    <span style={{ marginLeft: "8px" }}>{option.label}</span>
                  </div>
                ),
                icon: option.icon,
              }))}
              styles={{ width: "250px", marginBottom: "16px" }}
            />

            <div style={{ display: "flex" }}>
              <AddButton>
                <Icon style={{ color: "orange", fontSize: "18px" }}>
                  <FaStarOfLife />
                </Icon>
                Required
              </AddButton>
              <AddButton>
                <Icon style={{ color: "orange", fontSize: "18px" }}>
                  <HiOutlineDuplicate />
                </Icon>
                Duplicate
              </AddButton>
              <AddButton onClick={() => handleDeleteComponent(component.id)}>
                <Icon style={{ color: "orange", fontSize: "18px" }}>
                  <RiDeleteBinLine />
                </Icon>
                Delete
              </AddButton>
            </div>
          </div>
        )}
        {isRead && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
          < SaveAndNextButton>
            Submit
          </SaveAndNextButton>
        </div>
        
        )}
      </Box>
    </BoxContainer>
  );

  return (
    <CenteredContainer>
      {componentsData.map((component, index) =>
        QuestionBoxComponent(component, index)
      )}
      <BoxContainer style={{ border: "none" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4
            style={{ color: "#50C878", fontWeight: "bold", cursor: "pointer" }}
            onClick={handleAddQuestionComponent}
          >
            Add Question
          </h4>
        </Box>
      </BoxContainer>
    </CenteredContainer>
  );
};
export default SurveysCom;
