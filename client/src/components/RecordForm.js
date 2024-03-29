import { useRef, useState } from 'react';
import { Formik } from 'formik';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import AsyncSelect from './AsyncSelect';
import { useAuth } from '../contexts/AuthContext';
import { useModel } from '../contexts/ModelContext';
import chunks from '../utils/chunks';

export default function RecordForm({
  initialValues, submitFn, buttons, direction,
}) {
  const { token } = useAuth();
  const { formControls, validationSchema } = useModel();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const typeaheadRefs = formControls
    .reduce((acc, { type, name }) => (type === 'asyncTypeahead' ? { ...acc, [name]: useRef() } : acc), {});

  const onSubmit = async (values, { resetForm }) => {
    setShowAlert(false);
    const res = await submitFn(values);
    if (!res.success) {
      setAlertMessage(res.message);
      setShowAlert(true);
    } else {
      resetForm();
      Object.values(typeaheadRefs).forEach((taRef) => { taRef.current.clear(); });
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
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
            {chunks(formControls, 4).map((controls, i) => (
              <Stack key={`${controls[0].name}`} as={Row} direction={direction} gap={3} className={i > 0 && 'mt-3'} style={{ alignItems: 'stretch' }}>
                {controls.map(({
                  label, name, type, placeholder, ...rest
                }) => (
                  <Form.Group key={`group-${name}`} as={Col} controlId={name}>
                    <Form.Label key={`label-${name}`} className="mx-1">{label}</Form.Label>
                    {(() => {
                      switch (type) {
                        case 'asyncTypeahead': {
                          const { multiple, labelKey, fetchFn } = rest;
                          return (
                            <AsyncSelect
                              name={name}
                              label={label}
                              placeholder={placeholder}
                              initialValue={initialValues[name]}
                              labelKey={labelKey}
                              multiple={multiple}
                              fetchFn={fetchFn(10, token)}
                              refProp={typeaheadRefs[name]}
                            />
                          );
                        }
                        case 'select': {
                          const { options } = rest;
                          return (
                            <>
                              <Form.Select
                                key={`control-${name}`}
                                type={type}
                                name={name}
                                placeholder={placeholder}
                                value={values[name]}
                                onChange={handleChange}
                                isInvalid={touched[name] && !!errors[name]}
                              >
                                <option>{placeholder}</option>
                                {options.map(({ text, value }) => (
                                  <option key={`control-${name}-option-${value}`} value={value}>{text}</option>
                                ))}
                              </Form.Select>

                              <Form.Control.Feedback
                                key={`fb-${name}`}
                                type="invalid"
                              >
                                {errors[name]}
                              </Form.Control.Feedback>
                            </>
                          );
                        }
                        default: {
                          return (
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
                              <Form.Control.Feedback
                                key={`fb-${name}`}
                                type="invalid"
                              >
                                {errors[name]}
                              </Form.Control.Feedback>
                            </>
                          );
                        }
                      }
                    })()}
                  </Form.Group>
                ))}
              </Stack>
            ))}
          </Row>

          {showAlert && <Alert variant="danger" className="mt-3" onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}

          {/* <Row className="float-end" xs="auto"> */}
          {buttons}
          {/* </Row> */}
        </Form>
      )}
    </Formik>
  );
}

RecordForm.defaultProps = {
  direction: 'vertical',
};
