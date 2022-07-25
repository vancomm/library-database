import { useState } from 'react';
import { NavLink } from 'react-router-dom/';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import navLinks from '../data/nav-items';
import AuthStatus from './AuthStatus';
import { useAuth } from '../contexts/AuthContext';
import useOutsideClick from '../hooks/useOutsideClick';

export default function Navigation() {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => { setExpanded(!expanded); };
  const collapseNavbar = () => { setExpanded(false); };

  const ref = useOutsideClick(collapseNavbar);

  const navItems = (() => {
    if (!user?.role) return null;
    return navLinks
      .filter(({ roles }) => roles.includes(user.role))
      .map(({ label, to }) => (
        <Nav.Item key={`nav-item-${to}`} onClick={collapseNavbar}>
          <NavLink key={`nav-link-${to}`} className="nav-link" to={to}>
            {label}
          </NavLink>
        </Nav.Item>
      ));
  })();

  return (
    <Navbar expand="lg" expanded={expanded} ref={ref}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand onClick={collapseNavbar}>Library Database</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
        <Navbar.Collapse className="me-auto">
          <Nav className="me-auto my-2 my-lg-0">
            {navItems}
          </Nav>
          <AuthStatus cb={() => { setExpanded(false); }} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
