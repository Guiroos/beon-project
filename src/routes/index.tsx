import React from "react";
import {
  Routes, // instead of Switch
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import BookDetails from "../pages/BookDetails";

const RoutesApp: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:title" element={<BookDetails />} />
    </Routes>
  </BrowserRouter>
);

export default RoutesApp;
