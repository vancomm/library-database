import * as yup from 'yup';

const name = 'Patrons';

const schema = yup.object().shape({
  name: yup.string().required('Enter a first name'),
  parentId: yup.number().integer(),
});

const formControls = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Name',
  },
  {
    label: 'Parent Id',
    name: 'parentId',
    placeholder: 'Search for a category...',
    type: 'asyncTypeahead',
    search: 'name',
  },
];

const defaultValues = {
  name: '',
  parentId: '',
};

const recordsToTable = (category) => category.map(({
  id, ...rest
}) => ({
  id,
  data: Object.values(rest),
}));

const recordToTitle = (category) => category.name;

export default {
  name,
  schema,
  formControls,
  defaultValues,
  recordsToTable,
  recordToTitle,
};
