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
    <div>
      <label htmlFor="initialYear">
        Filtrar ano da publicação:
        <input
          type="number"
          name="initialYear"
          id="initialYear"
          min={-2000}
          max={3000}
          value={initialYear}
          onChange={(e) => handleChange(e)}
          onFocus={(e) => e.target.select()}
        />
      </label>
      <label htmlFor="finalYear">
        até
        <input
          type="number"
          name="finalYear"
          id="finalYear"
          min={-2000}
          max={3000}
          value={finalYear}
          onChange={(e) => handleChange(e)}
          onFocus={(e) => e.target.select()}
        />
      </label>
      <button type="button" onClick={() => filterByYear()}>
        Filtrar
      </button>
    </div>
  );
};

export default Filter;