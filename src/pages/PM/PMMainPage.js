import React, { useState } from "react";
import styled from "styled-components";
import FilterBox from "../../components/FilterBox";
import { AddButton } from "../CardsPopup";
import Board from "./Board";
import Calendar from "./Calendar";
import { AiOutlineUser,AiOutlineTeam,AiOutlineProject  } from "react-icons/ai";
import { HiOutlineTemplate } from "react-icons/hi";
import { CenteredContainer } from "../../styles/TableStyling";
import {
  GreyHeading,
  UploadBox,
  Details,
  DetailContainer,
} from "../../components/EmpProfileMainPage";
import { PiCrownSimple } from "react-icons/pi";

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;

  top: 0;
  color: white;
  background-color: #0066a0;
  padding: 10px 20px;
`;
const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Template = styled.div`
  padding: 10px;
  width: 250px;
  height: 120px;
  border-radius: 5px;
  margin-right: 20px;
  background-image: url("/Shaheer.jpeg");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: flex-start;
  color: white;
  font-size: 20px;
  font-weight: 500;
`;

const TemplateContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
`;
const PMMainPage = () => {
  const CheckListOptions = [
    { value: "calendar", label: "Calendar" },
    { value: "board", label: "Board" },
    //{ value: "timeline", label: "Timeline" },
  ];
  const [checkListOption, setCheckListOption] = useState(CheckListOptions[0]);
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
      <CenteredContainer style={{ marginBottom: "10px" }}>
        <TopBar>
          <div style={{ display: "flex", alignItems: "center" }}>
            <HeadingContainer>
              <h4 style={{ fontWeight: "bold", fontSize: "21px" }}>Project</h4>
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
                color: "white",
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
                color: "white",
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
        {/* <div style={{ background: "white", padding: "20px",marginTop:"20px",borderRadius:"5px", }}>
          <div
            style={{ padding: "20px", display: "flex", alignItems: "center" }}
          >
            <UploadBox margin="0" transform="none" />
            <div
              styles={{
                display: "flex",
                flexdirection: "column",
                justifyContent: "center",
                marginLeft: "20px",
              }}
            >
             
              <h4>Shaheer Imran's Workspace</h4>
              
              <div>
                <DetailContainer>
                  <PiCrownSimple />
                  <Details>Private</Details>
                </DetailContainer>
              </div>
            </div>
          </div>
          <hr />
          <DetailContainer style={{display:"flex"}}>
          <HiOutlineTemplate  style={{fontSize:"24px",marginRight:"10px"}}/><h4 style={{ fontWeight: "500" }}>Most Popular Templates</h4>
          </DetailContainer>
          
          <GreyHeading style={{ fontWeight: "300", marginBottom: "40px" }}>
            Getting Faster with a template from RTA PM
          </GreyHeading>
          <TemplateContainer>
            <Template>
              <h6
                style={{
                  background: "white",
                  borderRadius: "5px",
                  color: "black",
                  padding: "5px",
                  fontSize: "13px",
                  display: "inline-block",
                }}
              >
                Template
              </h6>
              Project
            </Template>
            <Template>
              <h6
                style={{
                  background: "white",
                  borderRadius: "5px",
                  color: "black",
                  padding: "5px",
                  fontSize: "13px",
                  display: "inline-block",
                }}
              >
                Template
              </h6>
              Project
            </Template><Template>
              <h6
                style={{
                  background: "white",
                  borderRadius: "5px",
                  color: "black",
                  padding: "5px",
                  fontSize: "13px",
                  display: "inline-block",
                  // fontWeight:"00",
                }}
              >
                Template
              </h6>
              Project
            </Template><Template>
              <h6
                style={{
                  background: "white",
                  borderRadius: "5px",
                  color: "black",
                  padding: "5px",
                  fontSize: "13px",
                  display: "inline-block",
                }}
              >
                Template
              </h6>
              Project
            </Template>
          </TemplateContainer>
          <DetailContainer style={{display:"flex"}}>
          <AiOutlineUser  style={{fontSize:"20px",marginRight:"10px"}}/><h6 style={{ fontWeight: "600" }}>Your Boards</h6>
          </DetailContainer>
          {/* <h6>Your Boards</h6> */}

          {/* <TemplateContainer>
          <Template>
              
              Test
            </Template>
            <Template />
            <Template />
          </TemplateContainer> */}
        {/* </div>  */}
      </CenteredContainer>

       {checkListOption.value === "calendar" && <Calendar />}
        {checkListOption.value === "board" && <Board />} 
    </>
  );
};
export default PMMainPage;
