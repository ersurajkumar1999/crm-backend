const router = require("express").Router();
const { auth } = require("../middlewares/authMiddleware");
const { searchUsers } = require("../controllers/ChatController");

router.post('/search-users', auth, searchUsers);


module.exports = router;