import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import LanguageProvider from "./translations/LanguageProvider";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <LanguageProvider>
    <Router>
      <App />
    </Router>
  </LanguageProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
