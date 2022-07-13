import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import PatronForm from '../components/PatronForm';
import { patronsRoute } from '../lib/routes';

export default function Patrons() {
  const [patrons, setPatrons] = useState([]);

  const fetchPatrons = async () => {
    const res = await fetch(patronsRoute);
    const data = await res.json();
    console.log(data);
    setPatrons(data);
  };

  const postPatron = async (data) => fetch(
    patronsRoute,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  ).then((res) => {
    fetchPatrons();
    return res;
  });

  useEffect(() => {
    fetchPatrons();
  }, []);

  return (
    <Container>
      <PatronForm postFn={postPatron} />
      <ul>
        {patrons.map((patron) => (
          <li key={patron.patronId}>
            {patron.firstName}
            {' '}
            {patron.lastName}
          </li>
        ))}
      </ul>
    </Container>
  );
}
