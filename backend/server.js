const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Route racine
app.get("/", (req, res) => {
  res.send("Backend Portfolio SaaS running");
});

// Route /photos
app.get("/photos", (req, res) => {
  const photos = [
    { id: 1, title: "Photo 1", url: "https://via.placeholder.com/200" },
    { id: 2, title: "Photo 2", url: "https://via.placeholder.com/200" }
  ];

  res.json(photos);
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});