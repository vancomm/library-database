import {
  useState, useEffect,
} from 'react';
import Row from 'react-bootstrap/Row';
// import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PatronForm from '../components/PatronForm';
import CollapsibleButton from '../components/CollapsibleButton';
import PaginatedTable from '../components/PaginatedTable';

export default function Page({
  name, Form, Table,
}) {
  return (
    <Container>

      <h1>{name}</h1>

      <Row className="mb-3">
        <CollapsibleButton btnText="New">
          {Form}
        </CollapsibleButton>
      </Row>

      {Table}

    </Container>
  );
}
