import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // webpack creates a minified version and puts into the index.html
import App from "./components/App";
import "./index.css";
import configureStore from "./redux/configureStore";
import { Provider } from "react-redux";

// We are not passing any initial state, as we have default state in reducer() first arg.
// Pass the intialState value, when you are getting data from local storage / servers.
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
