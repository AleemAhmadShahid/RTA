import styled ,{ keyframes } from "styled-components";

import { Link } from "react-router-dom";
import Select from "react-select";
import SearchBar from "../../components/searchbar";

export const CreateEmployeeHeading = styled.h6`
  margin-bottom: 0px;
  width: 100%;
  //  right: 0%;
  // font-weight: lighter;
  // fontsize: "smaller";
`;

export const Th = styled.th`
  background: #f3f2f7;
  color: #6e6b7b;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  height: 30px;
  top: 10%;
  padding: 9px 62.4px;
  font-weight: medium;
   width: 100%;
  font-size: 0.7rem;
  text-align: center;


  white-space: nowrap; /* Prevent text from wrapping */
  

  @media screen and (min-width: 845px) {

  }
`;

export const Tr = styled.tr`
  //   padding: 1px 0px;
  //  text-align: center;
  //   border-bottom: 0px solid #ddd;
  margin: 100px;

  & > :first-child {
    width: 10px;
  }
`;
export const Td = styled.td`
  padding: 10px 4px;

  white-space: nowrap;
  width: 100%; /* Set the width to 100% */
  text-align: center;

  border-top: 1px solid #ededed;
  vertical-align: center;
  color: #6e6b7b;
  font-weight: medium;
  font-size: 0.7rem;
`;

export const Table = styled.table`
  position: stick;
  margin-top: 27px;
  width: 100%;
  overflow-x: auto;

  //   border-bottom: none;
  //   color: #ffa500;
  backgorund-color: #ffa500;
  border-collapse: collapse;
  border-spacing: 10px 5px;
  border: 0px solid #ccc;

  @media screen and (max-width: 845px) {
    width: 100%;
    margin-top: 10px;
  }
`;
export const AddEmployeeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 845px) {
    flex-direction: column; /* Stack elements vertically for mobile view */
    align-items: flex-start; /* Adjust alignment if needed */
    padding: 0px 0px 9px 0px;
    margin-right: 10px;
    width: 100%;
  }
`;

export const SuccessBadge = styled.span`
  background-color: rgba(40, 199, 111, 0.12) !important;
  color: #28c76f !important;
  padding: 5px 14px;
  border-radius: 4px;
`;

export const DangerBadge = styled.span`
  background-color: #ea54542c;
  color: #ea5455;
  padding: 4px 12px;
  border-radius: 4px;
`;

export const UserImage = styled.img`
  width: 39px;
  height: 31px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: -4px;
`;
export const BoxContainer = styled.div`
  // border: 0px solid #ccc;
  padding: 3px 0px;
  box-shadow: 0px 01px 0px rgba(0, 0, 0, 0);
  border-radius: 5px;
  background: #ffffff;
  margin-top: 24px;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
`;

export const AddEmployeeButton = styled(Link)`
  background-color: #ffa500;
  color: #fff;
  padding: 7px 40px;
  
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  // margin-left: 0px;
  margin-top: 6px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff8000;
  }
  @media screen and (max-width: 845px) {
    padding: 7px 10px; /* Adjust padding for smaller screens */
    min-width: 10px; /* Set a fixed width for smaller screens */
    width: 100%;
    margin-left:0px;

  }
`;

export const HeadingAndSearchContainer = styled.div`
  display: flex;
  padding: 7px 40px;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 845px) {
    flex-direction: column; /* Stack elements vertically for mobile view */
     align-items: flex-start; /* Adjust alignment if needed */
    padding: 10px 20px;
    margin-right: 0px;
    // margin-right: 5px;
    
  }
`;

export const StyledSearchBar = styled(SearchBar)`
  width: 10%;
  @media screen and (max-width: 845px) {
    width: 100%; /* Adjust alignment if needed */
    margin-bottom: 10px;
  }
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  // box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
`;

export const CenteredContainer = styled.div`
  position: relative;
  right: 13%;
  top: 95px;
  left: 253px;
  padding: 0px 20px;
  border-radius: 5px;
  width: 81.9%; /* Default width */

  @media (max-width: 845px) {
    width: 100%; /* Set width to 100% for mobile view */
    left: 0;
    right: 0;
  }

  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
`;

export const EntriesDropdown = styled(Select)`
  width: ${(props) => (props.width ? props.width : '150px')};
  margin-right: 8px;

  .select__control {
    border: 1px solid orange; /* Change border color to orange */
    border-radius: 5px;
    // padding: 5px;
    transition: border-color 0.3s ease;

    &:hover {
      border-color: orange;
    }

    &:focus {
      outline: none;
      border-color: orange; /* Change border color to orange when focused */
      box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.5);
    }
  }
  @media screen and (max-width: 845px) {
    width: 100%; /* Set width to 100% for mobile view */
    margin-bottom: 10px;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & > * {
    flex: 1;
    margin-right: 13px;
  }

  & > *:last-child {
    margin-right: 0;
  }

  @media (max-width: 845px) {
    flex-direction: column;
    width: 100%; /* Set width to 100% for mobile view */
    & > * {
      margin-right: 0; /* Remove the right margin for mobile view */
    }
  }
`;

export const FilterOuterBox = styled.div`
  background: #fff;
  display: flex; /* Use flex display to align FilterBox components side by side */
  // align-items: center;
  border-bottom-left-radius: 5px; /* Adjust as needed */
  border-bottom-right-radius: 5px; /* Adjust as needed */

  padding: 5px 20px; /* Add padding to create spacing between FilterBox components */
  // width: 100%; /* Set the width to 100% to increase with screen width */

  @media (max-width: 845px) {
    padding: 5px 20px;
    flex-direction: column;
    
      width: 100%;
    
  }
`;

export const FilterContainer = styled.div`
  background: #fff;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  border-radius: 5px;
  
  
`;
// Loader Container
export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

// Spinner Animation
export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Spinner Icon
export const SpinnerIcon = styled.div`
  animation: ${spin} 1s infinite linear;
  font-size: 24px;
`;

// Loader Text
export const LoaderText = styled.div`
  font-size: 16px;
  margin-left: 8px;
`;


export const IconWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

export const dropDownStyle = {
  menu: (provided) => ({
    ...provided,
    background: "#ffffff",
    border: provided.isFocused
      ? "1px solid orange"
      : "1px solid #ccc",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "white" : "white",
    color: state.isSelected ? "black" : "black",
    "&:hover": {
      backgroundColor: "#ffa500",
      color: "white",
    },
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
};
