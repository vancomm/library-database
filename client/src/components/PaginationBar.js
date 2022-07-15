import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function getPagesNums(active, total) {
  if (total <= 9) return [...Array(9).keys()].map((i) => i + 1);
  return [-4, -3, -2, -1, 0, 1, 2, 3, 4]
    .map((v, i, arr) => {
      if (i === 0) return 1;
      if (i === arr.length - 1) return total;
      if (active < 5) return i + 1;
      if (active > total - 4) return total - 8 + i;
      return active + v;
    });
}

export default function PaginationBar({
  active, total, onClick, limit, onSubmit,
}) {
  const [inputLimit, setInputLimit] = useState(limit);
  const [valid, setValid] = useState(true);

  return (
    <Container>
      <Form
        onSubmit={onSubmit(inputLimit)}
      >
        <Row xs="auto">
          <Col className="px-0">
            <Pagination>
              <Pagination.First
                disabled={active === 1}
                onClick={onClick(1)}
              />
              <Pagination.Prev
                disabled={active === 1}
                onClick={onClick(active - 1)}
              />

              <Pagination.Item
                active={active === 1}
                onClick={onClick(1)}
              >
                {1}
              </Pagination.Item>

              {getPagesNums(active, total)
                .map((num, i, arr) => {
                  if (num <= 1 || num >= total) return null;
                  const text = (i === 1 && num !== 2) || (i === arr.length - 2 && num !== total - 1) ? '...' : num;
                  return (
                    <Pagination.Item
                      key={`${num}`}
                      active={active === num}
                      disabled={text === '...'}
                      onClick={onClick(num)}
                    >
                      {text}
                    </Pagination.Item>
                  );
                })}

              {total > 1
                ? (
                  <Pagination.Item
                    active={active === total}
                    onClick={onClick(total)}
                  >
                    {total}
                  </Pagination.Item>
                )
                : null}

              <Pagination.Next
                disabled={active === total}
                onClick={onClick(active + 1)}
              />
              <Pagination.Last
                disabled={active === total}
                onClick={onClick(total)}
              />
            </Pagination>
          </Col>
          <Col className="pt-2">Rows per page:</Col>
          <Col className="px-0" xs={2}>
            <Form.Control
              value={inputLimit}
              isInvalid={!valid}
              onChange={(e) => {
                const check = /^\d*$/.test(e.target.value) && parseInt(e.target.value, 10) >= 1;
                setValid(check);
                setInputLimit(e.target.value.replace(/^0(?=\d)/, ''));
              }}
            />
            <Form.Control.Feedback type="invalid">Must be a positive integer</Form.Control.Feedback>
          </Col>
          <Col>
            <Button type="submit" disabled={!valid}>Set</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
