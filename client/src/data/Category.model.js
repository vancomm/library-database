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
      name: 'parentId',
      placeholder: 'Search for a category...',
      type: 'asyncTypeahead',
      labelKey: (category) => category.name,
      fetchFn: (limit) => (query) => CategoryService.getComplex({ limit, where: { name: `${query}%` } }),
    },
  ],
  defaultValues: {
    parentId: null,
  },
  headers: [
    'Name', 'Parent category',
  ],
  recordsToTable: (category) => category.map(({
    id, ...data
  }) => ({
    id,
    data: [data.name, data.parentName],
  })),
  cleanRecord: (values) => ({
    id: values.id, name: values.name, parentId: values.parentId,
  }),
});

export default CategoryModel;
