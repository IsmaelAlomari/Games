const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
  SequelizeSlugify.slugifyModel(Product, {
    source: ["name"],
  });
  Product.associate = (models) => {
    models.Shop.hasMany(Product, {
      foreignKey: "shopId",
      as: "products",
      allowNull: false,
    });
    Product.belongsTo(models.Shop, { foreignKey: "shopId" });
  };

  return Product;
};
