const express = require("express");

const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updatedUser,
  deleteUser,
  addUser,
} = require("../Controllers/user");

// Get all users
router.route('/').get(getAllUsers).post(addUser);

router.route("/:id").get(getUserById).put(updatedUser).delete(deleteUser);

module.exports = router;
