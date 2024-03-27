const Loading = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex space-x-3'>
        <div className='w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin'></div>
      </div>
    </div>
  );
};

export default Loading;
