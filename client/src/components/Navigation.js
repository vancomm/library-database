import { useState } from 'react';
import { NavLink } from 'react-router-dom/';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthStatus from './AuthStatus';

export default function Navigation() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expand="lg" expanded={expanded}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Library Database</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => { setExpanded(!expanded); }} />
        <Navbar.Collapse className="me-auto">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ width: '100%' }}
          >
            <Nav.Item onClick={() => { setExpanded(false); }}>
              <NavLink className="nav-link" to="/books">
                Books
              </NavLink>
            </Nav.Item>
            <Nav.Item onClick={() => { setExpanded(false); }}>
              <NavLink className="nav-link" to="/copies">
                Copies
              </NavLink>
            </Nav.Item>
            <Nav.Item onClick={() => { setExpanded(false); }}>
              <NavLink className="nav-link" to="/borrows">
                Borrows
              </NavLink>
            </Nav.Item>
            <Nav.Item onClick={() => { setExpanded(false); }}>
              <NavLink className="nav-link" to="/patrons">
                Patrons
              </NavLink>
            </Nav.Item>
            <Nav.Item onClick={() => { setExpanded(false); }}>
              <NavLink className="nav-link" to="/authors">
                Authors
              </NavLink>
            </Nav.Item>
            <Nav.Item onClick={() => { setExpanded(false); }}>
              <NavLink className="nav-link" to="/publishers">
                Publishers
              </NavLink>
            </Nav.Item>
            <Nav.Item onClick={() => { setExpanded(false); }}>
              <NavLink className="nav-link" to="/categories">
                Categories
              </NavLink>
            </Nav.Item>
            <Nav.Item onClick={() => { setExpanded(false); }}>
              <NavLink className="nav-link" to="/tags">
                Tags
              </NavLink>
            </Nav.Item>
            <Nav.Item onClick={() => { setExpanded(false); }}>
              <NavLink className="nav-link" to="/users">
                Users
              </NavLink>
            </Nav.Item>
          </Nav>
          <AuthStatus cb={() => { setExpanded(false); }} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
