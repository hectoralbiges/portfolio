import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Portfolio from "./pages/Portfolio";
import Album from "./pages/Album";
import Music from "./pages/Music";
import About from "./pages/About";

function AppContent() {
  const location = useLocation();
  const isAlbum = location.pathname.startsWith("/album");

  return (
    <div
      className="app"
      style={{
        minHeight: "100vh",
        backgroundColor: isAlbum ? "#fcfcfc" : "#fff",
      }}
    >
      <div className="site-brand">Torek</div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/portfolio" replace />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/music" element={<Music />} />
        <Route path="/about" element={<About />} />
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