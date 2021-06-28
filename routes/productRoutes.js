const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();

const {
  productsCreate,
  productsDelete,
  productsList,
  productsDetails,
  updateProduct,
  fetchProduct,
} = require("../productsControllers/productsControllers");

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const err = new Error("Product Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", productsList);

router.post("/", productsCreate);

router.get("/:productId", productsDetails);

router.delete("/:productId", productsDelete);

router.put("/:productId", upload.single("image"), updateProduct);

module.exports = router;
