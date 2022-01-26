import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/normalize.scss";
import { ThemeProvider } from "styled-components";
const theme = {
  containerColors: {
    listWrapper: "#ebecf0",
    listTitle: "#172b4d",
    whiteBackground: "#fff",
    boxShadow: "0 1px 0 #091e4240",
    placeholder: "#838da1",
    buttonText: "#5e6c84",
    error: "red",
  },
  buttons: {
    type: {
      primary: "#0079bf",
      transparent: "transparent",
    },
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
