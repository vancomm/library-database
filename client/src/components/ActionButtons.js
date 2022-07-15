import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function ActionButtons({ onEdit, onDelete }) {
  return (
    <ButtonGroup size="sm" className="row-actions">
      <Button size="sm" variant="outline-secondary" onClick={onEdit}>✏️</Button>
      <Button size="sm" variant="outline-danger" onClick={onDelete}>🗑️</Button>
    </ButtonGroup>
  );
}
