import React from 'react';
import { IBlog } from '../../types/types';
import { deletePostAPI } from '../../utils/Api';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article }: { article: IBlog }) => {
  const navigate = useNavigate();
  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const deleteArticle = async () => {
    try {
      const res = (await deletePostAPI(article?.id)).data;
      if (res) {
        queryClient.invalidateQueries({ queryKey: ['fetchArticles'] });
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const updateArticle = () => {
    navigate('/add-article', {
      state: {
        edit: true,
        id: article.id,
        title: article.title,
        author: article.title,
        content: article.body,
      },
    });
  };
  return (
    <div className=' bg-white border border-gray-300 rounded-md overflow-hidden h-full'>
      <div className='p-4'>
        <button onClick={deleteArticle}>Delete</button>
        <button onClick={updateArticle}>Edit</button>
        <h2 className='text-xl font-bold text-gray-800 mb-2'>
          {article.title}
        </h2>
        <p className='text-gray-600 mb-2 font-semibold'>
          Author: {article.title}
        </p>
        <p className='text-gray-600 mb-2 font-semibold'>
          Publication Date: {new Date().toLocaleDateString()}
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
  );
};

export default ArticleCard;
