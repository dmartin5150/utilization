import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./sass/base/_base.scss";
import "./sass/base/_typography.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";


const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);


