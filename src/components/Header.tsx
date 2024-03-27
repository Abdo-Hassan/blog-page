import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  let location = useLocation();
  const pathName = location.pathname;
  return (
    <div className='sticky top-0 z-10'>
      <header className='bg-slate-800 text-white  py-4'>
        <div className='container mx-auto flex justify-between items-center px-4'>
          <Link to='/' className='text-2xl font-semibold'>
            Home
          </Link>

          {/* add article button */}
          {pathName !== '/add-article' && (
            <nav>
              <ul className='flex space-x-4'>
                <li>
                  <Link
                    to='/add-article'
                    className='hover:bg-green-700 rounded-lg bg-green-600 px-3 py-2 text-white'>
                    Add Article
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
