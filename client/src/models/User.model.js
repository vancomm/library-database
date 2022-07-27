import * as yup from 'yup';
import RecordModel from './RecordModel';
import PatronService from '../services/Patron.service';
import PatronModel from './Patron.model';

const modelName = 'Users';

const formFields = [
  {
    label: 'Username',
    name: 'username',
    type: 'text',
    placeholder: 'Enter username',
    validation: yup.string()
      .min(6, 'Username must be at least 6 characters long')
      .max(20, 'Username must not be longer than 20 characters')
      .matches(/^[A-Za-z0-9._]+$/, 'Must include only latin letters, numbers, periods or underscores')
      .matches(/^(?![_.])[A-Za-z0-9._]+(?<![_.])$/, 'Must not start or end with a period or an underscore')
      .required('Enter your username'),
  },
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Enter name',
    validation: yup.string().required('Enter your name'),
  },
  {
    label: 'Password',
    name: 'password',
    type: 'text',
    placeholder: 'Enter password',
    validation: yup.string().min(6, 'Password must be at least 6 characters long').required('Enter your password'),
  },
  {
    label: 'Role',
    name: 'role',
    type: 'select',
    placeholder: 'Select role...',
    validation: yup.string().oneOf(['admin', 'user']).required('Select a role'),
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
    validation: yup.array().of(yup.object()).when('role', {
      is: 'user',
      then: yup.array().of(yup.object()).length(1, 'Select a patron profile for this user'),
    }),
    defaultValue: [],
    labelKey: PatronModel.toLine,
    fetchFn: (limit, token) => PatronService.find(limit, 'firstName || \' \' || lastName', token, false, false),
  },
];

const tableHeaders = ['Username', 'Name', 'Role', 'patronId'];

const toData = ({
  id, username, password, name, role, patron,
}) => ({
  id, username, password, name, role, patronId: patron[0]?.id,
});

const toRow = ({
  id, username, name, role, patronId,
}) => ([
  id, username, name, role, patronId,
]);

const UserModel = new RecordModel({
  name: modelName, formFields, tableHeaders, toData, toRow,
});

export default UserModel;
