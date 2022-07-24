import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../assets/auth-status.css';

export default function AuthStatus({ cb }) {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const content = user
    ? (
      <div>
        Signed in as
        {' '}
        <Link className="auth-status-link" to="/dashboard">{user.name}</Link>
      </div>
    )
    : <div>You are not logged in.</div>;

  const variant = user ? 'primary' : 'link';

  const handleClick = user
    ? (e) => {
      cb();
      signout();
      navigate('/');
    }
    : (e) => {
      cb();
      e.target.blur();
      navigate('/auth');
    };

  const buttonText = user ? 'Sign out' : 'Log in';

  return (
    <Navbar.Text
      className="auth-status d-flex align-items-center flex-shrink-0"
    >
      {content}
      <Button
        className="ms-3"
        variant={variant}
        onClick={handleClick}
      >
        {buttonText}
      </Button>
    </Navbar.Text>
  );
}
