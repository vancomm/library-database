import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/index.css';
import * as yup from 'yup';
import App from './App';
import CategoryService from './services/Category.service';

function aggregate(formFields) {
  return formFields.reduce((acc, field) => {
    const [validations, defaultValues, formControls] = acc;
    const {
      name, validation, defaultValue, ...controlData
    } = field;
    return [
      { ...validations, [name]: validation },
      { ...defaultValues, [name]: defaultValue },
      [...formControls, { name, ...controlData }],
    ];
  }, [{}, {}, []]);
}

const formFields = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Name',
    defaultValue: '',
    validation: yup.string().required('Enter category name'),
  },
  {
    label: 'Parent category',
    name: 'parentCategory',
    placeholder: 'Search for a category...',
    type: 'asyncTypeahead',
    validation: yup.array().of(yup.object()),
    defaultValue: [],
    labelKey: (category) => category.name,
    fetchFn: (limit, token) => CategoryService.find(limit, 'name', token),
  },
];

const [shape, defaultValues, formControls] = aggregate(formFields);

// console.log({ shape, defaultValues, formControls });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
