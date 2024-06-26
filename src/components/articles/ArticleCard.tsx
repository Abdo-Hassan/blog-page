import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteArticles } from '../../redux/reducers/ArticleSlice';
import { IBlog } from '../../types/types';
import { deleteArticleAPI } from '../../utils/Api';
import ModalAlert from '../Shared/ModalAlert';

const ArticleCard = ({ article }: { article: IBlog }) => {
  const [open, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);

  const deleteArticle = async () => {
    try {
      const res = await deleteArticleAPI(article?.id!);
      if (res.status === 200) {
        setIsOpen(false);
        dispatch(deleteArticles(article.id));
      }
      return res?.data;
    } catch (err) {
      throw new Error('Error deleting article');
    }
  };

  const updateArticle = () => {
    navigate('/add-article', {
      state: {
        edit: true,
        id: article.id,
        title: article.title,
        author: article.title,
        body: article.body,
      },
    });
  };
  return (
    <div className=' bg-white border border-gray-300 rounded-md overflow-hidden h-full'>
      <div className='p-4'>
        <div className='flex align-top justify-between'>
          <h2 className='text-md font-bold text-gray-800 mb-2 w-11/12'>
            {article.title}
          </h2>
          <div className='flex items-start'>
            {/* Delete article */}
            <div
              onClick={() => setIsOpen(true)}
              className='text-red-500 cursor-pointer mr-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                />
              </svg>
            </div>
            {/* Edit article */}
            <div
              onClick={updateArticle}
              className='text-blue-500 cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Author */}
        {article?.author && (
          <p className='text-gray-600 mb-2 font-semibold text-sm'>
            Author: {article.author}
          </p>
        )}

        {/* Publication date */}
        <p className='text-gray-600 mb-2 font-semibold text-sm'>
          <span className='font-bold'>Publication Date: </span>
          <span>{new Date().toLocaleDateString()}</span>
        </p>

        {/* article content */}
        <>
          {article.body.length >= 50 && !showMore ? (
            <p className='text-gray-800 text-sm'>{article.body.slice(0, 50)}</p>
          ) : (
            <p className='text-gray-800 text-sm'>{article.body}</p>
          )}

          {showMore ? (
            <button
              className='text-blue-500 mt-2'
              onClick={() => setShowMore(false)}>
              Show Less
            </button>
          ) : (
            <button
              className='text-blue-500 mt-2'
              onClick={() => setShowMore(true)}>
              Show More
            </button>
          )}
        </>
      </div>

      {/* Modal delete confirmation */}
      <ModalAlert
        isOpen={open}
        onConfirm={deleteArticle}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default ArticleCard;
