import React, { Dispatch, SetStateAction } from "react";
import { IBook } from "../interface/IBook";

interface FilterProps {
  books: IBook[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchedBooks: IBook[];
  setSearchedBooks: Dispatch<SetStateAction<IBook[]>>;
}

const SearchBar: React.FC<FilterProps> = ({
  books,
  search,
  setSearch,
  searchedBooks,
  setSearchedBooks,
}: FilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
    const filteredBooks = books.filter((book) => book.title.toLowerCase()
      .includes(e.target.value.toLowerCase()));
    setSearchedBooks(filteredBooks);
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => handleChange(e)}
        placeholder="Search"
      />
      {search.length > 0 ? (
        <p>{`${searchedBooks.length} books found`}</p>
      ) : (
        <p>{`${books.length} books found`}</p>
      )}
    </div>
  );
};

export default SearchBar;
