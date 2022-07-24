import * as yup from 'yup';
import Model from './Model';
import phoneRegex from '../data/phone-regex';

const PatronModel = new Model({
  name: 'Patrons',
  schema: yup.object().shape({
    firstName: yup.string().required('Enter a first name'),
    lastName: yup.string().required('Enter a last name'),
    phone: yup.string().matches(phoneRegex, 'Enter a valid phone number'),
    email: yup.string().email('Enter a valid email'),
  }),
  formControls: [
    {
      label: 'First name',
      name: 'firstName',
      type: 'text',
      placeholder: 'First name',
    },
    {
      label: 'Last name',
      name: 'lastName',
      type: 'text',
      placeholder: 'Last name',
    },
    {
      label: 'Phone',
      name: 'phone',
      type: 'tel',
      placeholder: 'Phone',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
    },
  ],
  recordToTitle: ({ firstName, lastName }) => `${firstName} ${lastName}`,
});

export default PatronModel;
