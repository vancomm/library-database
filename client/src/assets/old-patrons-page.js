import {
  useState, useEffect,
} from 'react';
import * as yup from 'yup';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import RecordForm from '../components/RecordForm';
import ModalWindow from '../components/ModalWindow.js';
import PaginatedTable from '../components/PaginatedTable';
import CollapsibleButton from '../components/CollapsibleButton';
import Patron from '../services/Patron.service.js';

function PatronForm({
  initialValues, fetchPatrons, buttons, direction,
}) {
  return (
    <RecordForm
      schema={yup.object().shape({
        firstName: yup.string().required('Enter a first name'),
        lastName: yup.string().required('Enter a last name'),
        phone: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Enter a valid phone number'), // TODO: check against phone regex
        email: yup.string().email('Enter a valid email'),
      })}
      initialValues={initialValues}
      formControls={[
        {
          label: 'First name',
          name: 'firstName',
          type: 'text',
        },
        {
          label: 'Last name',
          name: 'lastName',
          type: 'text',
        },
        {
          label: 'Phone',
          name: 'phone',
          type: 'tel',
        },
        {
          label: 'Email',
          name: 'email',
          type: 'email',
        },
      ]}
      submitFn={async (patron) => {
        await Patron.postOne(patron);
        await fetchPatrons();
      }}
      buttons={buttons}
      direction={direction}
    />
  );
}

PatronForm.defaultProps = {
  initialValues: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  },
};

export default function Patrons() {
  const [patrons, setPatrons] = useState([]);

  const [limit, setLimit] = useState(100);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const fetchPatrons = async () => {
    const {
      records: _patrons,
      count: _total,
    } = await Patron.getPage(limit, offset);
    setPatrons(_patrons);
    setTotal(_total);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchPatrons();
  }, [limit, offset, total]);

  return (
    <>
      <Container>

        <h1>Patrons</h1>

        <Row className="mb-3">
          <CollapsibleButton btnText="New">
            <PatronForm
              fetchPatrons={fetchPatrons}
              direction="horizontal"
              buttons={<Button type="submit" variant="success">Submit</Button>}
            />
          </CollapsibleButton>
        </Row>

        <PaginatedTable
          headers={['First name', 'Last name', 'Phone', 'Email']}
          records={patrons.map(({
            id, firstName, lastName, phone, email,
          }) => ({
            id,
            data: [firstName, lastName, phone, email],
          }))}
          onEdit={(id) => (e) => {
            e.target.blur();
            const edited = patrons.find((p) => p.id === id);
            setModalData(edited);
            setShowModal(true);
          }}
          onDelete={(id) => async () => {
            await Patron.deleteOne(id);
            await fetchPatrons();
          }}
          onLimitSubmit={(input) => (e) => {
            e.preventDefault();
            if (Math.ceil(offset / limit + 1) > Math.ceil(total / input)) {
              setOffset(input * (Math.ceil(total / input - 1)));
            }
            setLimit(input);
          }}
          onPageClick={(pageNum) => async () => {
            setOffset(limit * (pageNum - 1));
          }}
          limit={limit}
          offset={offset}
          total={total}
        />

      </Container>

      <ModalWindow
        title={`${modalData.firstName} ${modalData.lastName}`}
        show={showModal}
        handleClose={handleCloseModal}
      >
        <PatronForm
          fetchPatrons={fetchPatrons}
          initialValues={modalData}
          buttons={(
            <div className="float-end">
              <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
              {' '}
              <Button type="submit" variant="primary">Update</Button>
            </div>
          )}
        />
      </ModalWindow>

    </>
  );
}

// this worked and im afraid to delete it yet
/* <Row>
          <PaginationBar
            active={Math.ceil(offset / limit) + 1}
            total={Math.ceil(total / limit)}
            limit={limit}
            onSubmit={onLimitSubmit}
            onClick={onPageClick}
          />
        </Row>
        <Row className="mx-0">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patrons.length > 0
                ? patrons.map(({
                  id, firstName, lastName, phone, email,
                }, i) => (
                  <tr key={id}>
                    <td>{offset + i + 1}</td>
                    <td>{id}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{phone}</td>
                    <td>{email}</td>
                    <td>
                      <ActionButtons onEdit={onEdit(id)} onDelete={onDelete(id)} />
                    </td>
                  </tr>
                ))
                : <tr><td colSpan="7">No records</td></tr>}
            </tbody>
          </Table>
        </Row>
        <Row>
          <PaginationBar
            active={Math.ceil(offset / limit) + 1}
            total={Math.ceil(total / limit)}
            limit={limit}
            onSubmit={onLimitSubmit}
            onClick={onPageClick}
          />
        </Row> */
