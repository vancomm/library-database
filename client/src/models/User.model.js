import * as yup from 'yup';
import PatronService from '../services/Patron.service';
import Model from './Model';

const UserModel = new Model({
  name: 'Users',
  schema: yup.object().shape({
    username: yup.string()
      .min(6, 'Username must be at least 6 characters long')
      .max(20, 'Username must not be longer than 20 characters')
      .matches(/^[A-Za-z0-9._]+$/, 'Must include only latin letters, numbers, periods or underscores')
      .matches(/^(?![_.])[A-Za-z0-9._]+(?<![_.])$/, 'Must not start or end with a period or an underscore')
      .required('Enter your username'),
    name: yup.string().required('Enter your name'),
    password: yup.string().min(6, 'Password must be at least 6 characters long').required('Enter your password'),
    role: yup.string().oneOf(['admin', 'user']).required('Select a role'),
    patron: yup.array().of(yup.object()).when('role', {
      is: 'user',
      then: yup.array().of(yup.object()).length(1, 'Select a patron profile for this user'),
    }),
  }),
  formControls: [
    {
      label: 'Username',
      name: 'username',
      type: 'text',
      placeholder: 'Enter username',
    },
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      placeholder: 'Enter name',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'text',
      placeholder: 'Enter password',
    },
    {
      label: 'Role',
      name: 'role',
      type: 'select',
      placeholder: 'Select role...',
      options: [
        { text: 'Administrator', value: 'admin' },
        { text: 'User', value: 'user' },
      ],
    },
    {
      label: 'Patron',
      name: 'patron',
      type: 'asyncTypeahead',
      placeholder: 'Search for a patron...',
      labelKey: (patron) => `${patron.firstName} ${patron.lastName}`,
      fetchFn: (limit, token) => PatronService.find(limit, 'firstName || \' \' || lastName', token, false, false),
    },
  ],
  defaultValues: {
    patron: [],
  },
  headers: ['Username', 'Name', 'Role', 'patronId'],
  recordsToTable: (users) => users.map(({
    id, username, name, role, patronId,
  }) => ({
    id,
    data: [username, name, role, patronId],
  })),
  /*  TODO: clearRecord function!!
   */
});

export default UserModel;
