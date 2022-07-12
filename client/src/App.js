import { useEffect, useState } from "react";

function App() {
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
    <>
      <h1>Hello world!</h1>

      <ul>{
        books.map((book, i) => <li key={i}>{book.title}</li>)}
      </ul>
    </>
  );
}

export default App;
