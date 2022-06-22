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
    <div id="book-table" className="mx-52">
      <table id="table" className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
        <thead id="table-head" className="bg-gray-100 uppercase">
          <tr id="table-head-row" className="border-2">
            <th className="text-left px-6 py-2">Livro</th>
            <th className="px-6 py-2">Autor</th>
            <th className="px-6 py-2">Idioma</th>
            <th className="px-6 py-2">Ano</th>
            <th className="px-6 py-2">
              <p className="sr-only">
                Ações
              </p>
            </th>
          </tr>
        </thead>
        <tbody id="table-body" className="">
          {booksToDisplay.map((book) => (
            <tr key={book.title} className="odd:bg-[#5B2A86] even:bg-[#754f96] text-center text-slate-100">
              <td className="text-left px-6 py-2 border-2">{book.title}</td>
              <td className="px-6 py-2 border-2">{book.author}</td>
              <td className="px-6 py-2 border-2">{book.language}</td>
              <td className="px-6 py-2 border-2">{book.year}</td>
              <td className="px-6 py-2 border-2">
                <button
                  id="details-button"
                  type="button"
                  onClick={() => navigate(`/${book.title}`)}
                  className="hover:text-blue-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
                >
                  Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="paginate-div">
        <ReactPaginate
          className="flex justify-center items-center my-5"
          activeClassName="bg-[#5B2A86] border-white text-white p-4 font-bold"
          pageClassName="p-3 m-1 border-2 rounded-lg"
          nextClassName="p-3 m-1 border-2 rounded-lg"
          previousClassName="p-3 m-1 border-2 rounded-lg"
          breakClassName="p-3 m-1 border-2 rounded-lg"
          previousLabel="<"
          nextLabel=">"
          pageCount={pageCount}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};

export default BooksTable;
