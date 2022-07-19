import * as yup from 'yup';
import Model from './Model';

const TagModel = new Model({
  name: 'Tags',
  schema: yup.object().shape({
    name: yup.string().required('Enter tag\'s name'),
  }),
  formControls: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      placeholder: 'Tag name',
    },
  ],
});

export default TagModel;
