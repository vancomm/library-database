import Container from 'react-bootstrap/Container';
import Clock from '../components/Clock';

export default function Home() {
  return (
    <Container>
      <h1>Home</h1>
      <div className="mt-5">
        <Clock />
      </div>
    </Container>
  );
}
