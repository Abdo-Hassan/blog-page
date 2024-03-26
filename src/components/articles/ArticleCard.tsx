import React from 'react';
import { IBlog } from '../../types/types';

const ArticleCard = ({ article }: { article: IBlog }) => {
  return (
    <div>
      <div className=' bg-white shadow-lg rounded-md overflow-hidden h-full'>
        <div className='p-4'>
          <h2 className='text-xl font-bold text-gray-800 mb-2'>
            {article.title}
          </h2>
          <p className='text-gray-600 mb-2 font-semibold'>
            Author: {article.title}
          </p>
          <p className='text-gray-600 mb-2 font-semibold'>
            Publication Date: {article.title}{' '}
          </p>
          <p className='text-gray-800'>
            {article.body.length > 20 ? (
              <button className='text-blue-500'>Read more</button>
            ) : (
              article.body
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
