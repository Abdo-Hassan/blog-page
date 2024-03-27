import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Shared/Loading';
import Search from '../components/Shared/Search';
import Title from '../components/Shared/Title';
import ArticleCard from '../components/articles/ArticleCard';
import { fetchedArticles } from '../redux/reducers/ArticleSlice';
import { RootState } from '../store';
import { IBlog } from '../types/types';
import { getArticlesAPI } from '../utils/Api';
import Pagination from '../components/Shared/Pagination';
import { useState } from 'react';
import NotFoundResult from '../components/Shared/NotFoundResult';

const Home = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const { articles } = useSelector((state: RootState) => state.articles);

  // Fetch all articles and dispatched to the store
  const fetchArticles = async () => {
    try {
      const response = await (await getArticlesAPI()).data;
      // setting response into redux reducer
      dispatch(fetchedArticles(await response));
      return response;
    } catch (error) {
      console.log('error:', error);
    }
  };

  // show only first 9 articles and reverse it to show the updated articles
  const allArticles = [...articles].reverse()?.slice(pageNumber, 9);

  // fetch all articles list from FAKE API
  const { data, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
    // to prevent fetching articles more than once
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {/* Articles list cards */}
      {allArticles && allArticles?.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-2 px-6 pt-10 pb-6'>
            {allArticles?.map((article: IBlog) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          <Pagination
            currentPage={pageNumber}
            totalPages={10}
            onPageChange={(pageNumber) => setPageNumber(pageNumber + 1)}
          />
        </>
      ) : (
        <NotFoundResult />
      )}
    </div>
  );
};

export default Home;
