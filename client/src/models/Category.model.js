import * as yup from 'yup';
import Model from './Model';
import CategoryService from '../services/Category.service';

const CategoryModel = new Model({
  name: 'Categories',
  schema: yup.object().shape({
    name: yup.string().required('Enter a first name'),
    parentId: yup.number().integer().nullable(),
  }),
  formControls: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      placeholder: 'Name',
    },
    {
      label: 'Parent category',
      name: 'parentCategory',
      placeholder: 'Search for a category...',
      type: 'asyncTypeahead',
      labelKey: (category) => category.name,
      // fetchFn: (limit) => (query) =>
      //   CategoryService.getThruPost({ limit, where: { name: `${query}%` } }),
      fetchFn: (limit) => CategoryService.find(limit, 'name'),
    },
  ],
  defaultValues: {
    parentId: null,
    parentCategory: [],
  },
  headers: [
    'Name', 'Parent category',
  ],
  recordsToTable: (category) => category.map(({
    id, name, parentCategory,
  }) => ({
    id,
    data: [name, parentCategory[0]?.name],
  })),
  cleanRecord: ({ id, name, parentCategory }) => ({
    id, name, parentId: parentCategory[0]?.id,
  }),
});

export default CategoryModel;
