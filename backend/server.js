require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const app = express();

app.use(cors());


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


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

      if (!albumsMap[key]) {
        albumsMap[key] = {
          id: key,
          title,
          type: type.toLowerCase() === "voyages" ? "voyage" : "projet",
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

app.listen(3001, () => {
  console.log("Server running on port 3001");
});