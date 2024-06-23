 import React,{useState} from "react";
 import styled from "styled-components";
 import FilterBox from "../../components/FilterBox";
 import { AddButton } from "../CardsPopup";
 import Board from "./Board";
 import Calendar from "./Calendar";
import { CenteredContainer } from "../../styles/TableStyling";
 const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  
  top: 0;
  color:white;
  background-color: #0066a0;
  padding: 10px 20px;
  // border-bottom: 1px solid #ddd;
`;
const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
 const PMMainPage=()=>{
  const CheckListOptions = [
    { value: "calendar", label: "Calendar" },
    { value: "board", label: "Board" },
    //{ value: "timeline", label: "Timeline" },
  ];const [checkListOption, setCheckListOption] = useState(CheckListOptions[0]);
  const [boxPosition, setBoxPosition] = useState({ left: 0, top: 0 });
  const handleCheckListOptionChange = (selectedOption) => {
    setCheckListOption(selectedOption);
  };
  const [isFiltersPopupOpen, setIsFiltersPopupOpen] = useState(false);
  const openFiltersPopup = (event) => {
    const clickedDiv = event.currentTarget;
    const rect = clickedDiv.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;

    setBoxPosition({ left, top });
    console.log(left, top);

    setIsFiltersPopupOpen(true);
  };


  


    return (
      <>
      <CenteredContainer style={{marginBottom:"10px"}}>
        <TopBar>
          <div style={{ display: "flex", alignItems: "center" }}>
            <HeadingContainer>
              <h4 style={{fontWeight:"bold",fontSize:"21px"}}>Project</h4>
              <h6 style={{ marginLeft: "50px" }}> Workspace </h6>
              <FilterBox
                width={"100%"}
                options={CheckListOptions}
                onValueChange={(selectedOption) =>
                  handleCheckListOptionChange(selectedOption)
                }
                selectedValue={checkListOption}
                title=""
                style={{ backgroundColor: "transparent" }}
              />
            </HeadingContainer>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AddButton
              style={{
                color:"white",
                width: "100%",
                height: "40px",
                marginRight: "10px",
                marginTop: "3px",
                backgroundColor: " #99C1D9",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                padding: "20px",
              }}
            >
              Automations
            </AddButton>
            <AddButton
              style={{
                color:"white",
                width: "100%",
                height: "40px",
                marginRight: "10px",
                marginTop: "3px",
                backgroundColor: " #99C1D9",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                padding: "20px",
              }}
              onClick={openFiltersPopup}
            >
              Filters
            </AddButton>
          </div>
        </TopBar>
        
        </CenteredContainer>
        
        {checkListOption.value === "calendar" && <Calendar />}
        {checkListOption.value === "board" && <Board />}
        </>
    );
}
 export default PMMainPage;
 
  