import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { IBook } from "../interface/IBook";

interface BooksTableProps {
  books: IBook[];
}

const BooksTable: React.FC<BooksTableProps> = ({ books }: BooksTableProps) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const navigate = useNavigate();

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
            <th>Livro</th>
            <th>Autor</th>
            <th>Idioma</th>
            <th>Ano</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {booksToDisplay.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.language}</td>
              <td>{book.year}</td>
              <td>
                <button
                  type="button"
                  onClick={() => navigate(`/${book.title}`)}
                >
                  Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel="Anterior"
        nextLabel="Próxima"
        pageCount={pageCount}
        onPageChange={changePage}
      />
    </div>
  );
};

export default BooksTable;
