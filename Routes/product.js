const express = require("express");
const {
  getAllProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../Controllers/products");

const router = express.Router();

router.route("/").get(getAllProducts).post(addProduct);

router.route("/:id").get(getProductById).patch(updateProduct).delete(deleteProduct)

module.exports = router;
