const { Product } = require("../db/models");

exports.fetchProduct = async (productId, next) => {
  try {
    req.body.shopId = req.shop.id;
    const product = await product.findByPk(productId);
    return product;
  } catch (error) {
    next(error);
  }
};
exports.productsCreate = async (req, res, next) => {
  try {
    req.body.shopId = req.shop.id;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.productsDelete = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    await req.product.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.productsList = async (req, res) => {
  try {
    req.body.shopId = req.shop.id;
    const listProduct = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(listProduct);
  } catch (error) {
    res.status(500).json({ message: error.message || "Servor Error" });
  }
};

exports.productsDetails = async (req, res) => {
  try {
    const detailProduct = await Product.findByPk(req.params.productId);
    if (detailProduct) {
      res.status(200).json(detailProduct);
    } else {
      res.status(404).json({ message: "Product Id dose not found" });
    }
  } catch (error) {
    res.status(500).json(error.message || "server error");
  }
};
