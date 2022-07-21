import Container from 'react-bootstrap/Container';
import Clock from '../components/Clock';

export default function HomePage() {
  return (
    <Container>
      <h1>Home</h1>
      <div className="mt-5">
        <Clock />
      </div>
    </Container>
  );
}
