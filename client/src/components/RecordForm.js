import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import AsyncSelect from './AsyncSelect';

export default function RecordForm({
  model, service, submitFn, buttons, direction,
}) {
  const onSubmit = async (values, { resetForm }) => {
    resetForm();
    await submitFn(values);
  };

  return (
    <Formik
      validationSchema={model.schema}
      initialValues={model.defaultValues}
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
              {model.formControls.map(({
                label, name, type, placeholder, search,
              }) => (
                <Form.Group
                  key={`group-${name}`}
                  as={Col}
                  controlId={name}
                >
                  <Form.Label
                    key={`label-${name}`}
                    className="mx-1"
                  >
                    {label}
                  </Form.Label>
                  {type === 'asyncTypeahead'
                    ? (
                      <AsyncSelect
                        name={name}
                        label={label}
                        placeholder={placeholder}
                        fetchFn={(query) => service.get({ limit: 10, [search]: `${query}%` })}
                      />
                    )
                    : (
                      <Form.Control
                        key={`control-${name}`}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={values[name]}
                        onChange={handleChange}
                        isInvalid={touched[name] && !!errors[name]}
                      />
                    )}
                  <Form.Control.Feedback key={`fb-${name}`} type="invalid">{errors[name]}</Form.Control.Feedback>
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
