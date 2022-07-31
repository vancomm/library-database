// import RecordPage from '../components/RecordPage';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useAuth } from '../contexts/AuthContext';
import { ModelProvider, useModel } from '../contexts/ModelContext';
import { ServiceProvider, useService } from '../contexts/ServiceContext';
import RecordForm from '../components/RecordForm';
import ModalWindow from '../components/ModalWindow';
import PaginationBar from '../components/PaginationBar';
import CollapsibleButton from '../components/CollapsibleButton';
import BorrowModel from '../models/Borrow.model';
import BorrowService from '../services/Borrow.service';
import '../assets/table.css';
import dateToString from '../utils/date-to-string';

function ActionButtons({ onEdit, onDelete, onReturn }) {
  return (
    <ButtonGroup size="sm" className="row-actions">
      <Button size="sm" variant="outline-secondary" onClick={onEdit}>✏️</Button>
      <Button size="sm" variant="outline-primary" onClick={onReturn}>↩️</Button>
      <Button size="sm" variant="outline-danger" onClick={onDelete}>🗑️</Button>
    </ButtonGroup>
  );
}

function RecordTable({
  name, headers, rows,
  onEdit, onDelete, onReturn,
  onLimitSubmit, onPageClick,
  limit, offset, total,
}) {
  const content = rows.length > 0
    ? rows.map(([id, ...cols], i) => (
      <tr key={`${name}-${id}`}>
        <td>{offset + i + 1}</td>
        <td>{id}</td>
        {cols.map((d, j) => (
          <td key={`${name}-${id}-${headers[j]}`}>{d}</td>
        ))}
        <td>
          <ActionButtons
            onEdit={onEdit(id)}
            onDelete={onDelete(id)}
            onReturn={onReturn(id)}
          />
        </td>
      </tr>
    ))
    : <tr><td colSpan={headers.length + 3}>No records</td></tr>;

  return (
    <Container>
      <Row>
        <PaginationBar
          active={Math.ceil(offset / limit) + 1}
          total={Math.ceil(total / limit)}
          limit={limit}
          onSubmit={onLimitSubmit}
          onClick={onPageClick}
        />
      </Row>
      <Row>
        <Table>
          <thead>
            <tr>
              {['#', 'Id', ...headers, 'Actions'].map((header) => (
                <th key={`${name}-${header}`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content}
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
      </Row>
    </Container>
  );
}

function RecordPage() {
  const { token } = useAuth();
  const model = useModel();
  const service = useService();

  const [records, setRecords] = useState([]);

  const [limit, setLimit] = useState(100);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateModalData, setUpdateModalData] = useState({});

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState(null);

  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnId, setReturnId] = useState(-1);

  const setPage = (pageNum) => async () => {
    setOffset(limit * (pageNum - 1));
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const fetchRecords = async () => {
    const res = await service.get({ limit, offset }, token);
    if (res.status === 200) {
      const payload = await res.json();
      // console.log(payload);
      setRecords(payload.records);
      setTotal(payload.total);
    } else {
      const { message } = await res.json();
      setErrorModalText(message);
      setShowErrorModal(true);
    }
  };

  const postWrapper = async (prev) => {
    console.log(prev);
    if (!prev.success) return prev;
    const res = await service.postOne(prev.record, token);
    if (res.status === 201) {
      await fetchRecords();
      return { success: true };
    }
    const { message } = await res.json();
    return { success: false, message };
  };

  const updateWrapper = async (prev) => {
    console.log(prev);
    if (!prev.success) return prev;
    const { id, ...data } = prev.record;
    const res = await service.updateById(id, data, token);
    console.log(res);
    if (res.status === 200) {
      await fetchRecords();
      handleCloseUpdateModal();
      return { success: true };
    }
    const { message } = await res.json();
    return { success: false, message };
  };

  const handleInsert = async (values) => model.beforeInsert(values, { token }).then(postWrapper);

  const handleUpdate = (id) => async (values) => model.beforeUpdate({ id, ...values }, { token })
    .then(updateWrapper);

  const handleEdit = (id) => (e) => {
    e.target.blur();
    const edited = records.find((r) => r.id === id);
    setUpdateModalData(edited);
    setShowUpdateModal(true);
  };

  const handleDelete = (id) => async (e) => {
    e.target.blur();
    const res = await service.deleteById(id, token);
    if (res.status === 200) {
      await fetchRecords();
    } else {
      const { message } = await res.json();
      setErrorModalText(message);
      setShowErrorModal(true);
    }
  };

  const handleReturn = (id) => async (e) => {
    e.target.blur();
    setReturnId(id);
    setShowReturnModal(true);
  };

  const handleLimitSubmit = (input) => (e) => {
    e.preventDefault();
    if (Math.ceil(offset / limit + 1) > Math.ceil(total / input)) {
      setOffset(input * (Math.ceil(total / input - 1)));
    }
    setLimit(input);
  };

  useEffect(() => {
    fetchRecords();
  }, [limit, offset, total]);

  return (
    <>
      <Container>

        <h1>{model.name}</h1>

        <Row className="mb-3">
          <CollapsibleButton btnText="New">
            <RecordForm
              direction="horizontal"
              initialValues={model.defaultValues}
              submitFn={handleInsert}
              buttons={(
                <div className="float-end">
                  <Button type="submit" variant="success">Submit</Button>
                </div>
              )}
            />
          </CollapsibleButton>
        </Row>

        <RecordTable
          name={model.name}
          headers={model.tableHeaders}
          rows={records.map(model.toRow)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReturn={handleReturn}
          onLimitSubmit={handleLimitSubmit}
          onPageClick={setPage}
          limit={limit}
          offset={offset}
          total={total}
        />

      </Container>

      <ModalWindow
        title={model.toLine(updateModalData)}
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
      >
        <RecordForm
          initialValues={{ ...model.defaultValues, ...updateModalData }}
          submitFn={handleUpdate(updateModalData.id)}
          buttons={(
            <div className="float-end">
              <Button variant="secondary" onClick={handleCloseUpdateModal}>Cancel</Button>
              {' '}
              <Button type="submit" variant="primary">Update</Button>
            </div>
          )}
        />
      </ModalWindow>

      <ModalWindow
        title="Error"
        show={showErrorModal}
        handleClose={() => setShowErrorModal(false)}
      >
        <span>{errorModalText}</span>
      </ModalWindow>

      <ModalWindow
        title="Return"
        show={showReturnModal}
        handleClose={() => setShowReturnModal(false)}
      >
        <Formik
          initialValues={{
            returnDate: dateToString(new Date()),
          }}
          validationSchema={yup.object().shape({
            returnDate: yup.date().required('Enter return date'),
          })}
          onSubmit={async (values) => {
            const res = await service.updateById(returnId, values, token);
            console.log(res);
            setShowReturnModal(false);
            setReturnId(null);
            await fetchRecords();
          }}
        >
          {({
            values, errors, touched, handleSubmit, handleChange,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Label>Return date</Form.Label>
              <Form.Control
                type="date"
                name="returnDate"
                value={values.returnDate}
                onChange={handleChange}
                isInvalid={touched.returnDate && !!errors.returnDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.returnDate}
              </Form.Control.Feedback>
              <Button type="submit" className="mt-3">Submit</Button>
            </Form>
          )}
        </Formik>
      </ModalWindow>

    </>
  );
}

export default function BorrowPage() {
  return (
    <ModelProvider model={BorrowModel}>
      <ServiceProvider service={BorrowService}>
        <RecordPage />
      </ServiceProvider>
    </ModelProvider>
  );
}
