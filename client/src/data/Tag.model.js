import * as yup from 'yup';

const name = 'Tags';

const schema = yup.object().shape({
  name: yup.string().required('Enter tag\'s name'),
});

const formControls = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Tag name',
  },
];

const defaultValues = {
  name: '',
};

const recordsToTable = (tags) => tags.map(({
  id, ...rest
}) => ({
  id,
  data: Object.values(rest),
}));

const recordToTitle = (tag) => tag.name;

export default {
  name,
  schema,
  formControls,
  defaultValues,
  recordsToTable,
  recordToTitle,
};
