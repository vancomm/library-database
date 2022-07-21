import { NavLink } from 'react-router-dom/';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
              <NavLink className="nav-link" to="/books">
                Books
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/copies">
                Copies
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/borrows">
                Borrows
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/patrons">
                Patrons
              </NavLink>
            </Nav.Item>
            <NavLink className="nav-link" to="/authors">
              Authors
            </NavLink>
            <NavLink className="nav-link" to="/publishers">
              Publishers
            </NavLink>
            <NavLink className="nav-link" to="/categories">
              Categories
            </NavLink>
            <NavLink className="nav-link" to="/tags">
              Tags
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
