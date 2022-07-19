import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Page from './components/Page';
import Home from './pages/Home.page';
import Borrows from './pages/Borrows.page';
import PatronModel from './data/Patron.model';
import AuthorModel from './data/Author.model';
import TagModel from './data/Tag.model';
import PublisherModel from './data/Publisher.model';
import CategoryModel from './data/Category.model';
import BookModel from './data/Book.model';
import PatronService from './services/Patron.service';
import AuthorService from './services/Author.service';
import TagService from './services/Tag.service';
import PublisherService from './services/Publisher.service';
import CategoryService from './services/Category.service';
import BookService from './services/Book.service';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/authors"
          element={(
            <Page
              key="authors"
              service={AuthorService}
              model={AuthorModel}
            />
          )}
        />
        <Route
          path="/books"
          element={(
            <Page
              key="books"
              service={BookService}
              model={BookModel}
              auxServices={{ authorId: AuthorService, publisherId: PublisherService }}
            />
          )}
        />
        <Route path="/borrows" element={<Borrows />} />
        <Route
          path="/categories"
          element={(
            <Page
              key="category"
              service={CategoryService}
              model={CategoryModel}
              auxServices={{ parentId: CategoryService }}
            />
          )}
        />
        <Route
          path="/patrons"
          element={(
            <Page
              key="patrons"
              service={PatronService}
              model={PatronModel}
            />
          )}
        />
        <Route
          path="/publishers"
          element={(
            <Page
              key="publishers"
              service={PublisherService}
              model={PublisherModel}
            />
          )}
        />
        <Route
          path="/tags"
          element={(
            <Page
              key="tags"
              service={TagService}
              model={TagModel}
            />
          )}
        />
      </Routes>
    </>
  );
}

export default App;
