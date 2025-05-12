import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './Component/HomePage/homePage';

import NotFound from './Page/404';

function App() {

  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
