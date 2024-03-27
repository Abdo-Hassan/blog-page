const NotFoundResult = () => {
  return (
    <div className='max-w-md mx-auto my-5 bg-white rounded-xl border overflow-hidden md:max-w-2xl'>
      <div className='p-8'>
        <div className='md:text-center'>
          <svg
            className='h-12 w-12 text-blue-500 mx-auto'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path d='M21 21l-18-18m18 0L3 21'></path>
          </svg>
          <h1 className='text-2xl font-bold text-gray-800 mt-2'>
            No Results Found
          </h1>
          <p className='mt-2 text-gray-600'>
            Sorry, we couldn't find any results. Please try again with a
            different search term.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundResult;
