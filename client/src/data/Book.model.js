import * as yup from 'yup';
import AuthorService from '../services/Author.service';
import CategoryService from '../services/Category.service';
import PublisherService from '../services/Publisher.service';
import TagService from '../services/Tag.service';
import Model from './Model';

const BookModel = new Model({
  name: 'Books',
  schema: yup.object().shape({
    title: yup.string().required('Enter a title'),
    publishedDate: yup.date().required('Enter a date'),
    pages: yup.number().integer().required('Enter number of pages'),
    publisherId: yup.number().integer().nullable().required('Select a publisher'),
    authorIds: yup.array().of(yup.number().integer()).min(1, 'Select one or more authors'),
    categoryIds: yup.array(yup.number().integer(('Select one or more categories'))),
    tagIds: yup.array(yup.number().integer('Select one or more tags')),
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
      name: 'publisherId',
      type: 'asyncTypeahead',
      placeholder: 'Search for a publisher...',
      labelKey: (publisher) => publisher.name,
      fetchFn: (limit) => PublisherService.find(limit, 'name'),
    },
    {
      label: 'Authors',
      name: 'authorIds',
      type: 'asyncTypeahead',
      placeholder: 'Search for an author...',
      multiple: true,
      labelKey: (author) => `${author.firstName} ${author.lastName}`,
      fetchFn: (limit) => AuthorService.find(limit, 'firstName || \' \' || lastName', false, false),
    },
    {
      label: 'Categories',
      name: 'categoryIds',
      type: 'asyncTypeahead',
      placeholder: 'Search for a category...',
      multiple: true,
      labelKey: (category) => category.name,
      fetchFn: (limit) => CategoryService.find(limit, 'name'),
    },
    {
      label: 'Tags',
      name: 'tagIds',
      type: 'asyncTypeahead',
      placeholder: 'Search for a tag...',
      multiple: true,
      labelKey: (tag) => tag.name,
      fetchFn: (limit) => TagService.find(limit, 'name'),
    },
  ],
  defaultValues: {
    publisherId: null,
    authorIds: [],
    categoryIds: [],
    tagIds: [],
  },
  recordToTitle: (book) => book.title,
});

export default BookModel;
