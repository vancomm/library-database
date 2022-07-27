/* eslint-disable no-unreachable */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../contexts/AuthContext';
import { useAuthMode } from '../contexts/AuthModeContext';
import UserModel from '../models/User.model';
import '../assets/auth-page.css';
import AuthService from '../services/Auth.service';

function AuthModeSwitcher({ callback, children }) {
  const { resetForm } = useFormikContext();
  const { toggleAuthMode } = useAuthMode();

  return (
    <span
      className="link-primary"
      onClick={() => {
        callback();
        resetForm();
        toggleAuthMode();
      }}
    >
      {children}
    </span>
  );
}

const loginSchema = yup.object().shape({
  username: UserModel.shape.username
    .test('doesn\'t exist', 'Username doesn\'t exist', async (value) => AuthService.exists(value)
      .then((res) => {
        if (res.status !== 200) return { result: false };
        return res.json();
      }).then(({ result }) => result)),
  password: UserModel.shape.password,
});

const signupSchema = yup.object().shape({
  username: UserModel.shape.username
    .test('taken', 'Username is taken', async (value) => AuthService.exists(value)
      .then((res) => {
        if (res.status !== 200) return { result: false };
        return res.json();
      }).then(({ result }) => !result)),
  name: UserModel.shape.name,
  password: UserModel.shape.password,
});

const loginInitialValues = {
  username: UserModel.defaultValues.username,
  password: UserModel.defaultValues.password,
};

const signupInitialValues = {
  username: UserModel.defaultValues.username,
  name: UserModel.defaultValues.name,
  password: UserModel.defaultValues.password,
};

export default function AuthPage() {
  const { isLogin } = useAuthMode();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const { tryLogin, tryRegister } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const onLogin = async (values, { resetForm }) => {
    setShowAlert(false);
    const { username, password } = values;
    const res = await tryLogin({ username, password });
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

  const onSignup = async (values, { resetForm }) => {
    setShowAlert(false);
    const { username, name, password } = values;
    const role = 'user';
    const res = await tryRegister({
      username, name, role, password,
    });
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

  if (isLogin) {
    return (
      <Formik
        key="login-form"
        validationSchema={loginSchema}
        initialValues={loginInitialValues}
        onSubmit={onLogin}
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
                  <AuthModeSwitcher callback={() => { setShowAlert(false); }}>
                    Sign up
                  </AuthModeSwitcher>
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

                {showAlert && <Alert variant="danger" className="mt-3" onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}

                <div className="d-grid gap-2 mt-3">
                  <Button type="submit">Submit</Button>
                </div>

              </div>
            </Form>
          </div>
        )}
      </Formik>
    );
  }

  return (
    <Formik
      key="signup-form"
      validationSchema={signupSchema}
      initialValues={signupInitialValues}
      onSubmit={onSignup}
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
              <h3 className="auth-form-title">Sign Up</h3>

              <div className="text-center">
                Already registered?
                {' '}
                <AuthModeSwitcher callback={() => { setShowAlert(false); }}>
                  Sign in
                </AuthModeSwitcher>
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
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  className="mt-1"
                  placeholder="Enter name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
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

              {showAlert && <Alert variant="danger" className="mt-3" onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}

              <div className="d-grid gap-2 mt-3">
                <Button type="submit">Submit</Button>
              </div>

            </div>
          </Form>
        </div>
      )}
    </Formik>
  );

  // if (authMode === 'signin') {
  //   return (
  //     <Formik
  //       validationSchema={yup.object().shape({
  //         username: UserModel.shape.username,
  //         password: UserModel.shape.password,
  //       })}
  //       initialValues={{
  //         username: UserModel.defaultValues.username,
  //         password: UserModel.defaultValues.password,
  //       }}
  //       onSubmit={onSubmit}
  //     >
  //       {({
  //         values,
  //         errors,
  //         touched,
  //         handleChange,
  //         handleSubmit,
  //       }) => (
  //         <div className="auth-form-container">
  //           <Form
  //             noValidate
  //             className="auth-form"
  //             onSubmit={handleSubmit}
  //           >
  //             <div className="auth-form-content">
  //               <h3 className="auth-form-title">Sign in</h3>

  //               <div className="text-center">
  //                 Not registered yet?
  //                 {' '}
  //                 <span
  //                   className="link-primary"
  //                   onClick={() => {
  //                     // setAuthMode('signup');
  //                     // resetForm();
  //                   }}
  //                 >
  //                   Sign up
  //                 </span>
  //               </div>

  //               <Form.Group className="form-group mt-3">
  //                 <Form.Label>Username</Form.Label>
  //                 <Form.Control
  //                   type="text"
  //                   name="username"
  //                   className="mt-1"
  //                   placeholder="Enter username"
  //                   value={values.username}
  //                   onChange={handleChange}
  //                   isInvalid={touched.username && !!errors.username}
  //                 />
  //                 <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
  //               </Form.Group>

  //               <Form.Group className="form-group mt-3">
  //                 <Form.Label>Password</Form.Label>
  //                 <Form.Control
  //                   type="password"
  //                   name="password"
  //                   className="mt-1"
  //                   placeholder="Enter password"
  //                   value={values.password}
  //                   onChange={handleChange}
  //                   isInvalid={touched.password && !!errors.password}
  //                 />
  //                 <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
  //               </Form.Group>

  //               {showAlert && <Alert variant="danger" className="mt-3" onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}

  //               <div className="d-grid gap-2 mt-3">
  //                 <Button type="submit">Login</Button>
  //               </div>

  //             </div>
  //           </Form>
  //         </div>
  //       )}
  //     </Formik>
  //   );
  // }

  // return (
  //   <>
  //     <Formik
  //       validationSchema={UserModel.validationSchema}
  //       initialValues={UserModel.defaultValues}
  //       onSubmit={onSubmit}
  //     >
  //       {({
  //         values,
  //         errors,
  //         touched,
  //         handleChange,
  //         handleSubmit,
  //       }) => (
  //         <div className="auth-form-container">
  //           <Form
  //             noValidate
  //             className="auth-form"
  //             onSubmit={handleSubmit}
  //           >
  //             <div className="auth-form-content">
  //               <h3 className="auth-form-title">Sign Up</h3>

  //               <div className="text-center">
  //                 Already registered?
  //                 {' '}
  //                 <span
  //                   className="link-primary"
  //                   onClick={() => {
  //                     // const { resetForm } = useFormikContext();
  //                     // setAuthMode('signin');
  //                     // resetForm();
  //                   }}
  //                 >
  //                   Sign in

  //                 </span>
  //               </div>

  //               <Form.Group className="form-group mt-3">
  //                 <Form.Label>Username</Form.Label>
  //                 <Form.Control
  //                   type="text"
  //                   name="username"
  //                   className="mt-1"
  //                   placeholder="Enter username"
  //                   value={values.username}
  //                   onChange={handleChange}
  //                   isInvalid={touched.username && !!errors.username}
  //                 />
  //                 <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
  //               </Form.Group>

  //               <Form.Group className="form-group mt-3">
  //                 <Form.Label>Name</Form.Label>
  //                 <Form.Control
  //                   type="text"
  //                   name="name"
  //                   className="mt-1"
  //                   placeholder="Enter name"
  //                   value={values.name}
  //                   onChange={handleChange}
  //                   isInvalid={touched.name && !!errors.name}
  //                 />
  //                 <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
  //               </Form.Group>

  //               <Form.Group className="form-group mt-3">
  //                 <Form.Label>Password</Form.Label>
  //                 <Form.Control
  //                   type="password"
  //                   name="password"
  //                   className="mt-1"
  //                   placeholder="Enter password"
  //                   value={values.password}
  //                   onChange={handleChange}
  //                   isInvalid={touched.password && !!errors.password}
  //                 />
  //                 <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
  //               </Form.Group>

  //               {showAlert && <Alert variant="danger" className="mt-3" onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}

  //               <div className="d-grid gap-2 mt-3">
  //                 <Button type="submit">Sign up</Button>
  //               </div>

  //             </div>
  //           </Form>
  //         </div>
  //       )}
  //     </Formik>

  //     <ModalWindow
  //       title="Error"
  //       show={showAlert}
  //       handleClose={() => setShowAlert(false)}
  //     >
  //       {alertMessage}
  //     </ModalWindow>
  //   </>
  // );
}
