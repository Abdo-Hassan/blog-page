import React from 'react';

const ArticleCard = () => {
  return (
    <div>
      <div className='max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden'>
        <div className='p-4'>
          <h2 className='text-xl font-semibold text-gray-800 mb-2'>Test</h2>
          <p className='text-gray-600 mb-2'>Author: Abdo</p>
          <p className='text-gray-600 mb-2'>Publication Date: 3-26-2024</p>
          <p className='text-gray-800'>
            est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae
            ea dolores neque\nfugiat blanditiis voluptate porro vel nihil
            molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque
            nisi nulla
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
