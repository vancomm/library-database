import * as yup from 'yup';
import AuthorService from '../services/Author.service';
import CategoryService from '../services/Category.service';
import PublisherService from '../services/Publisher.service';
import TagService from '../services/Tag.service';
import AuthorModel from './Author.model';
import CategoryModel from './Category.model';
import Model from './Model';
import PublisherModel from './Publisher.model';
import TagModel from './Tag.model';

const BookModel = new Model({
  name: 'Books',
  schema: yup.object().shape({
    title: yup.string().required('Enter a title'),
    publishedDate: yup.date().required('Enter a date'),
    pages: yup.number().integer().required('Enter number of pages'),
    publisher: yup.array().of(yup.object()).length(1, 'Select a publisher'),
    authors: yup.array().of(yup.object()).min(1, 'Select one or more authors'),
    categories: yup.array().of(yup.object()),
    tags: yup.array().of(yup.object()),
  }),
  formControls: [
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      placeholder: 'Title',
    },
    {
      label: 'Date of publication',
      name: 'publishedDate',
      type: 'date',
      placeholder: '',
    },
    {
      label: 'Pages count',
      name: 'pages',
      type: 'number',
      placeholder: 'Pages count',
    },
    {
      label: 'Publisher',
      name: 'publisher',
      type: 'asyncTypeahead',
      placeholder: 'Search for a publisher...',
      labelKey: (publisher) => publisher.name,
      fetchFn: (limit, token) => PublisherService.find(limit, 'name', token),
    },
    {
      label: 'Authors',
      name: 'authors',
      type: 'asyncTypeahead',
      placeholder: 'Search for an author...',
      multiple: true,
      labelKey: (author) => `${author.firstName} ${author.lastName}`,
      fetchFn: (limit, token) => AuthorService.find(limit, 'firstName || \' \' || lastName', token, false, false),
    },
    {
      label: 'Categories',
      name: 'categories',
      type: 'asyncTypeahead',
      placeholder: 'Search for a category...',
      multiple: true,
      labelKey: (category) => category.name,
      fetchFn: (limit, token) => CategoryService.find(limit, 'name', token),
    },
    {
      label: 'Tags',
      name: 'tags',
      type: 'asyncTypeahead',
      placeholder: 'Search for a tag...',
      multiple: true,
      labelKey: (tag) => tag.name,
      fetchFn: (limit, token) => TagService.find(limit, 'name', token),
    },
  ],
  defaultValues: {
    publisherId: null,
    publisher: [],
    authors: [],
    categories: [],
    tags: [],
  },
  headers: ['Title', 'Pages', 'Publisher', 'Publication date', 'Authors', 'Categories', 'Tags'],
  recordsToTable: (books) => books.map(({
    id, title, pages, publisher, publishedDate, authors, categories, tags,
  }) => {
    const res = ({
      id,
      data: [title, pages, PublisherModel.recordToTitle(publisher[0]), publishedDate,
        authors.map(AuthorModel.recordToTitle).join(', '),
        categories.map(CategoryModel.recordToTitle).join(', '),
        tags.map(TagModel.recordToTitle).join(', ')],
    });
    return res;
  }),
  cleanRecord: ({
    id, title, publisher, publishedDate, pages, authors, categories, tags,
  }) => ({
    id,
    title,
    publisherId: publisher[0].id,
    publishedDate,
    pages,
    authorIds: authors.map((author) => author.id),
    categoryIds: categories.map((category) => category.id),
    tagIds: tags.map((tag) => tag.id),
  }),
  recordToTitle: (book) => book.title,
});

export default BookModel;
