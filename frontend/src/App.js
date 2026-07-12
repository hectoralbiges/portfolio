import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Navbar from "./components/Navbar";
import Portfolio from "./pages/Portfolio";
import Album from "./pages/Album";
import Music from "./pages/Music";
import About from "./pages/About";
import logo from "./assets/logo/logo.svg";

function AppContent() {
  const [brandVisible, setBrandVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setBrandVisible(window.scrollY < 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="app"
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <div
        className="site-brand"
        style={{
          opacity: brandVisible ? 1 : 0,
          visibility: brandVisible ? "visible" : "hidden",
          height: "48px",
          margin: "4px 0 0 4px",
        }}
      >
        <img src={logo} alt="Logo" style={{ display: "block", width: "auto", height: "100%" }} />
      </div>
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