import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import 'antd/dist/antd.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
