const express = require("express");
const userRouter = require("./Routes/user");
const { connectMongoDb } = require("./connection");
const productRouter = require("./Routes/product");

const app = express();
const port = 8000;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/practise-app-1").then(() =>
  console.log("MongoDb Connected")
);

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Hello From Middleware 1");
  next();
});

// Routes
app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
