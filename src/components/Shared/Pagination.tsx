import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  sliceSize?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  sliceSize = 5,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const getPageRange = () => {
    const start = Math.max(1, currentPage - Math.floor(sliceSize / 2));
    const end = Math.min(start + sliceSize - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <ul className='mb-5 pagination flex items-center justify-center'>
      <li className={`${isFirstPage ? 'disabled' : ''}`}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className='px-4 py-2 rounded-l border border-gray-300 bg-blue-700 text-white hover:bg-blue-500focus:outline-none'>
          Previous
        </button>
      </li>

      {getPageRange().map((page) => (
        <li key={page}>
          <button
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 border-t border-b border-gray-300 ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100'
            } focus:outline-none`}>
            {page}
          </button>
        </li>
      ))}

      <li className={`${isLastPage ? 'disabled' : ''}`}>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className='px-4 py-2 rounded-r border border-gray-300 bg-blue-700 text-white hover:bg-blue-500 focus:outline-none'>
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
