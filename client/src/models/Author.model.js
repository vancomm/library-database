import * as yup from 'yup';
import phoneRegex from '../data/phone-regex';
import RecordModel from './RecordModel';

const name = 'Authors';

const formFields = [
  {
    label: 'First name',
    name: 'firstName',
    type: 'text',
    placeholder: 'First name',
    validation: yup.string().required('Enter a first name'),
  },
  {
    label: 'Last name',
    name: 'lastName',
    type: 'text',
    placeholder: 'Last name',
    validation: yup.string().required('Enter a last name'),
  },
  {
    label: 'Phone',
    name: 'phone',
    type: 'tel',
    placeholder: 'Phone',
    validation: yup.string().matches(phoneRegex, 'Enter a valid phone number'),
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validation: yup.string().email('Enter a valid email'),
  },
];

const toLine = ({ firstName, lastName }) => `${firstName} ${lastName}`;

const AuthorModel = new RecordModel({ name, formFields, toLine });

export default AuthorModel;
