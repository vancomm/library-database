import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import ActionButtons from './ActionButtons';
import PaginationBar from './PaginationBar';
import '../assets/table.css';

export default function RecordTable({
  name, headers, rows,
  onEdit, onDelete, onLimitSubmit, onPageClick,
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
        <td><ActionButtons onEdit={onEdit(id)} onDelete={onDelete(id)} /></td>
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
