import React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
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
