import * as yup from 'yup';
import Model from './Model';
import CategoryService from '../services/Category.service';

const CategoryModel = new Model({
  name: 'Categories',
  schema: yup.object().shape({
    name: yup.string().required('Enter category name'),
    parentCategory: yup.array().of(yup.object()),
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
      fetchFn: (limit, token) => CategoryService.find(limit, 'name', token),
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
