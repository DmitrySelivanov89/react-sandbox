import {createRoot} from "react-dom/client";
import {App} from "./components/App";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router";

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

container.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
    </Routes>
  </BrowserRouter>
);
