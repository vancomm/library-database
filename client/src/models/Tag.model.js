import * as yup from 'yup';
import Model from './Model';
import RecordModel from './RecordModel';

const name = 'Tags';

const formFields = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Tag name',
    validation: yup.string().required('Enter tag\'s name'),
  },
];

const TagModel = new RecordModel({ name, formFields });

export default TagModel;
