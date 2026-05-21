require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const app = express();

app.use(cors());
app.use(express.json());

/* ------------------ CLOUDINARY CONFIG ------------------ */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;

/* ------------------ UTILS ------------------ */

// ordre albums basé sur 3 premiers chiffres
const getOrder = (name) => {
  const match = name.match(/^(\d{3})/);
  return match ? parseInt(match[1], 10) : Infinity;
};

// ordre photos basé sur 3 premiers chiffres du filename
const getPhotoOrder = (publicId) => {
  const filename = publicId.split("/").pop();
  const match = filename.match(/^(\d{3})/);
  return match ? parseInt(match[1], 10) : Infinity;
};

// slug propre
const slugify = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

/* ------------------ ROUTE ------------------ */

app.get("/albums", async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression("resource_type:image")
      .sort_by("public_id", "desc")
      .max_results(500)
      .execute();

    const albumsMap = {};

    result.resources.forEach((img) => {
      if (!img.public_id || !img.asset_folder) return;

      const parts = img.asset_folder.split("/");

      if (parts.length < 2) return;

      const type = parts[0]; // Voyages / Projets

      // folder complet après type
      const rawTitle = parts.slice(1).join("/");

      // ordre album basé sur 001 / 002 / 003
      const order = getOrder(rawTitle);

      // titre SANS supprimer année (on garde tout)
      const title = rawTitle.replace(/^\d{3}-?/, "").trim();

      const key = `${type}-${title}`;

      if (!albumsMap[key]) {
        albumsMap[key] = {
          id: `${String(order).padStart(3, "0")}-${slugify(title)}`,
          title,
          order,
          type: type.toLowerCase() === "voyages" ? "voyage" : "projet",
          slug: slugify(`${type}-${title}`),
          photos: [],
        };
      }

      albumsMap[key].photos.push({
        url: img.secure_url.replace("/upload/", "/upload/f_auto,q_auto/"),
        order: getPhotoOrder(img.public_id),
      });
    });

    const albums = Object.values(albumsMap)
      .map((album) => ({
        ...album,
        photos: album.photos
          .sort((a, b) => a.order - b.order)
          .map((p) => p.url),
      }))
      .sort((a, b) => a.order - b.order);

    res.json(albums);
  } catch (err) {
    console.error("Cloudinary error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ SERVER ------------------ */

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});