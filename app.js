const express = require("express");
const productRoutes = require("./routes/productRoutes")

const app = express();


app.use(express.json())

app.use("/products",productRoutes)


 app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });



  




 