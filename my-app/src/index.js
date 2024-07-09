import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import App from './components/App';

axios.defaults.baseURL='http://localhost:3000/';
axios.defaults.withCredentials=true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
