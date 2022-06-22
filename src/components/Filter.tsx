import React, { Dispatch, SetStateAction, useState } from "react";
import { IBook } from "../interface/IBook";

interface FilterProps {
  filteredBooks: IBook[];
  setFilteredBooks: Dispatch<SetStateAction<IBook[]>>;
}

const Filter: React.FC<FilterProps> = ({
  filteredBooks,
  setFilteredBooks,
}: FilterProps) => {
  const [initialYear, setInitialYear] = useState<number | string>(0);
  const [finalYear, setFinalYear] = useState<number | string>(0);

  const filterByYear = () => {
    const newBooks = filteredBooks.filter((book) => {
      if (initialYear && finalYear) {
        return book.year >= initialYear && book.year <= finalYear;
      }
      return book.year >= initialYear;
    });
    setFilteredBooks(newBooks);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "initialYear") {
      setInitialYear(value);
    } else {
      setFinalYear(value);
    }
  };

  return (
    <div id="filter-bar" className="flex flex-row justify-between items-center mx-56 mb-4">
      <div>
        <label htmlFor="initial-year">
          Filtrar ano da publicação:
          <input
            type="number"
            name="initialYear"
            id="initial-year"
            min={-2000}
            max={3000}
            value={initialYear}
            onChange={(e) => handleChange(e)}
            onFocus={(e) => e.target.select()}
            className="w-fit ml-4 mr-4 text-center appearance-none border-2 border-gray-300 rounded-lg"
          />
        </label>
        <label htmlFor="final-year">
          até
          <input
            type="number"
            name="finalYear"
            id="final-year"
            min={-2000}
            max={3000}
            value={finalYear}
            onChange={(e) => handleChange(e)}
            onFocus={(e) => e.target.select()}
            className="w-fit ml-4 mr-4 text-center appearance-none border-2 border-gray-300 rounded-lg"
          />
        </label>
        <button
          className="bg-[#5B2A86] text-white font-bold py-2 px-4 rounded-lg ml-4"
          id="filter-button"
          type="button"
          onClick={() => filterByYear()}
        >
          Filtrar
        </button>
      </div>
      <div>
        <p
          className="text-center font-bold"
          id="search-results"
        >
          {`${filteredBooks.length} livro(s) encontrado(s)`}

        </p>
      </div>
    </div>
  );
};

export default Filter;
