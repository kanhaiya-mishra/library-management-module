import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reducer from "./redux/reducer";

import App from "./app.js";

const store = createStore(reducer);

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter >
            <App />
         </BrowserRouter>
      </Provider>
   </React.StrictMode >,
   document.getElementById("root"));