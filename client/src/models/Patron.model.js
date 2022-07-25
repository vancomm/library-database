import * as yup from 'yup';
import RecordModel from './RecordModel';
import phoneRegex from '../data/phone-regex';

const name = 'Patrons';

const formFields = [
  {
    label: 'First name',
    name: 'firstName',
    type: 'text',
    placeholder: 'First name',
    validation: yup.string().required('Enter a first name'),
    defaultValue: '',
  },
  {
    label: 'Last name',
    name: 'lastName',
    type: 'text',
    placeholder: 'Last name',
    validation: yup.string().required('Enter a last name'),
    defaultValue: '',
  },
  {
    label: 'Phone',
    name: 'phone',
    type: 'tel',
    placeholder: 'Phone',
    validation: yup.string().matches(phoneRegex, 'Enter a valid phone number'),
    defaultValue: '',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validation: yup.string().email('Enter a valid email'),
    defaultValue: '',
  },
];

const toLine = ({ firstName, lastName }) => `${firstName} ${lastName}`;

const PatronModel = new RecordModel({
  name, formFields, toLine,
});

export default PatronModel;
