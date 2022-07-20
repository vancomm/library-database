import {
  useState, useEffect,
} from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CollapsibleButton from './CollapsibleButton';
import PaginatedTable from './PaginatedTable';
import ModalWindow from './ModalWindow';
import RecordForm from './RecordForm';

export default function Page({
  service,
  model,
  auxServices,
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
    const res = await service.getSimple({ limit, offset });
    setRecords(res.records);
    setTotal(res.total);
  };

  const onInsert = async (record) => {
    const res = await service.postOne(record);
    if (res.status === 200) {
      await fetchRecords();
    } else {
      const { message } = await res.json();
      setErrorText(message);
      setShowErrorModal(true);
    }
  };

  const onEdit = (id) => (e) => {
    e.target.blur();
    const edited = records.find((r) => r.id === id);
    setModalData(edited);
    setShowModal(true);
  };

  const onDelete = (id) => async () => {
    const res = await service.deleteById(id);
    if (res.status === 200) {
      await fetchRecords();
    } else {
      const { message } = await res.json();
      setErrorText(message);
      setShowErrorModal(true);
    }
  };

  const onLimitSubmit = (input) => (e) => {
    e.preventDefault();
    if (Math.ceil(offset / limit + 1) > Math.ceil(total / input)) {
      setOffset(input * (Math.ceil(total / input - 1)));
    }
    setLimit(input);
  };

  const onPageClick = (pageNum) => async () => {
    setOffset(limit * (pageNum - 1));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onUpdate = async (record) => {
    const { id, ...data } = record;
    const res = await service.updateById(id, data);
    // await service.updateOne(record);
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
              auxServices={auxServices}
              initialValues={model.defaultValues}
              submitFn={onInsert}
              buttons={<Button type="submit" variant="success">Submit</Button>}
            />
          </CollapsibleButton>
        </Row>

        <PaginatedTable
          name={model.name}
          headers={model.headers}
          records={model.recordsToTable(records)}
          onEdit={onEdit}
          onDelete={onDelete}
          onLimitSubmit={onLimitSubmit}
          onPageClick={onPageClick}
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
          submitFn={onUpdate}
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
