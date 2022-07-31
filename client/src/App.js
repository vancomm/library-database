import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navigation from './components/Navigation';
import TagPage from './pages/Tag.page';
import BookPage from './pages/Book.page';
import CopyPage from './pages/Copy.page';
import HomePage from './pages/Home';
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
import RequireRole from './components/RequireRole';
import { AuthModeProvider } from './contexts/AuthModeContext';

export default function App() {
  return (
    <AuthProvider>

      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth"
          element={(
            <AuthModeProvider>
              <AuthPage />
            </AuthModeProvider>
          )}
        />
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
              <RequireRole authorizedRoles={['admin']}>
                <AuthorPage />
              </RequireRole>
            </RequireAuth>
          )}
        />
        <Route
          path="/books"
          element={(
            <RequireAuth>
              <RequireRole authorizedRoles={['admin']}>
                <BookPage />
              </RequireRole>
            </RequireAuth>
          )}
        />
        <Route
          path="/borrows"
          element={(
            <RequireAuth>
              <RequireRole authorizedRoles={['admin']}>
                <BorrowPage />
              </RequireRole>
            </RequireAuth>
          )}
        />
        <Route
          path="/categories"
          element={(
            <RequireAuth>
              <RequireRole authorizedRoles={['admin']}>
                <CategoryPage />
              </RequireRole>
            </RequireAuth>
          )}
        />
        <Route
          path="/patrons"
          element={(
            <RequireAuth>
              <RequireRole authorizedRoles={['admin']}>
                <PatronPage />
              </RequireRole>
            </RequireAuth>
          )}
        />
        <Route
          path="/publishers"
          element={(
            <RequireAuth>
              <RequireRole authorizedRoles={['admin']}>
                <PublisherPage />
              </RequireRole>
            </RequireAuth>
          )}
        />
        <Route
          path="/tags"
          element={(
            <RequireAuth>
              <RequireRole authorizedRoles={['admin']}>
                <TagPage />
              </RequireRole>
            </RequireAuth>
          )}
        />
        <Route
          path="/copies"
          element={(
            <RequireAuth>
              <RequireRole authorizedRoles={['admin']}>
                <CopyPage />
              </RequireRole>
            </RequireAuth>
          )}
        />
        <Route
          path="/users"
          element={(
            <RequireAuth>
              <RequireRole authorizedRoles={['admin']}>
                <UserPage />
              </RequireRole>
            </RequireAuth>
          )}
        />
      </Routes>

    </AuthProvider>
  );
}
