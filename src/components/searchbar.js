import React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 230px;
  margin-bottom:0px;
  margin-right:10px;
  margin-left:10px;
  @media screen and (max-width: 845px) {
    margin-left:0px;
    margin-top:0px;
    margin-right:0px;
   
      width:300px; /* Adjust alignment if needed */
      margin-bottom:10px;
    
  }
`;

const SearchBar = ({ onSearch }) => {
  return (
    <position>
      <SearchInput
        type="text"
        placeholder="Search Here"
        onChange={(e) => onSearch(e.target.value)}
      />
    </position>
  );
};

export default SearchBar;
