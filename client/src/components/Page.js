import {
  useState, useEffect,
} from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CollapsibleButton from './CollapsibleButton';
import ModalWindow from './ModalWindow';
import PaginatedTable from './PaginatedTable';
import RecordForm from './RecordForm';

export default function Page({
  service,
  model,
}) {
  const [records, setRecords] = useState([]);

  const [limit, setLimit] = useState(100);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorText, setErrorText] = useState('');

  const fetchRecords = async () => {
    const res = await service.get({ limit, offset });
    if (res.status === 200) {
      const payload = await res.json();
      // console.log(payload);
      setRecords(payload.records);
      setTotal(payload.total);
    } else {
      const { message } = await res.json();
      setErrorText(message);
      setShowErrorModal(true);
    }
  };

  const handleInsert = async (record) => {
    const res = await service.postOne(record);
    if (res.status === 200) {
      await fetchRecords();
    } else {
      const { message } = await res.json();
      setErrorText(message);
      setShowErrorModal(true);
    }
  };

  const handleEdit = (id) => (e) => {
    e.target.blur();
    const edited = records.find((r) => r.id === id);
    setModalData(edited);
    setShowModal(true);
  };

  const handleDelete = (id) => async (e) => {
    e.target.blur();
    const res = await service.deleteById(id);
    if (res.status === 200) {
      await fetchRecords();
    } else {
      const { message } = await res.json();
      setErrorText(message);
      setShowErrorModal(true);
    }
  };

  const handleLimitSubmit = (input) => (e) => {
    e.preventDefault();
    if (Math.ceil(offset / limit + 1) > Math.ceil(total / input)) {
      setOffset(input * (Math.ceil(total / input - 1)));
    }
    setLimit(input);
  };

  const setPage = (pageNum) => async () => {
    setOffset(limit * (pageNum - 1));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdate = async (record) => {
    const { id, ...data } = record;
    const res = await service.updateById(id, data);
    if (res.status === 200) {
      await fetchRecords();
      handleCloseModal();
    } else {
      const { message } = await res.json();
      setErrorText(message);
      handleCloseModal();
      setShowErrorModal(true);
    }
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
              model={model}
              initialValues={model.defaultValues}
              submitFn={handleInsert}
              buttons={<Button type="submit" variant="success">Submit</Button>}
            />
          </CollapsibleButton>
        </Row>

        <PaginatedTable
          model={model}
          name={model.name}
          headers={model.headers}
          records={records}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onLimitSubmit={handleLimitSubmit}
          onPageClick={setPage}
          limit={limit}
          offset={offset}
          total={total}
        />

      </Container>

      <ModalWindow
        title={model.recordToTitle(modalData)}
        show={showModal}
        handleClose={handleCloseModal}
      >
        <RecordForm
          model={model}
          service={service}
          initialValues={modalData}
          submitFn={handleUpdate}
          buttons={(
            <div className="float-end">
              <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
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
        <span>{errorText}</span>
      </ModalWindow>

    </>
  );
}
