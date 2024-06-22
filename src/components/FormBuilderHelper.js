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
import {SurvyTopBar} from "../pages/Global/FormBuilder"
const BoxContainer = styled.div`
  padding: 10px;
  margin-left: 20%;
  margin-right: 20%;
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

const SurveysCom = ({ isRead, formData, handleChange }) => {
  const [Options] = useState([
    { label: "Single Line", icon: BsCardText, value:  "Single Line" },
    { label: "Multi Line", icon: BsCardText, value:  "Multi Line" },
    { label: "Checkboxes", icon: RiCheckboxMultipleLine , value:  "Checkboxes"},
    { label: "Radio Button Group", icon: RiCheckboxMultipleLine , value:  "Radio Button Group"},
    { label: "Rating Scale", icon: MdOutlineStarRate, value:  "Rating Scale"},
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

  // const handleChange = (e) => {
  //   setText(e.target.value);
  // };


  // const handleAddQuestionComponent = () => {
  //   setComponentsData([
  //     ...componentsData,
  //     {
  //       id: Date.now(),
  //       text: "Enter your text here...",
  //       isEditable: false,
  //       OptionValue: Options[0],
  //       ratings: [1],
  //     },
  //   ]);
  // };

  


  const [ratings, setRatings] = useState([1]);

  const addRating = () => {
    setRatings([...ratings, ratings.length + 1]);
  };
  const removeRating = () => {
    if (ratings.length > 1) {
      setRatings(ratings.slice(0, -1));
    }
  };



  const QuestionSet = ({questionSet, index}) => {
  const [componentsData, setComponentsData] = useState([]);
  
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

  
  const handleAddQuestionComponent = (id) => {
    setComponentsData([
      ...componentsData,
      {
        id: id || Date.now(),
        text: "Enter your text here...",
        isEditable: false,
        OptionValue: Options[0],
        ratings: [1],
        items: [
          { id: 1, label: "Item 1", value: 1 },
          { id: 2, label: "Item 2", value: 2 },
          { id: 3, label: "Item 3", value: 3 },
        ],
        checkedItems: {},
      },
    ]);
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
  
  const QuestionBoxComponent = (question, index, questionSetIndex) => (
    <>
      <BoxContainer key={index}>
        <Box>
          <div>
                <textarea
                  value={question.question}
                  // onFocus={() => handleFocus(component.id)}
                  // onBlur={() => handleBlur(component.id)}
                  onChange={(e) =>
                    handleChange(`questionSets.${questionSetIndex}.questions.${index}.question`, e.target.value)
                  }
                  style={{
                    color: isRead ? "black" : "grey",
                    width: "100%",
                    height: "24px",
                    fontSize: "16px",
                    resize: "none",
                    border: "none",
                    pointerEvents: isRead ? "none" : "auto",
                    userSelect: isRead ? "none" : "auto",
                    background: isRead ? "transparent" : "transparent",
                  }}
                  placeholder={isRead ? "" : "Enter here..."}
                  readOnly={isRead}
                />
            {question.type && question.type === "Single Line" ? (
              <div>
                <TextArea
                  rows={1}
                  placeholder="Enter description"
                  style={{ width: "100%" , resize: "none",overflow: "hidden", whiteSpace: "nowrap" }}
                  readOnly={!isRead}
                  wrap="off"
                />
              </div>
            ): question.type === "Multi Line" ? (
              <div>
                <TextArea
                  rows={4}
                  placeholder="Enter description"
                  style={{ width: "100%" }}
                  readOnly={!isRead}
                />
              </div>
            ) : question.type === "Rating Scale" ? (
              <div>
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

                  {question.ratings.map((rating) => (
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
                {question.options.map((item, itemIndex) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    {!isRead && (
                      <IoMdRemoveCircleOutline
                        onClick={() => handleChange(`questionSets.${questionSetIndex}.questions.${index}.options`, question.options.filter((item,i) => i!=index ))}
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
                        name={`${item}`}
                        checked={
                          question.selectedOptions[`${item}`] || false
                        }
                        style={{ marginRight: "8px" }}
                      />
                      
                    )}

                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleChange(`questionSets.${questionSetIndex}.questions.${index}.options.${itemIndex}`, e.target.value)
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
                      onClick={() => handleChange(`questionSets.${questionSetIndex}.questions.${index}.options.${question.options.length}`, `Item ${question.options.length+1}`)}
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
                value={Options.filter((option) => option.value == question.type).map((option) => ({
                  value: option.value,
                  label: (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {option.icon && <option.icon />}
                      <span style={{ marginLeft: "8px" }}>{option.label}</span>
                    </div>
                  ),
                  icon: option.icon,
                }))[0] }

                onChange={(option) =>
                  handleChange(`questionSets.${questionSetIndex}.questions.${index}.type`, option.value)
                }
                options={Options.map((option) => ({
                  value: option.value,
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
                <AddButton onClick={() => handleChange(`questionSets.${questionSetIndex}.questions.${index}.required`,!question.required)}>
                  <Icon style={{ color: "orange", fontSize: "18px" }}>
                    <FaStarOfLife />
                  </Icon>
                  Required
                </AddButton>
                <AddButton onClick={() => handleChange(`questionSets.${questionSetIndex}.questions`, [...questionSet.questions, {...question}])}>
                  <Icon style={{ color: "orange", fontSize: "18px" }}>
                    <HiOutlineDuplicate />
                  </Icon>
                  Duplicate
                </AddButton>
                <AddButton onClick={() => handleChange(`questionSets.${questionSetIndex}.questions`, questionSet.questions.filter((question, i) => (i != index)))}>
                  <Icon style={{ color: "orange", fontSize: "18px" }}>
                    <RiDeleteBinLine />
                  </Icon>
                  Delete
                </AddButton>
              </div>
            </div>
          )}
        </Box>
      </BoxContainer>
    </>
  );

  return (
    <>
    <BoxContainer>   
      <SurvyTopBar>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
        <textarea
          value={questionSet.text}
          onChange={(e) =>
            handleChange(`questionSets.${index}.text`, e.target.value)
          }
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
          value={questionSet.description}
          onChange={(e) =>
            handleChange(`questionSets.${index}.description`, e.target.value)
          }
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
   </BoxContainer>
      {questionSet?.questions.map((question, questionIndex) =>
        QuestionBoxComponent(question, questionIndex, index )
      )}
     {!isRead && (<BoxContainer style={{ border: "none" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
         <h4
            style={{ color: "#50C878", fontWeight: "bold", cursor: "pointer" }}
            onClick={() => handleChange(`questionSets.${index}.questions.${questionSet.questions.length}`,
              {
                id: Date.now(),
                name: "Enter your text here...",
                required: false,
                isEditable: false,
                type: Options[0].value,
                ratings: [1],
                options: [
                  "Item 1", "Item 2", "Item 3"
                ]
              },
            )}
          
          >
            Add Question
          </h4>
        </Box>
    </BoxContainer>
    )
    }
    </>
  );
  }
  return (
    <CenteredContainer>

      {
        formData?.questionSets?.map((questionSet, index) =>   <QuestionSet questionSet={questionSet} index={index} key={"QuestionSet"+index}/>)
      }

      {
        !isRead &&
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
              onClick={() => handleChange(`questionSets.${formData?.questionSets?.length || "0"}`, {questions: []})}
            >
              Add Question Set
            </h4>
          </Box>
        </BoxContainer>
      }
    
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <SaveAndNextButton>{isRead ? "Save": "Submit"}</SaveAndNextButton>
      </div>     
    </CenteredContainer>
  );
};
export default SurveysCom;
