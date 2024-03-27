import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import Search from '../components/Search';
import Title from '../components/Title';
import ArticleCard from '../components/articles/ArticleCard';
import { fetchedArticles } from '../redux/reducers/ArticleSlice';
import { RootState } from '../store';
import { IBlog } from '../types/types';
import { getArticlesAPI } from '../utils/Api';

const Home = () => {
  const dispatch = useDispatch();
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

  // fetch all articles list from FAKE API
  const { data, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
    enabled: articles && articles?.length === 0,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  const allArticles = [...articles].reverse();

  return (
    <div>
      {/* Main title */}
      <Title title='Blog Page' />

      {/* search input */}
      <Search />

      {/* Articles list cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 px-6 py-3'>
        {allArticles &&
          allArticles?.length > 0 &&
          allArticles?.map((article: IBlog) => (
            <ArticleCard key={article.id} article={article} />
          ))}
      </div>
    </div>
  );
};

export default Home;
