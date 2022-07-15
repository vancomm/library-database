import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Books from './pages/Books.js';
import Borrows from './pages/Borrows.js';
import Navigation from './components/Navigation.js';
import Patrons from './pages/Patrons.page.js';
import Publishers from './pages/Publishers.js';
import Authors from './pages/Authors.page.js';
import Tags from './pages/Tags.js';
import Categories from './pages/Categories.js';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/borrows" element={<Borrows />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/patrons" element={<Patrons />} />
        <Route path="/publishers" element={<Publishers />} />
        <Route path="/tags" element={<Tags />} />
      </Routes>
    </>
  );
}

export default App;
