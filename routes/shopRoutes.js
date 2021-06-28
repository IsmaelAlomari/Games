const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();

const {
  shopsCreate,
  productsCreate,
  shopsList,

  fetchShop,
} = require("../productsControllers/shopControllers");

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    const err = new Error("Shop Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", shopsList);
router.post("/", upload.single("image"), shopsCreate);
router.post("/:shopId/products", upload.single("image"), productsCreate);

// router.get("/ShopId", shopsDetails);

// router.delete("/:ShopId", shopsDelete);

// router.put("/:ShopId", updateShop);

module.exports = router;
