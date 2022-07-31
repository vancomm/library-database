import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function aggregate(formFields) {
  return formFields.reduce((acc, field) => {
    const [validations, defaultValues, formControls] = acc;
    const { validation, defaultValue, ...controlData } = field;
    return [
      { ...validations, [field.name]: validation },
      { ...defaultValues, [field.name]: defaultValue || '' },
      [...formControls, controlData],
    ];
  }, [{}, {}, []]);
}

const defaultTableHeaders = (formControls) => formControls.map(({ label }) => label);

const defaultToData = (record) => record;

const defaultToRow = ({ id, ...rest }) => [id, ...Object.values(rest)];

const defaultToLine = (record) => record.name;

async function defaultBeforeInsert(record, ctx) {
  return new Promise((resolve, reject) => {
    resolve({ success: true, record: this.toData(record) });
  });
}

async function defaultBeforeUpdate(record, ctx) {
  return new Promise((resolve, reject) => {
    resolve({ success: true, record: this.toData(record) });
  });
}

export default class RecordModel {
  constructor({
    name, formFields, tableHeaders,
    toData, toRow, toLine,
    beforeUpdate, beforeInsert,
    buttons,
  }) {
    this.name = name;

    const [shape, defaultValues, formControls] = aggregate(formFields);

    this.shape = shape;

    this.validationSchema = yup.object().shape(shape);
    this.defaultValues = defaultValues;
    this.formControls = formControls;

    this.tableHeaders = tableHeaders || defaultTableHeaders(formControls);

    this.toData = toData || defaultToData;
    this.toRow = toRow || defaultToRow;

    this.toLine = toLine ?? defaultToLine;

    this.beforeInsert = beforeInsert ?? defaultBeforeInsert;

    this.beforeUpdate = beforeUpdate ?? defaultBeforeUpdate;
  }
}
