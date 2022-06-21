import React, { useEffect, useState } from "react";
import "./App.css";
import BooksTable from "./components/BooksTable";
import { IBook } from "./interface/IBook";

const App: React.FC = () => {
  const [books, setBooks] = useState<IBook[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const asyncFunc = async () => {
      try {
        const data = await fetch("http://localhost:3001/books").then((res) => res.json());
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    asyncFunc();
  }, []);

  return (
    <div className="App">
      {loading ? <h1>Loading...</h1> : <BooksTable books={books} />}
      {error && <h1>Error</h1>}
    </div>
  );
};

export default App;
