import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment } from 'react/jsx-runtime';
import Loading from '../components/Loading';
import ArticleCard from '../components/articles/ArticleCard';
import { IBlog } from '../types/types';
import Search from '../components/Search';
import { useDispatch } from 'react-redux';
import { fetchedArticles } from '../redux/reducers/ArticleSlice';
import { ApiRequest } from '../utils/Api';
import Title from '../components/Title';

const Home = () => {
  const dispatch = useDispatch();
  // Fetch all articles with pagination default : 10 articles
  const fetchArticles = async ({ pageParam = 10 }: { pageParam?: number }) => {
    const response = await ApiRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/posts?_start=${pageParam}&_limit=${10}`
    );

    const data = response.data;
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    } else {
      // setting response into redux reducer
      dispatch(fetchedArticles(await data));
    }

    return data;
  };

  // const { articles } = useSelector((state: RootState) => state.articles);

  // handle paginated articles with page number
  const {
    data: articles,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchArticles'],
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam = 1 }) => fetchArticles({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: IBlog[]) => {
      return lastPage.length > 0 ? lastPage[lastPage.length - 1].id : null;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {/* Main title */}
      <Title title='Blog Page' />

      {/* search input */}
      <Search />

      {/* Articles list cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 px-6 py-3'>
        {articles &&
          articles?.pages?.length > 0 &&
          articles?.pages.map((singleArticle, i) => (
            <Fragment key={i}>
              {singleArticle.map((article: IBlog) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </Fragment>
          ))}
      </div>

      {/* fetch more articles button */}
      <div className='px-7 py-2 text-center'>
        <button
          className='bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage
            ? 'Loading 10 more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
    </div>
  );
};

export default Home;
