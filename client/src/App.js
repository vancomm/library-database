import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import TagPage from './pages/Tag.page';
import BookPage from './pages/Book.page';
import CopyPage from './pages/Copy.page';
import HomePage from './pages/Home.page';
import AuthorPage from './pages/Author.page';
import BorrowPage from './pages/Borrow.page';
import PatronPage from './pages/Patron.page';
import CategoryPage from './pages/Category.page';
import PublisherPage from './pages/Publisher.page';

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authors" element={<AuthorPage />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/borrows" element={<BorrowPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/patrons" element={<PatronPage />} />
        <Route path="/publishers" element={<PublisherPage />} />
        <Route path="/tags" element={<TagPage />} />
        <Route path="/copies" element={<CopyPage />} />
      </Routes>
    </>
  );
}
