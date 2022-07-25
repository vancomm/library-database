import Alert from 'react-bootstrap/Alert';
import '../assets/unauthorized.css';

export default function UnauthorizedPage() {
  return (
    <div className="ua-container">
      <Alert variant="danger" className="ua-alert">
        <Alert.Heading>Unauthorized</Alert.Heading>
        <hr />
        Your account has insufficient rights to view this page.
      </Alert>
    </div>
  );
}
