import React, { Dispatch, SetStateAction } from "react";
import { IBook } from "../interface/IBook";

interface FilterProps {
  books: IBook[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filteredBooks: IBook[];
  setFilteredBooks: Dispatch<SetStateAction<IBook[]>>;
}

const SearchBar: React.FC<FilterProps> = ({
  books,
  search,
  setSearch,
  filteredBooks,
  setFilteredBooks,
}: FilterProps) => {
  const excludeKeys = ["year"];

  const filterData = (value: string) => {
    const lowerCaseValue = value.toLowerCase().trim();
    if (!lowerCaseValue) {
      setFilteredBooks(books);
    } if (!filteredBooks) {
      const newBook = books.filter((book) => Object.keys(book)
        .some((key) => (excludeKeys.includes(key)
          ? false
          : book[key].toString().toLowerCase().includes(lowerCaseValue))));
      setFilteredBooks(newBook);
    } if (filteredBooks) {
      const newBook = filteredBooks.filter((book) => Object.keys(book)
        .some((key) => (excludeKeys.includes(key)
          ? false
          : book[key].toString().toLowerCase().includes(lowerCaseValue))));
      setFilteredBooks(newBook);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
    filterData(e.target.value);
  };

  return (
    <div id="search-bar">
      <input
        id="search-bar-input"
        type="text"
        value={search}
        onChange={(e) => handleChange(e)}
        placeholder="Busque livros pelo título, autor ou idioma"
      />
      <button id="search-bar-button" type="button" onClick={() => { setFilteredBooks(books); setSearch(""); }}>
        Limpar
      </button>
    </div>
  );
};

export default SearchBar;
