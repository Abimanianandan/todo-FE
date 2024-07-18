import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditTodos from "./components/EditTodos";
import DisplayTodos from "./components/DisplayTodos";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayTodos />} />
          <Route path="/:id" element={<EditTodos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
