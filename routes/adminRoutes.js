const router = require("express").Router();
const { getAllUsers, getProfile } = require("../controllers/AdminController");
const { auth, isAdmin } = require("../middlewares/authMiddleware");

router.post('/profile', auth, isAdmin, getProfile);


module.exports = router;