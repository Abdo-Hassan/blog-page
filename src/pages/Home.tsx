import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ApiRequest } from '../utils/Api';
import { IBlog } from '../types/types';
import ArticleCard from '../components/articles/ArticleCard';
import Loading from '../components/Loading';

const Home = () => {
  const fetchArticles = async () => {
    return await ApiRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/posts'
    );
  };

  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className='text-center text-4xl text-emerald-700 py-5 font-semibold '>
        Welcome to Article list page
      </h1>
      <div className='grid grid-cols-3 gap-4 p-8'>
        {articles &&
          articles?.length > 0 &&
          articles?.map((article: IBlog) => (
            <ArticleCard key={article.id} article={article} />
          ))}
      </div>
    </div>
  );
};

export default Home;
