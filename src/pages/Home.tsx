import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
import ArticleCard from '../components/articles/ArticleCard';
import { IBlog } from '../types/types';
import { Fragment } from 'react/jsx-runtime';

const Home = () => {
  // Fetch all articles with pagination default : 10 articles
  const fetchArticles = async ({ pageParam = 10 }: { pageParam?: number }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${
        10 * pageParam
      }`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  // handle paginated articles with page number
  const {
    data: articles,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchArticles'],
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
      <h1 className='text-center text-4xl text-emerald-700 py-5 font-semibold'>
        Welcome to Article list page
      </h1>

      {/* Articles list cards */}
      <div className='grid grid-cols-3 gap-4 p-8'>
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
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
    </div>
  );
};

export default Home;
