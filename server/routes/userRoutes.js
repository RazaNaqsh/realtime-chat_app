const express = require("express");
const {
  register,
  login,
  setAvatar,
} = require("../controllers/usersController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);

module.exports = router;
