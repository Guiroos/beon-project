import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IBook } from "../interface/IBook";

const BookDetails: React.FC = () => {
  const [book, setBook] = useState<IBook>({} as IBook);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { title } = useParams();

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
        <h1>{book.title}</h1>
        <p>{book.imageLink}</p>
        <p>{`Autor: ${book.author}`}</p>
        <p>{`Publicado em: ${book.year}`}</p>
        <p>{`País: ${book.country}`}</p>
        <p>{`Idioma: ${book.language}`}</p>
        <p>{`Total de Páginas: ${book.pages}`}</p>
        <a href={book.link} target="_blank" rel="noreferrer">Mais informações</a>
      </>
    );
  };

  return <div>{renderPage()}</div>;
};

export default BookDetails;
