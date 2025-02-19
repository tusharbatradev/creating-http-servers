const User = require("../Models/user");

async function getAllUsers(req, res) {
  const allDBUsers = await User.find({});
  res.json(allDBUsers);
}

async function getUserById(req, res) {
  const id = Number(req.params.id);
  console.log("Requested ID:", id);

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
}

async function updatedUser(req, res) {
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
}

async function deleteUser(req, res) {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  res.json({
    msg: "User Deleted",
    user: deletedUser,
  });
}

async function addUser(req, res) {
  let body = req.body;

  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    jobTitle: body.jobTitle,
    gender: body.gender,
  });
  console.log(result);
  return res.json({ msg: "Succesfully added", user : result });
}

module.exports = { getAllUsers, getUserById, updatedUser, deleteUser, addUser };
