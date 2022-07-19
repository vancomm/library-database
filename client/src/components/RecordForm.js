import { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import AsyncSelect from './AsyncSelect';

export default function RecordForm({
  model, initialValues, submitFn, buttons, direction,
}) {
  const typeaheadRefs = model.formControls
    .reduce((acc, { type, name }) => (type === 'asyncTypeahead'
      ? { ...acc, [name]: useRef() }
      : acc), {});

  const onSubmit = async (values, { resetForm }) => {
    const record = model.cleanRecord(values);
    // console.log(record);
    resetForm();
    Object.values(typeaheadRefs).forEach((taRef) => {
      taRef.current.clear();
    });
    await submitFn(record);
  };

  return (
    <Formik
      validationSchema={model.schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Stack
              direction={direction}
              gap={3}
            >
              {model.formControls.slice(0, 4).map(({
                label, name, type, placeholder, multiple, labelKey, fetchFn,
              }) => (
                <Form.Group key={`group-${name}`} as={Col} controlId={name}>
                  <Form.Label key={`label-${name}`} className="mx-1">
                    {label}
                  </Form.Label>
                  {type === 'asyncTypeahead'
                    ? (
                      <AsyncSelect
                        name={name}
                        label={label}
                        placeholder={placeholder}
                        initialValue={initialValues.parentName}
                        labelKey={labelKey}
                        multiple={multiple}
                        fetchFn={fetchFn(10)}
                        refProp={typeaheadRefs[name]}
                      />
                    )
                    : (
                      <>
                        <Form.Control
                          key={`control-${name}`}
                          type={type}
                          name={name}
                          placeholder={placeholder}
                          value={values[name]}
                          onChange={handleChange}
                          isInvalid={touched[name] && !!errors[name]}
                        />
                        <Form.Control.Feedback key={`fb-${name}`} type="invalid">{errors[name]}</Form.Control.Feedback>
                      </>
                    )}
                </Form.Group>
              ))}
            </Stack>
            <Stack
              direction={direction}
              gap={3}
              className="mt-3"
            >
              {model.formControls.slice(4).map(({
                label, name, type, placeholder, multiple, labelKey, fetchFn,
              }) => (
                <Form.Group key={`group-${name}`} as={Col} controlId={name}>
                  <Form.Label key={`label-${name}`} className="mx-1">
                    {label}
                  </Form.Label>
                  {type === 'asyncTypeahead'
                    ? (
                      <AsyncSelect
                        name={name}
                        label={label}
                        placeholder={placeholder}
                        initialValue={initialValues.parentName}
                        labelKey={labelKey}
                        multiple={multiple}
                        fetchFn={fetchFn(10)}
                        refProp={typeaheadRefs[name]}
                      />
                    )
                    : (
                      <>
                        <Form.Control
                          key={`control-${name}`}
                          type={type}
                          name={name}
                          placeholder={placeholder}
                          value={values[name]}
                          onChange={handleChange}
                          isInvalid={touched[name] && !!errors[name]}
                        />
                        <Form.Control.Feedback key={`fb-${name}`} type="invalid">{errors[name]}</Form.Control.Feedback>
                      </>
                    )}
                </Form.Group>
              ))}
            </Stack>
          </Row>
          <Row className="float-end" xs="auto">
            {buttons}
          </Row>
        </Form>
      )}
    </Formik>
  );
}

RecordForm.defaultProps = {
  direction: 'vertical',
};
