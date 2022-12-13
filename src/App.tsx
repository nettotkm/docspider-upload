import { render } from "react-dom";
import { StrictMode, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <header>
          <Link to="/">Hello, World</Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} /> */}
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
