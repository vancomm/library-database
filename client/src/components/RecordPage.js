import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CollapsibleButton from './CollapsibleButton';
import ModalWindow from './ModalWindow';
import RecordTable from './RecordTable';
import RecordForm from './RecordForm';
import { useAuth } from '../contexts/AuthContext';
import { useModel } from '../contexts/ModelContext';
import { useService } from '../contexts/ServiceContext';

export default function RecordPage() {
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
  const [errorModalText, setErrorModalText] = useState('');

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
    if (!prev.success) return prev;
    const { id, ...data } = prev.record;
    const res = await service.updateById(id, data, token);
    if (res.status === 200) {
      await fetchRecords();
      handleCloseUpdateModal();
      return { success: true };
    }
    const { message } = await res.json();
    return { success: false, message };
  };

  const handleInsert = async (values) => model.beforeInsert(values, { token }).then(postWrapper);

  const handleUpdate = async (values) => model.beforeUpdate(values, { token }).then(updateWrapper);

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
        <span>{errorModalText}</span>
      </ModalWindow>

    </>
  );
}
