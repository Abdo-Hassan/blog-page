import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import AddArticle from './components/articles/AddArticle';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          {/* Home page */}
          <Route path='/' element={<Home />} />
          {/* Add article page */}
          <Route path='/add-article' element={<AddArticle />} />
          {/* Nor found page */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
