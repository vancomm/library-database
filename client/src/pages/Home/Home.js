import Container from 'react-bootstrap/Container';
import Clock from '../../components/Clock';
import Calculator from '../../components/Calculator';
import styles from './Home.module.css';

export default function Home() {
  return (
    <Container>
      <h1>Home</h1>
      <div style={{
        margin: '3rem 0',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '40px',
      }}
      >
        <p className={styles.banner}>Welcome to NN City Public Library</p>
        {/* <Calculator /> */}
        <Clock />
      </div>
    </Container>
  );
}
