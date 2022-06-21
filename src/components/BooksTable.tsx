import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { IBook } from "../interface/IBook";

interface BooksTableProps {
  books: IBook[];
}

const BooksTable: React.FC<BooksTableProps> = ({ books }: BooksTableProps) => {
  const [pageNumber, setPageNumber] = useState<number>(0);

  const itemsPerPage = 10;
  const pagesVisited = pageNumber * itemsPerPage;
  const booksToDisplay = books.slice(pagesVisited, pagesVisited + itemsPerPage);
  const pageCount = Math.ceil(books.length / itemsPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
          </tr>
        </thead>
        <tbody>
          {booksToDisplay.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.pages}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={pageCount}
        onPageChange={changePage}
      />
    </div>
  );
};

export default BooksTable;
