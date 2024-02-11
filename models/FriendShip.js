const mongoose = require('mongoose');
const friendShipSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'] },
});

module.exports = mongoose.model('FriendShip', friendShipSchema);
