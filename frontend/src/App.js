import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Portfolio from "./pages/Portfolio";
import Album from "./pages/Album";
import Music from "./pages/Music";

import bg6 from "./assets/bg/44.jpg";

function AppContent() {
  const [bg] = useState(bg6);
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);
  const location = useLocation();
  const isAlbum = location.pathname.startsWith("/album");

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const backgroundSize = isAlbum
    ? "cover"
    : `${Math.min(windowWidth, 180)}px auto`;

  return (
    <div
      className="app"
      style={{
        backgroundImage: isAlbum ? "none" : `url(${bg})`,
        backgroundSize,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        backgroundColor: isAlbum ? "#fcfcfc" : "#fff",
      }}
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/portfolio" replace />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/music" element={<Music />} />
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