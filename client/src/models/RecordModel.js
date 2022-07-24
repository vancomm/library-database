import * as yup from 'yup';

function aggregate(formFields) {
  return formFields.reduce((acc, field) => {
    const [validations, defaultValues, formControls] = acc;
    const { validation, defaultValue, ...controlData } = field;
    return [
      { ...validations, [field.name]: validation },
      { ...defaultValues, [field.name]: defaultValue },
      [...formControls, controlData],
    ];
  }, [{}, {}, []]);
}

export default class RecordModel {
  constructor(name, formFields, tableHeaders, toData, toRow, toString) {
    this.name = name;

    const [shape, defaultValues, formControls] = aggregate(formFields);

    this.validationSchema = yup.object.shape(shape);
    this.defaultValues = defaultValues;
    this.formControls = formControls;

    this.tableHeaders = tableHeaders;

    this.toData = toData;
    this.toRow = toRow;
    this.toString = toString;
  }
}
