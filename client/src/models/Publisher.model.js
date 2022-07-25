import * as yup from 'yup';
import Model from './Model';
import RecordModel from './RecordModel';

const name = 'Publishers';

const formFields = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Publisher name',
    validation: yup.string().required('Enter a name'),
  },
  {
    label: 'Contact first name',
    name: 'contactFirstName',
    type: 'text',
    placeholder: 'First name',
    validation: yup.string().required('Enter a first name'),
  },
  {
    label: 'Contact last name',
    name: 'contactLastName',
    type: 'text',
    placeholder: 'Last name',
    validation: yup.string().required('Enter a last name'),
  },
  {
    label: 'Contact phone',
    name: 'contactPhone',
    type: 'tel',
    placeholder: 'Phone',
    validation: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Enter a valid phone number'),
  },
  {
    label: 'Contact email',
    name: 'contactEmail',
    type: 'email',
    placeholder: 'Email',
    validation: yup.string().email('Enter a valid email'),
  },
];

const PublisherModel = new RecordModel({ name, formFields });

export default PublisherModel;
