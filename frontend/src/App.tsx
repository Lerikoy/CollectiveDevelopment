import React from 'react';
import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import './App.css';
import HomePage from './pages/homepage';
import Cosplay from "./pages/cosplay";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      // case "/art":
      //   title = "";
      //   metaDescription = "";
      //   break;
      case "/cosplay":
        title = "";
        metaDescription = "";
        break;
      // case "/writer":
      //   title = "";
      //   metaDescription = "";
      //   break;
      // case "/2":
      //   title = "";
      //   metaDescription = "";
      //   break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cosplay" element={<Cosplay />} />
      {/* <Route path="/art" element={<Art />} />
      <Route path="/cosplay" element={<Cosplay />} />
      <Route path="/writer" element={<Writer />} />
      <Route path="/2" element={<Frame11 />} /> */}
    </Routes>
  );
}

export default App;
