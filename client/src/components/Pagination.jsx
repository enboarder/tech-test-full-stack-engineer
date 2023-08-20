import React from 'react';
import './Pagination.css';

const Pagination = ({
  currentPage,
  handlePageChange,
  hasNextPage,
  hasPreviousPage,
}) => {
  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
      >
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
