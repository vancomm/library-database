import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3001/books', { headers: { 'Content-Type': 'application/json' } });
      if (!res.ok) return;
      const data = await res.json();
      setBooks(data);
    }

    fetchData();
  }, []);

  return (
    <Container>
      <h1>Home</h1>
      <ul>
        {
          books.map((book) => <li key={book.bookid}>{book.title}</li>)
        }
      </ul>
    </Container>
  );
}
