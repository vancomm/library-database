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
import { useModel } from '../contexts/ModelContext';
import { useService } from '../contexts/ServiceContext';

export default function Page() {
  const { model } = useModel();
  const { service } = useService();

  const [records, setRecords] = useState([]);

  const [limit, setLimit] = useState(100);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateModalData, setUpdateModalData] = useState({});

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorText, setErrorText] = useState('');

  const setPage = (pageNum) => async () => {
    setOffset(limit * (pageNum - 1));
  };

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
    setUpdateModalData(edited);
    setShowUpdateModal(true);
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

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleUpdate = async (record) => {
    const { id, ...data } = record;
    const res = await service.updateById(id, data);
    if (res.status === 200) {
      await fetchRecords();
      handleCloseUpdateModal();
    } else {
      const { message } = await res.json();
      setErrorText(message);
      handleCloseUpdateModal();
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
              initialValues={model.defaultValues}
              submitFn={handleInsert}
              buttons={<Button type="submit" variant="success">Submit</Button>}
            />
          </CollapsibleButton>
        </Row>

        <PaginatedTable
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
        title={model.recordToTitle(updateModalData)}
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
      >
        <RecordForm
          initialValues={updateModalData}
          submitFn={handleUpdate}
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
        <span>{errorText}</span>
      </ModalWindow>

    </>
  );
}
