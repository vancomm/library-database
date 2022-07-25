import * as yup from 'yup';
import CategoryService from '../services/Category.service';
import RecordModel from './RecordModel';

const modelName = 'Categories';

const formFields = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Name',
    validation: yup.string().required('Enter category name'),
  },
  {
    label: 'Parent category',
    name: 'parentCategory',
    placeholder: 'Search for a category...',
    type: 'asyncTypeahead',
    validation: yup.array().of(yup.object()),
    defaultValue: [],
    labelKey: (category) => category.name,
    fetchFn: (limit, token) => CategoryService.find(limit, 'name', token),
  },
];

const tableHeaders = ['Name', 'Parent category'];

const toData = ({ id, name, parentCategory }) => ({
  id, name, parentId: parentCategory[0]?.id,
});

const toRow = ({
  id, name, parentCategory,
}) => ([
  id,
  name, parentCategory[0]?.name,
]);

const CategoryModel = new RecordModel({
  name: modelName, formFields, tableHeaders, toData, toRow,
});

export default CategoryModel;
