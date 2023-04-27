import './App.css';
import React from "react";
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Mentions from './components/Mentions';


function App() {
  return (
    <React.Fragment>
      <Header />
      <main className="mainContenu">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/mentions-legales" element={<Mentions /> } exact />
      </Routes>
      </BrowserRouter>
      </main>
    </React.Fragment>
  );
}

export default App;
