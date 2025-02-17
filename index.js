const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require("os");
const { timeStamp } = require("console");

const app = express();
const port = 8000;

// Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/practise-app-1")
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

app.use((req, res, next) => {
  console.log("Hello From Middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Hello From Middleware 2");
  next();
});

// Routes
app.get("/users", async (req, res) => {
  const allDBUsers = await User.find({});
  const html = `<ul> 
      ${allDBUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
      </ul>`;

  res.send(html);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const id = Number(req.params.id);
    console.log("Requested ID:", id);

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  })
  .put(async (req, res) => {
    const user = await User.findById(req.params.id);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...user.toObject(), ...req.body },
      { new: true }
    );
    res.json({
      msg: "User Updated",
      user: updatedUser,
    });
  })
  .delete(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    res.json({
      msg: "User Deleted",
      user: deletedUser,
    });
  });

// Get all users
app.get("/api/users", async (req, res) => {
  const allDBUsers = await User.find({});
  res.json(allDBUsers);
});

// Post
app.post("/api/users", async (req, res) => {
  let body = req.body;

  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    jobTitle: body.jobTitle,
    gender: body.gender,
  });
  console.log(result);
  return res.json({ msg: "Succesfully added" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
