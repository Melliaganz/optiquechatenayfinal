import './App.css';
import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Mentions from './components/Mentions';
import Administration from './components/Administration';
import Footer from './components/Footer';
import GalleriedePhotos from './components/GalleriedePhotos';
import NotFound from './components/NotFound';
import ScrollTopButton from './components/ScrollTopButton';


function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onProgress(event) {
      const { loaded, total } = event;
      const progress = Math.round((loaded / total) * 100);
      setProgress(progress);
    }

    function onLoad() {
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
      }, 500);
    }

    window.addEventListener("progress", onProgress, true);
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("progress", onProgress, true);
      window.removeEventListener("load", onLoad);
    };
  }, []);
  return (
    <React.Fragment>
      <div
      style={{
        position: "fixed",
        display: progress >= 100 ? "flex" : "none",
        width: "100%",
        height: "10px",
        backgroundColor: "#ddd",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "#ea73b9",
          transition: "width 0.5s ease-in-out",
        }}
      ></div>
    </div>
      <Header />
      <ScrollTopButton />
      <main className="mainContenu">
        
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/mentions-legales" element={<Mentions />} exact />
          <Route path="/administration" element={<Administration />} exact />
          <Route path="/gallerie" element={<GalleriedePhotos />} exact />
          <Route path="*" element={<NotFound />} exact />
        </Routes>
      </BrowserRouter>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
