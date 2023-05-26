import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// External files
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// Internal files
import store from "./presentations/redux/store";
import GlobalStyle from "./presentations/components/globalStyle";
// Style

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle>
          <App />
        </GlobalStyle>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
