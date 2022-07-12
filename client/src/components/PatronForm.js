import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col, Button } from 'react-bootstrap';

export default function PatronForm() {
  const [validated, setValidated] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    const form = e.currentTarget;

    e.preventDefault();
    e.stopPropagation();

    setValidated(true);

    if (!form.checkValidity()) return;

    console.log({ firstName, lastName });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Form.Group as={Col} md="4">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            onChange={(e) => { setFirstName(e.target.value); }}
            value={firstName}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" className="mb-3">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            onChange={(e) => { setLastName(e.target.value); }}
            value={lastName}
          />
        </Form.Group>
      </Row>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
