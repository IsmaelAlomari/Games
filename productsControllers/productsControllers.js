const products = require("../data")
const slugify = require ("slugify")

exports.productsCreate = (req,res) => {
    const id = products[products.length - 1].id +1;
    const slug = slugify(req.body.name.toLowerCase());
    const newProduct = {id :id , slug : slug , ...req.body}
    products.push(newProduct)
    res.status(201).json(newProduct)
  }

exports.productsDelete= (req,res) => {
    const {productId} = req.params
    const productFound= products.find ((product) => product.id === +productId)
    if (productFound) {
      products = products.filter((product)=> product !== productFound)
      res.status(204).end()
    }else {
      res.status(404).json({message :"Product Id dose not found"})
    }
    
  }
exports.productsDetails= (req, res) => {
  
    const addProduct = products.find (
      (product) => product.id === req.params.productId
    )
    res.json(addProduct)
  }
exports.productsList = (req, res) => {
    res.json({products});
  }

