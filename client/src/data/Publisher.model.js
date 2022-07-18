import * as yup from 'yup';

const name = 'Publishers';

const schema = yup.object().shape({
  name: yup.string().required('Enter a name'),
  contactFirstName: yup.string().required('Enter a first name'),
  contactLastName: yup.string().required('Enter a last name'),
  contactPhone: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Enter a valid phone number'),
  contactEmail: yup.string().email('Enter a valid email'),
});

const formControls = [{
  label: 'Name',
  name: 'name',
  type: 'text',
  placeholder: 'Publisher name',
},
{
  label: 'Contact first name',
  name: 'contactFirstName',
  type: 'text',
  placeholder: 'First name',
},
{
  label: 'Contact last name',
  name: 'contactLastName',
  type: 'text',
  placeholder: 'Last name',
},
{
  label: 'Contact phone',
  name: 'contactPhone',
  type: 'tel',
  placeholder: 'Phone',
},
{
  label: 'Contact email',
  name: 'contactEmail',
  type: 'email',
  placeholder: 'Email',
},
];

const defaultValues = {
  name: '',
  contactFirstName: '',
  contactLastName: '',
  contactPhone: '',
  contactEmail: '',
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

const recordToTitle = (publisher) => publisher.name;

export default {
  name,
  schema,
  formControls,
  defaultValues,
  recordsToTable,
  recordToTitle,
};
