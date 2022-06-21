import React, { Dispatch, SetStateAction } from "react";
import { IBook } from "../interface/IBook";

interface FilterProps {
  books: IBook[];
  searchedBooks: IBook[];
  setSearchedBooks: Dispatch<SetStateAction<IBook[]>>;
}

const SearchBar: React.FC<FilterProps> = ({
  books,
  searchedBooks,
  setSearchedBooks,
}: FilterProps) => {
  const [search, setSearch] = React.useState("");

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
