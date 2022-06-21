import React from "react";
import { useParams } from "react-router-dom";

const BookDetails: React.FC = () => {
  const { title } = useParams();

  return (
    <div>{title}</div>
  );
};

export default BookDetails;
