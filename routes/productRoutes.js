const express = require ("express")
const products = require("../data")
const router = express.Router()

const {productsCreate , productsDelete ,productsList ,productsDetails} = require("../productsControllers/productsControllers")


router.get("/", productsList);


router.post("/",productsCreate)
  
  router.get("/:productId",productsDetails  )

    router.delete("/:productId" ,productsDelete)

    module.exports = router;