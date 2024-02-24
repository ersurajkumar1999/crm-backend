const express = require('express');
const {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest
} = require('../controllers/friendShipController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();

// Define routes for friendship-related actions
router.post('/send-request',auth, sendFriendRequest);
router.post('/accept-request/:userId/:friendId', acceptFriendRequest);
router.post('/reject-request/:userId/:friendId', rejectFriendRequest);

module.exports = router;
