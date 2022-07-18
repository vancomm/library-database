import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Page from './components/Page';
import Home from './pages/Home.page';
import Books from './pages/Books.page';
import Borrows from './pages/Borrows.page';
import PatronModel from './data/Patron.model';
import AuthorModel from './data/Author.model';
import PatronService from './services/Patron.service';
import AuthorService from './services/Author.service';
import TagService from './services/Tag.service';
import TagModel from './data/Tag.model';
import PublisherService from './services/Publisher.service';
import PublisherModel from './data/Publisher.model';
import CategoryService from './services/Category.service';
import CategoryModel from './data/Category.model';

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
        <Route path="/books" element={<Books />} />
        <Route path="/borrows" element={<Borrows />} />
        {/* <Route path="/categories" element={<Categories />} /> */}
        <Route
          path="/categories"
          element={(
            <Page
              key="category"
              service={CategoryService}
              model={CategoryModel}
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
