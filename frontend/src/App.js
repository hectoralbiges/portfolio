import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Album from "./pages/Album";

import bg1 from "./assets/bg/1.jpg";
import bg2 from "./assets/bg/2.jpg";
import bg3 from "./assets/bg/3.jpg";
import bg4 from "./assets/bg/4.jpg";

function App() {
  const [bg, setBg] = useState(bg4);

  return (
    <BrowserRouter>
      <div
        className="app"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
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
    </BrowserRouter>
  );
}

export default App;