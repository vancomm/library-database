import * as yup from 'yup';

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

export default class RecordModel {
  constructor({
    name, formFields, tableHeaders, toData, toRow, toLine,
  }) {
    this.name = name;

    const [shape, defaultValues, formControls] = aggregate(formFields);

    this.validationSchema = yup.object().shape(shape);
    this.defaultValues = defaultValues;
    this.formControls = formControls;

    this.tableHeaders = tableHeaders || defaultTableHeaders(formControls);

    this.toData = toData || defaultToData;
    this.toRow = toRow || defaultToRow;

    this.toLine = toLine ?? defaultToLine;
  }
}
