import { useRef } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import RecordForm from '../components/RecordForm';
import AsyncSelect from '../components/AsyncSelect';
import CollapsibleButton from '../components/CollapsibleButton';
import { useAuth } from '../contexts/AuthContext';
import { ModelProvider, useModel } from '../contexts/ModelContext';
import PatronModel from '../models/Patron.model';
import UserService from '../services/User.service';
import PatronService from '../services/Patron.service';
import wildcard from '../utils/wildcard';
import '../assets/dashboard.css';

function UserForm({ user, fetchFn, onSubmit }) {
  const ref = useRef();

  return (
    <Formik
      validationSchema={yup.object().shape({
        patron: yup.array().of(yup.object()).length(1, 'Select a patron'),
      })}
      initialValues={{ patron: user.patron }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Label>Patron</Form.Label>
          <AsyncSelect
            name="patron"
            label="Patron"
            placeholder="Select patron..."
            labelKey={PatronModel.toLine}
            initialValue={user.patron}
            fetchFn={fetchFn}
            refProp={ref}
          />
          <Button className="mt-3" type="submit">Set patron</Button>
        </Form>
      )}
    </Formik>
  );
}

export default function Dashboard() {
  const { user, token, update } = useAuth();

  return (
    <Container className="dashboard-container">
      <h1 className="mb-3">Dashboard</h1>
      <div className="user-details mb-5">
        <span className="user-name">{user.name}</span>
        <br />
        <span className="user-role">{user.role}</span>
      </div>
      {user.role === 'user' && (
        <>
          <div className="user-form-container">
            <UserForm
              user={user}
              fetchFn={(query) => PatronService.findString(
                wildcard(query, true, true),
                'firstName || \' \' || lastName',
                token,
                10,
              )}
              onSubmit={async (values) => {
                const res = await UserService.updateById(
                  user.id,
                  { patronId: values.patron[0].id },
                  token,
                );
                await update();
                console.log(res);
              }}
            />

          </div>
          <div className="mt-3">
            <CollapsibleButton btnText="New patron">
              <ModelProvider model={PatronModel}>
                <RecordForm
                  direction="horizontal"
                  initialValues={PatronModel.defaultValues}
                  submitFn={async (patron) => {
                    const res = await PatronService.postOne(patron, token);
                    if (res.status === 201) {
                      const { id } = await res.json();
                      console.log(id);
                      await UserService.updateById(
                        user.id,
                        { patronId: id },
                        token,
                      );
                      await update();
                      window.location.reload();
                    }
                  }}
                  buttons={(
                    <div className="float-end">
                      <Button type="submit" variant="success">Submit</Button>
                    </div>
                  )}
                />
              </ModelProvider>
            </CollapsibleButton>
          </div>
        </>
      )}
    </Container>
  );
}
