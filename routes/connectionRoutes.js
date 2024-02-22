const router = require("express").Router();
const { userListForConnections } = require("../controllers/ConnectionController");
const { auth } = require("../middlewares/authMiddleware");

router.post('/user-list-for-connections', auth, userListForConnections);
module.exports = router;