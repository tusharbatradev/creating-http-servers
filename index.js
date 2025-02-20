const express = require("express");
const cors = require("cors"); // 🔥 Import CORS
const userRouter = require("./Routes/user");
const { connectMongoDb } = require("./connection");
const productRouter = require("./Routes/product");

const app = express();
const port = 8000;

// ✅ Enable CORS for all origins
app.use(cors());

app.use(express.json()); // 🛠 JSON data handle karne ke liye
app.use(express.urlencoded({ extended: false }));

// Database Connection
connectMongoDb("mongodb://127.0.0.1:27017/practise-app-1").then(() =>
  console.log("MongoDb Connected")
);

// Middleware Example
app.use((req, res, next) => {
  console.log("Hello From Middleware 1");
  next();
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
