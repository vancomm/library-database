import Container from 'react-bootstrap/Container';
import Clock from '../components/Clock';
import Calculator from '../components/Calculator';

export default function HomePage() {
  return (
    <Container>
      <h1>Home</h1>
      <div style={{
        margin: '3rem 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '40px',
      }}
      >
        <Calculator />
        <Clock />
      </div>
    </Container>
  );
}
