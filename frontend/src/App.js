import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Album from "./pages/Album";

import bg6 from "./assets/bg/6.jpg";

function AppContent() {
  const [bg, setBg] = useState(bg6);
  const location = useLocation();
  const isAlbum = location.pathname.startsWith("/album");

  return (
    <div
      className="app"
      style={{
        backgroundImage: isAlbum ? "none" : `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        backgroundColor: isAlbum ? "#fcfcfc" : "transparent",
      }}
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;