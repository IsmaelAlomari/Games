const { Shop, Product } = require("../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findByPk(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};
exports.shopsCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.shopsList = async (req, res) => {
  try {
    const listShop = await Shop.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Product,
        as: "products",
        attributes: ["id"],
      },
    });
    res.json(listShop);
  } catch (error) {
    res.status(500).json({ message: error.message || "Servor Error" });
  }
};
exports.productsCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    req.body.shopId = req.shop.id;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
// exports.shopsDelete = async (req, res, next) => {
//   try {
//     await req.shop.destroy();
//     res.status(204).end();
//   } catch (err) {
//     next(err);
//   }
// };

// exports.updateShop = async (req, res) => {
//   try {
//     await req.shop.update(req.body);
//     res.status(204).end();
//   } catch (err) {
//     next(err);
//   }
// };

// exports.shopsDetails = async (req, res) => {
//   try {
//     const detailShop = await Shop.findByPk(req.params.shopId);
//     if (detailShop) {
//       res.status(200).json(detailShop);
//     } else {
//       res.status(404).json({ message: "Shop Id dose not found" });
//     }
//   } catch (error) {
//     res.status(500).json(error.message || "server error");
//   }
// };
