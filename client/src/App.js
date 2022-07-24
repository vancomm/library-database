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
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/Auth.page';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './contexts/AuthContext';
import UserPage from './pages/User.page';

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={(
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          )}
        />
        <Route
          path="/authors"
          element={(
            <RequireAuth>
              <AuthorPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/books"
          element={(
            <RequireAuth>
              <BookPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/borrows"
          element={(
            <RequireAuth>
              <BorrowPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/categories"
          element={(
            <RequireAuth>
              <CategoryPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/patrons"
          element={(
            <RequireAuth>
              <PatronPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/publishers"
          element={(
            <RequireAuth>
              <PublisherPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/tags"
          element={(
            <RequireAuth>
              <TagPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/copies"
          element={(
            <RequireAuth>
              <CopyPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/users"
          element={(
            <RequireAuth>
              <UserPage />
            </RequireAuth>
          )}
        />
      </Routes>
    </AuthProvider>
  );
}
