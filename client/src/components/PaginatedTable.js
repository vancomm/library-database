import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import ActionButtons from './ActionButtons';
import PaginationBar from './PaginationBar';
import { useModel } from '../contexts/ModelContext';
import '../assets/table.css';

export default function PaginatedTable({
  records,
  onEdit, onDelete, onLimitSubmit, onPageClick,
  limit, offset, total,
}) {
  const { model } = useModel();

  const rows = records.length > 0
    ? model.recordsToTable(records).map(({ id, data }, i) => (
      <tr key={`${model.name}-${id}`}>
        <td>{offset + i + 1}</td>
        <td>{id}</td>
        {data.map((d, j) => (
          <td key={`${model.name}-${id}-${model.headers[j]}`}>{d}</td>
        ))}
        <td><ActionButtons onEdit={onEdit(id)} onDelete={onDelete(id)} /></td>
      </tr>
    ))
    : <tr><td colSpan={model.headers.length + 3}>No records</td></tr>;

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
              {['#', 'Id', ...model.headers, 'Actions'].map((header) => (
                <th key={`${model.name}-${header}`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows}
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
