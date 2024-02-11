const router = require("express").Router();
const { deleteUser, updateUser, getUserById, getAllUsers } = require("../controllers/userController");
const { auth, isAdmin } = require("../middlewares/authMiddleware");

router.post('/users', auth, isAdmin, getAllUsers);
router.get('/get-user-by-id/:id', auth, isAdmin, getUserById);
router.delete('/delete-user/:id', auth, isAdmin, deleteUser);
router.put('/update-user/:id', auth, isAdmin, updateUser);
module.exports = router;