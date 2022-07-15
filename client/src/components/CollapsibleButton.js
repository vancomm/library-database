import { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import cn from 'classnames';

export default function CollapsibleButton({ btnText, children, ...props }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Col>
        <Button
          variant={open ? 'outline-primary' : 'primary'}
          onClick={(e) => {
            e.target.blur();
            setOpen(!open);
          }}
          aria-expanded={open}
        >
          {btnText}
        </Button>
      </Col>
      <Collapse in={open}>
        <div className="mt-3">
          {children}
        </div>
      </Collapse>
    </>
  );
}

CollapsibleButton.propTypes = {
  btnText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
