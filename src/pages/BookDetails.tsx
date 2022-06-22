import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BsFillArrowLeftCircleFill,
  BsHandIndexThumbFill,
} from "react-icons/bs";
import { IBook } from "../interface/IBook";

const BookDetails: React.FC = () => {
  const [book, setBook] = useState<IBook>({} as IBook);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { title } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const asyncFunc = async () => {
      try {
        const data = await fetch("http://localhost:3001/books").then((res) => res.json());
        const selectedBook = data.find((item: IBook) => item.title === title);
        setBook(selectedBook);
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
        <div className="w-full h-full flex flex-row justify-center items-center gap-28">
          <div className="">
            <button
              className="flex gap-4 py-4 items-center"
              type="button"
              onClick={() => navigate("/")}
            >
              <BsFillArrowLeftCircleFill />
              Voltar ao menu principal
            </button>
            <p
              className="bg-[#5B2A86] py-96 px-40 border-2 border-[#5B2A86] shadow-lg rounded-lg"
              id="book-image"
            >
              {book.imageLink}
            </p>
          </div>
          <div className="flex flex-col shadow-lg rounded-lg p-5 text-[#d9cae6] bg-[#5B2A86]">
            <p
              className="text-6xl text-bold text-white p-3 border-b-2 border-b-[#d9cae6] "
              id="book-title"
            >
              {book.title}
            </p>
            <p className="p-3 border-t border-t-[#d9cae6]" id="book-author">
              {`Autor: ${book.author}`}
            </p>
            <p
              className="p-3 border-t border-t-[#d9cae6]"
              id="book-published-year"
            >
              {`Publicado em: ${book.year}`}
            </p>
            <p className="p-3 border-t border-t-[#d9cae6]" id="book-country">
              {`País: ${book.country}`}
            </p>
            <p className="p-3 border-t border-t-[#d9cae6]" id="book-language">
              {`Idioma: ${book.language}`}
            </p>
            <p
              className="p-3 border-t border-t-[#d9cae6]"
              id="book-total-pages"
            >
              {`Total de Páginas: ${book.pages}`}
            </p>
            <div className="flex justify-end items-center my-4">
              <a
                className="flex gap-4 items-center text-[#5B2A86] bg-white p-3 rounded-lg hover:text-blue-500 transition duration-150 ease-in-out"
                id="book-link"
                href={book.link}
                target="_blank"
                rel="noreferrer"
              >
                Mais sobre o livro
                <BsHandIndexThumbFill />
              </a>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className="w-screen h-screen bg-slate-100"
      id={`details-page-${book.id}`}
    >
      {renderPage()}
    </div>
  );
};

export default BookDetails;
