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
        <div className="w-full h-full flex flex-row justify-center items-center gap-14">
          <div className="">
            <button
              className="flex gap-4 py-4 items-center text-[#5B2A86] text-xl font-bold hover:text-[#8850BB] transition duration-150 ease-in-out"
              type="button"
              onClick={() => navigate("/")}
            >
              <BsFillArrowLeftCircleFill />
              Voltar ao menu principal
            </button>
            <p
              className="bg-[#5B2A86] px-16 py-64 lg:py-80 lg:px-40 border-2 border-[#5B2A86] shadow-lg rounded-lg"
              id="book-image"
            >
              {book.imageLink}
            </p>
          </div>
          <div className="flex flex-col shadow-lg rounded-lg p-5 text-[#5B2A86] border-[1px] border-[#8850BB]">
            <p
              className="text-3xl lg:text-5xl text-bold p-3 border-b-4 border-b-[#8850BB]"
              id="book-title"
            >
              {book.title}
            </p>
            <p className="p-3 border-b border-b-[#8850BB]" id="book-author">
              {`Autor: ${book.author}`}
            </p>
            <p
              className="p-3 border-b border-b-[#8850BB]"
              id="book-published-year"
            >
              {`Publicado em: ${book.year}`}
            </p>
            <p className="p-3 border-b border-b-[#8850BB]" id="book-country">
              {`País: ${book.country}`}
            </p>
            <p className="p-3 border-b border-b-[#8850BB]" id="book-language">
              {`Idioma: ${book.language}`}
            </p>
            <p
              className="p-3 border-b border-b-[#8850BB]"
              id="book-total-pages"
            >
              {`Total de Páginas: ${book.pages}`}
            </p>
            <div className="flex justify-end items-center my-4">
              <a
                className="flex gap-4 items-center text-white bg-[#5B2A86] p-3 rounded-lg hover:bg-[#8850BB] transition duration-150 ease-in-out"
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
      className="w-screen h-screen mx-auto text-md lg:text-2xl"
      id={`details-page-${book.id}`}
    >
      {renderPage()}
    </div>
  );
};

export default BookDetails;
