interface PaginationProps {
  nPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  nPages,
  currentPage,
  setCurrentPage,
}) => {
  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  return (
    <ul className='mb-5 pagination flex items-center justify-center'>
      {/* Previous */}
      <button
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        className='text-xs sm:text-sm disabled:bg-gray-300 disabled:text-black disabled:cursor-not-allowed px-4 py-2 rounded-l border border-gray-300 bg-blue-700 text-white hover:bg-blue-500focus:outline-none'>
        Previous
      </button>

      {/* Mapping through each page number */}
      {pageNumbers.map((pgNumber) => (
        <li key={pgNumber}>
          <button
            onClick={() => setCurrentPage(pgNumber)}
            className={`text-xs sm:text-sm px-2 sm:px-4 py-2 border-t border-b border-gray-300 ${
              currentPage === pgNumber
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100'
            } focus:outline-none`}>
            {pgNumber}
          </button>
        </li>
      ))}

      {/* Next */}
      <button
        onClick={goToNextPage}
        disabled={nPages === currentPage}
        className='text-xs sm:text-sm disabled:bg-gray-300 disabled:text-black disabled:cursor-not-allowed px-4 py-2 rounded-r border border-gray-300 bg-blue-700 text-white hover:bg-blue-500 focus:outline-none'>
        Next
      </button>
    </ul>
  );
};

export default Pagination;
