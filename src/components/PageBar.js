import React from 'react';

const PageBar = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            backgroundColor: currentPage === page ? '#ffa500' : 'white',
            color: currentPage === page ? 'white' : '#000',
            width: '30px',
            height: '30px',
            border: '1px solid #ccc',
            borderRadius: '50%',
            marginRight: '5px',
            cursor: 'pointer',
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PageBar;
