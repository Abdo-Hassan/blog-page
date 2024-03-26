import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <header className='bg-slate-800 text-white py-4'>
        <div className='container mx-auto flex justify-between items-center px-4'>
          <Link to='/' className='text-2xl font-semibold'>
            Home
          </Link>
          <nav>
            <ul className='flex space-x-4'>
              <li>
                <Link to='/' className='hover:text-gray-300'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/add-article' className='hover:text-gray-300'>
                  Articles
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
