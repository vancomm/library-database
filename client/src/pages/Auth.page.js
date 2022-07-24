/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalWindow from '../components/ModalWindow';
import { useAuth } from '../contexts/AuthContext';
import '../assets/auth-page.css';

export default function AuthPage() {
  const [authMode, setAuthMode] = useState('signin');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const { tryLogin, tryRegister } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (values, { resetForm }) => {
    const { username, password } = values;
    const res = await tryLogin(username, password);
    if (!res.success) {
      console.log(res);
      resetForm({ values: { ...values, password: '' } });
      setAlertMessage(res.message);
      setShowAlert(true);
      return;
    }
    navigate(from, { replace: true });
    resetForm();
  };

  if (authMode === 'signin') {
    return (
      <Formik
        validationSchema={yup.object().shape({
          username: yup.string()
            .min(6, 'Username must be at least 6 characters long')
            .max(20, 'Username must not be longer than 20 characters')
            .matches(/^[A-Za-z0-9._]+$/, 'Must include only latin letters, numbers, periods or underscores')
            .matches(/^(?![_.])[A-Za-z0-9._]+(?<![_.])$/, 'Must not start or end with a period or an underscore')
            .required('Enter your username'),
          password: yup.string().min(6, 'Password must be at least 6 characters long').required('Enter your password'),
        })}
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
        }) => (
          <div className="auth-form-container">
            <Form
              noValidate
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <div className="auth-form-content">
                <h3 className="auth-form-title">Sign in</h3>
                <div className="text-center">
                  Not registered yet?
                  {' '}
                  <span className="link-primary" onClick={() => { setAuthMode('signup'); }}>Sign up</span>
                </div>
                <Form.Group className="form-group mt-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    className="mt-1"
                    placeholder="Enter username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && !!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    className="mt-1"
                    placeholder="Enter password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                {showAlert ? <Alert variant="danger" className="mt-3" onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert> : null}
                <div className="d-grid gap-2 mt-3">
                  <Button type="submit">Login</Button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    );
  }

  return (
    <>
      <Formik
        validationSchema={yup.object().shape({
          username: yup.string()
            .min(6, 'Username must be at least 6 characters long')
            .max(20, 'Username must not be longer than 20 characters')
            .matches(/^[A-Za-z0-9._]+$/, 'Must include only latin letters, numbers, periods or underscores')
            .matches(/^(?![_.])[A-Za-z0-9._]+(?<![_.])$/, 'Must not start or end with a period or an underscore')
            .required('Enter a username'),
          password: yup.string().min(6, 'Password must be at least 6 characters long'),
        })}
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
        }) => (
          <div className="auth-form-container">
            <p>Write a signup form!!</p>
            {/* <Form
              noValidate
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <div className="auth-form-content">
                <h3 className="auth-form-title">Sign in</h3>
                <div className="text-center">
                  Not registered yet?
                  {' '}
                  <span className="link-primary">Sign Up</span>
                </div>
                <Form.Group className="form-group mt-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    className="mt-1"
                    placeholder="Enter username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && !!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    className="mt-1"
                    placeholder="Enter password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <div className="d-grid gap-2 mt-3">
                  <Button type="submit">Login</Button>
                </div>
              </div>
            </Form> */}
          </div>
        )}
      </Formik>

      <ModalWindow
        title="Error"
        show={showAlert}
        handleClose={() => setShowAlert(false)}
      >
        {alertMessage}
      </ModalWindow>
    </>
  );
}
