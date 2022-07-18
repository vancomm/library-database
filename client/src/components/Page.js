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
}) {
  const [records, setRecords] = useState([]);

  const [limit, setLimit] = useState(100);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const fetchRecords = async () => {
    const {
      records: _records,
      count,
    } = await service.get({ limit, offset });
    setRecords(_records);
    setTotal(count);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
              service={service}
              submitFn={async (record) => {
                await service.postOne(record);
                await fetchRecords();
              }}
              buttons={<Button type="submit" variant="success">Submit</Button>}
            />
          </CollapsibleButton>
        </Row>

        <PaginatedTable
          name={model.name}
          headers={model.formControls.map(({ label }) => label)}
          records={model.recordsToTable(records)}
          onEdit={(id) => (e) => {
            e.target.blur();
            const edited = records.find((r) => r.id === id);
            setModalData(edited);
            setShowModal(true);
          }}
          onDelete={(id) => async () => {
            await service.deleteOne(id);
            await fetchRecords();
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
        title={model.recordToTitle(modalData)}
        show={showModal}
        handleClose={handleCloseModal}
      >
        <RecordForm
          schema={model.schema}
          initialValues={modalData}
          formControls={model.formControls}
          submitFn={async (record) => {
            await service.updateOne(record);
            await fetchRecords();
            handleCloseModal();
          }}
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
