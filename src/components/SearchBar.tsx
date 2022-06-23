import React, { Dispatch, SetStateAction } from "react";
import { AiOutlineSearch } from "react-icons/ai";
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
    }
    if (!filteredBooks) {
      const newBook = books.filter(
        (book) => Object.keys(book).some(
          (key) => (excludeKeys.includes(key)
            ? false
            : book[key].toString().toLowerCase().includes(lowerCaseValue)),
        ),
      );
      setFilteredBooks(newBook);
    }
    if (filteredBooks) {
      const newBook = filteredBooks.filter(
        (book) => Object.keys(book).some(
          (key) => (excludeKeys.includes(key)
            ? false
            : book[key].toString().toLowerCase().includes(lowerCaseValue)),
        ),
      );
      setFilteredBooks(newBook);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
    filterData(e.target.value);
  };

  return (
    <div id="search-bar" className="flex items-center mx-12 my-5 gap-4">
      <img
        src="https://www.beon.com.br/wp-content/uploads/2020/11/beon-logo-roxo.png"
        alt="Beon logo"
        className="h-8 md:h-12 lg:h-20"
      />
      <div className="w-full pl-2 pr-4 py-2 flex items-center border-2 border-gray-300 rounded-lg shadow-lg">
        <AiOutlineSearch size={24} />
        <input
          id="search-bar-input"
          type="text"
          value={search}
          onChange={(e) => handleChange(e)}
          placeholder="Busque livros pelo título, autor ou idioma"
          className="ml-4 mr-4 px-3 py-1 w-full outline-none rounded-lg"
        />

        <button
          id="search-bar-button"
          type="button"
          onClick={() => {
            setFilteredBooks(books);
            setSearch("");
          }}
        >
          Limpar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
