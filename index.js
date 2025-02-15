const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/users", (req, res) => {
  const html = `<ul> 
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>`;

  res.send(html);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    console.log("Requested ID:", id);

    const user = users.find((user) => user.id === id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  })
  .put((req, res) => {
    const id = Number(req.params.id);
    console.log("Requested ID:", id);

    // User find karo
    const userIndex = id - 1;

    users[userIndex] = { ...users[userIndex], ...req.body };

    res.json({ message: "User updated successfully", user: users[userIndex] });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    console.log("Requested ID:", id);

    const deleteUser = users.splice(id - 1, 1);

    res.json(deleteUser);
  });

// Get all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Post
app.post("/api/users", (req, res) => {
  let body = req.body;

  // Generate new ID
  let newUser = { ...body, id: users.length + 1 };
  users.push(newUser);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "User Added" });
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
