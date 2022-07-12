import { NavLink } from 'react-router-dom/';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

export default function Navigation() {
  return (
    <Navbar expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Library Database</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Item>
              <NavLink className="nav-link" to="/first">First</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/second">Second</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/patrons">Patrons</NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
