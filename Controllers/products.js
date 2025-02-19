const Product = require("../Models/product");

async function getAllProducts(req, res) {
  const allProducts = await Product.find({});
  res.json(allProducts);
}

async function getProductById(req, res) {
  const product = await Product.findById(req.params.id);
  res.json(product);
}

async function updateProduct(req, res) {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // 🔹 Spread operator ka sahi use
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { ...product._doc, ...req.body },
    { new: true }
  );

  res.json(updatedProduct);
}

async function deleteProduct(req, res) {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  res.json({ msg: "Product Deleted", product: deletedProduct });
}

async function addProduct(req, res) {
  const body = req.body;

  const result = await Product.create({
    productName: body.productName,
    price: body.price,
  });

  console.log("Product Created");

  res.json({
    msg: "Product Created",
    product: result,
  });
}

module.exports = {
  getAllProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
