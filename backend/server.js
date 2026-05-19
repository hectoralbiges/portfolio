require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const app = express();

app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;

app.get("/albums", async (req, res) => {
  try {

    const result = await cloudinary.api.resources({
      type: "upload",
      max_results: 500
    });

    const albumsMap = {};

    result.resources.forEach((img) => {

      if (!img.asset_folder) return;

      const parts = img.asset_folder.split("/");

      const type = parts[0];      // Voyages / Projets
      const title = parts[1];     // Tokyo / Kyoto

      const key = `${type}-${title}`;

      const slugify = (text) =>
        text
          .toLowerCase()
          .normalize("NFD")                 // enlève accents
          .replace(/[\u0300-\u036f]/g, "") // accents cleanup
          .replace(/[^a-z0-9\s-]/g, "")    // enlève tout sauf lettres/nombres/space/hyphen
          .trim()
          .replace(/\s+/g, "-")           // espaces → -
          .replace(/-+/g, "-");       

      if (!albumsMap[key]) {
        albumsMap[key] = {
          id: key,
          title,
          type: type.toLowerCase() === "voyages" ? "voyage" : "projet",
          slug: slugify(`${type}-${title}`),
          photos: []
        };
      }

      albumsMap[key].photos.push(img.secure_url);
    });

    const albums = Object.values(albumsMap);

    res.json(albums);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});