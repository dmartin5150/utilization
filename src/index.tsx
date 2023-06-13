import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./sass/base/_base.scss";
import "./sass/base/_typography.scss";
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


