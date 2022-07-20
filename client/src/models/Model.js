export default class Model {
  constructor(
    {
      name,
      schema,
      formControls,
      defaultValues,
      headers,
      recordsToTable,
      cleanRecord,
      recordToTitle,
    },
  ) {
    this.name = name;

    this.schema = schema;

    this.formControls = formControls;

    this.defaultValues = { ...formControls.reduce((acc, control) => ({ ...acc, [control.name]: '' }), {}), ...defaultValues };

    this.headers = headers || formControls.map(({ label }) => label);

    this.recordsToTable = recordsToTable || ((records) => records
      .map(({ id, ...rest }) => ({ id, data: Object.values(rest) })));

    this.cleanRecord = cleanRecord || ((record) => record);

    this.recordToTitle = recordToTitle || ((record) => record.name);
  }
}
