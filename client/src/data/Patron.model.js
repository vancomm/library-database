import * as yup from 'yup';

const name = 'Patrons';

const schema = yup.object().shape({
  firstName: yup.string().required('Enter a first name'),
  lastName: yup.string().required('Enter a last name'),
  phone: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Enter a valid phone number'),
  email: yup.string().email('Enter a valid email'),
});

const formControls = [
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
];

const defaultValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
};

// const recordsToTable = (patrons) => patrons.map(({
//   id, firstName, lastName, phone, email,
// }) => ({
//   id,
//   data: [firstName, lastName, phone, email],
// }));

const recordsToTable = (patrons) => patrons.map(({
  id, ...rest
}) => ({
  id,
  data: Object.values(rest),
}));

const recordToTitle = ({ firstName, lastName }) => `${firstName} ${lastName}`;

export default {
  name,
  schema,
  formControls,
  defaultValues,
  recordsToTable,
  recordToTitle,
};
