import React from 'react';
import styled from "styled-components";


const PageBarContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Align container to the right */
  margin-top: 10px; /* Add some margin for spacing */
  margin-right:30px;
`;

const Container = styled.div`
  border: 1px solid #ededed;
  border-radius: 20px;
  background: #ededed;
  display: inline-flex;
  align-items: center;
`;


const PageButton = styled.button`
  background-color: ${props => props.active ? '#ffa500' : '#ededed'};
  color: ${props => props.active ? 'white' : '#000'};
  width: 30px;
  height: 30px;
  border: 1px solid #ededed;
  border-radius: 50%;
  margin-left: 5px;
  cursor: pointer;
`;

const PageBar = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <PageBarContainer>
    <Container>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </PageButton>

      {pages.map((page) => (
        <PageButton
          key={page}
          onClick={() => onPageChange(page)}
          active={currentPage === page}
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </PageButton>
    </Container>
    </PageBarContainer>
  );
};

export default PageBar;
