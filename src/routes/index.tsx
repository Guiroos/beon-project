import React from "react";
import {
  Routes, // instead of Switch
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import BookDetails from "../pages/BookDetails";

const RoutesApp: React.FC = () => (
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:title" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default RoutesApp;
