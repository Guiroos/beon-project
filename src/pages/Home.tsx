import React, { useEffect, useState } from "react";
import BooksTable from "../components/BooksTable";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import { IBook } from "../interface/IBook";

const Home: React.FC = () => {
  const [books, setBooks] = useState<IBook[] | []>([]);
  const [filteredBooks, setFilteredBooks] = useState<IBook[] | []>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const asyncFunc = async () => {
      try {
        const data = await fetch("http://localhost:3001/books").then((res) => res.json());
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    asyncFunc();
  }, []);

  const renderPage = () => {
    if (loading) {
      return <h1>Loading...</h1>;
    }
    if (error) {
      return <h1>Error</h1>;
    }
    return (
      <>
        <SearchBar
          books={books}
          filteredBooks={filteredBooks}
          setFilteredBooks={setFilteredBooks}
          search={search}
          setSearch={setSearch}
        />
        <Filter
          filteredBooks={filteredBooks}
          setFilteredBooks={setFilteredBooks}
        />

        <p id="search-results">{`${filteredBooks.length} livro(s) encontrado(s)`}</p>

        <BooksTable books={filteredBooks} />
      </>
    );
  };

  return <div id="home-page" className="App">{renderPage()}</div>;
};

export default Home;
