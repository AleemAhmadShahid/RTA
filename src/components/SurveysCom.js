import React, { useState, useRef } from "react";
import {
  CenteredContainer,
  EntriesDropdown,
  dropDownStyle,
} from "../styles/TableStyling";
// import { BoxContainer } from "../styles/TableStyling";
// import { Box } from "../pages/ForgetPassword";
import styled from "styled-components";
import { Input } from "./AddTask";
// import { TextArea } from "../pages/CardsPopup";
// import { AddButton } from "./AddTask";
import { FaStarOfLife } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { HiOutlineDuplicate } from "react-icons/hi";
import { Icon } from "../pages/CardsPopup";
import { FormButton } from "../styles/MultiStepFormStyling";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";

const InputBox = styled.input`
  //   margin-bottom: 20px;
  margin-left: 10px;
  padding: 10px;
`;
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
// const EntriesDropdown = ({ value, onChange, options, styles }) => {
//     // Implement your custom dropdown component here
//     return (
//       <select
//         value={value ? value.label : ''}
//         onChange={(e) => onChange(options.find(opt => opt.value === e.target.value))}
//         style={styles}
//       >
//         {options.map(option => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     );
//   };
const PlusButton = styled.button`
  background-color: green;
`;
const SurveysCom = () => {
  const [Options] = useState([
    { label: "Text Area" },
    { label: "Check box area" },
  ]);
  const [OptionValue, setOptionValue] = useState(null);
 
  const handleOptionChange = (selectedOption) => {
    setOptionValue({
      label: selectedOption.value,
      icon: selectedOption.icon,
    });
  };
  const handleButtonClick = () => {
    alert("Button clicked!");
  };

  //   const [checkedItems, setCheckedItems] = useState({});

  //   const handleCheckboxChange = (event) => {
  //     const { name, checked } = event.target;
  //     setCheckedItems({
  //       ...checkedItems,
  //       [name]: checked,
  //     });
  //   };
  //   const items = [
  //     { id: 1, label: "Item 1", value: "item1" },
  //     { id: 2, label: "Item 2", value: "item2" },
  //     { id: 3, label: "Item 3", value: "item3" },
  //   ];
  const [items, setItems] = useState([
    { id: 1, label: "Item 1", value: 1 },
    { id: 2, label: "Item 2", value: 2 },
    { id: 3, label: "Item 3", value: 3 },
  ]);
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
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

  return (
    <CenteredContainer>
      <BoxContainer>
        {/* <Box>
          <h6 style={{ fontWeight: "bold" }}>
            Please let us know of you have such a bad exprience{" "}
          </h6>
          <TextArea
            //   value={description}
            //   onChange={handleDescriptionChange}
            rows="4"
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <EntriesDropdown
              value={OptionValue}
              onChange={handleOptionChange}
              options={Options.map((option) => ({
                value: option.label,
                label: (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {option.icon}
                    <span style={{ marginLeft: "8px" }}>{option.label}</span>
                  </div>
                ),
                icon: option.icon,
              }))}
              styles={dropDownStyle}
            />
            <div style={{ display: "flex" }}>
              <AddButton>
                <Icon style={{ color: "orange", fontSize: "18px" }}>
                  <FaStarOfLife />
                </Icon>
                Hello
              </AddButton>
              <AddButton>
                <Icon style={{ color: "orange", fontSize: "18px" }}>
                  <HiOutlineDuplicate />
                </Icon>
                Duplicate
              </AddButton>
              <AddButton>
                <Icon style={{ color: "orange", fontSize: "18px" }}>
                  <RiDeleteBinLine />
                </Icon>
                Delete
              </AddButton>
            </div>
          </div>
        </Box> */}
        <Box>
      

      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <EntriesDropdown
          value={OptionValue}
          onChange={handleOptionChange}
          options={Options.map((option) => ({
            value: option.label,
            label: (
              <div style={{ display: "flex", alignItems: "center" }}>
                {option.icon}
                <span style={{ marginLeft: "8px" }}>{option.label}</span>
              </div>
            ),
            icon: option.icon,
          }))}
          styles={{ width: '200px', marginBottom: '16px' }} // Add your styles here
        />
      </div> */}

      <div>
        {OptionValue && OptionValue.label === 'Text Area' ? (
            <div>
            <h6 style={{ fontWeight: 'bold' }}>
            On a scale of zero to 10 How much you hate Shaheer
          </h6>
          <TextArea
            multiline
            rows={4}
            placeholder="Enter description"
            variant="outlined"
            style={{ width: '100%' }}
          />
           
          </div>
        ) : ( 
            <>
            <h6 style={{ fontWeight: 'bold' }}>
              On a scale of zero to 10 How much you hate Shaheer
            </h6>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <IoMdRemoveCircleOutline
                  onClick={() => handleRemoveClick(item.id)}
                  style={{ marginLeft: '8px', cursor: 'pointer', color: 'red' }}
                />
                <InputBox
                  type="checkbox"
                  name={`checkbox-${item.value}`}
                  checked={checkedItems[`checkbox-${item.value}`] || false}
                  onChange={handleCheckboxChange}
                  style={{ marginRight: '8px' }}
                />
                {item.label}
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
              <IoMdAddCircleOutline
                onClick={handleAddClick}
                style={{
                  fontSize: '16px',
                  cursor: 'pointer',
                  color: 'green',
                  marginLeft: '8px',
                }}
              />
              <span
                style={{
                  marginLeft: '8px',
                  color: 'grey',
                  opacity: 0.5,
                 
                }}
              >
                Add Item
              </span>
            </div>
          </>
        )}
         {/* <div style={{ display: 'flex', marginTop: '16px' }}>
      <FormButton style={{ marginLeft: "auto" }}> Submit</FormButton>
      </div> */}
      {/* <div style={{ display: "flex" }}>
              <AddButton>
                <Icon style={{ color: "orange", fontSize: "18px" }}>
                  <FaStarOfLife />
                </Icon>
                Hello
              </AddButton>
              <AddButton>
                <Icon style={{ color: "orange", fontSize: "18px" }}>
                  <HiOutlineDuplicate />
                </Icon>
                Duplicate
              </AddButton>
              <AddButton>
                <Icon style={{ color: "orange", fontSize: "18px" }}>
                  <RiDeleteBinLine />
                </Icon>
                Delete
              </AddButton>
            </div> */}
      </div>
     
      <div style={{ display: "flex", justifyContent: "space-between",marginTop:'10px' }}>
        <EntriesDropdown
          value={OptionValue}
          onChange={handleOptionChange}
          options={Options.map((option) => ({
            value: option.label,
            label: (
              <div style={{ display: "flex", alignItems: "center" }}>
                {option.icon}
                <span style={{ marginLeft: "8px" }}>{option.label}</span>
              </div>
            ),
            icon: option.icon,
          }))}
          styles={{ width: '200px', marginBottom: '16px' }} // Add your styles here
        />
      {/* </div>*/}
      <div style={{ display: "flex" }}> 
              <AddButton>
                <Icon style={{ color: "orange", fontSize: "18px" }}>
                  <FaStarOfLife />
                </Icon>
                Hello
              </AddButton>
              <AddButton>
                <Icon style={{ color: "orange", fontSize: "18px" }}>
                  <HiOutlineDuplicate />
                </Icon>
                Duplicate
              </AddButton>
              <AddButton>
                <Icon style={{ color: "orange", fontSize: "18px" }}>
                  <RiDeleteBinLine />
                </Icon>
                Delete
              </AddButton>
            </div>
            </div>
    </Box>
      </BoxContainer>
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
            onClick={handleButtonClick}
          >
            Add Question
          </h4>
        </Box>
      </BoxContainer>

      {/* for checkbox */}
      {/* <BoxContainer>
        <Box>
          <h6 style={{ fontWeight: "bold" }}>
            On a scale of zero to 10 How much you hate Shaheer{" "}
          </h6>

          <div>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <IoMdRemoveCircleOutline
                  onClick={() => handleRemoveClick(item.id)}
                  style={{ marginLeft: "8px", cursor: "pointer", color: "red" }}
                />
                <InputBox
                  type="checkbox"
                  name={`checkbox-${item.value}`}
                  checked={checkedItems[`checkbox-${item.value}`] || false}
                  onChange={handleCheckboxChange}
                  style={{ marginRight: "8px" }}
                />
                {item.label}
              </div>
            ))}
            <IoMdAddCircleOutline
              onClick={handleAddClick}
              style={{
                fontSize: "16px",
                cursor: "pointer",
                color: "green",
                marginLeft: "8px",
              }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <FormButton style={{ marginLeft: "auto" }}> Submit</FormButton>
          </div>
        </Box>
      </BoxContainer> */}
    </CenteredContainer>
  );
};
export default SurveysCom;
