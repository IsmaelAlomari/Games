const express = require("express");
const ShopRoutes = require("./routes/ShopRoutes");
const productRoutes = require("./routes/productRoutes");

const path = require("path");

const app = express();
app.use(express.json());

app.use("/shops", ShopRoutes);
app.use("/products", productRoutes);
app.use("/media", express.static("media"));
app.use("/media", express.static(path.join(__dirname, "media")));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
