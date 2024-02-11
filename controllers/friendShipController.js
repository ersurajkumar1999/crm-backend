const Friendship = require('../models/FriendShip');
const User = require('../models/User');

const sendFriendRequest = async (req, res) => {
    const { senderId, receiverId } = req.params;

    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if a friendship request already exists
        const existingRequest = await Friendship.findOne({
            $or: [
                { requester: senderId, recipient: receiverId },
                { requester: receiverId, recipient: senderId }
            ]
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Friendship request already sent or accepted' });
        }

        // Create a new friendship request
        const friendshipRequest = new Friendship({
            requester: senderId,
            recipient: receiverId,
            status: 'pending'
        });

        await friendshipRequest.save();

        res.json({ message: 'Friend request sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const acceptFriendRequest = async (req, res) => {
    const { userId, friendId } = req.params;

    try {
        // Update the friendship status to 'accepted'
        await Friendship.findOneAndUpdate(
            {
                $or: [
                    { requester: userId, recipient: friendId, status: 'pending' },
                    { requester: friendId, recipient: userId, status: 'pending' }
                ]
            },
            { $set: { status: 'accepted' } }
        );

        // Update the friends list for both users
        await User.findByIdAndUpdate(userId, { $push: { friends: friendId } });
        await User.findByIdAndUpdate(friendId, { $push: { friends: userId } });

        res.json({ message: 'Friend request accepted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const rejectFriendRequest = async (req, res) => {
    const { userId, friendId } = req.params;

    try {
        // Update the friendship status to 'rejected'
        await Friendship.findOneAndUpdate(
            {
                $or: [
                    { requester: userId, recipient: friendId, status: 'pending' },
                    { requester: friendId, recipient: userId, status: 'pending' }
                ]
            },
            { $set: { status: 'rejected' } }
        );

        res.json({ message: 'Friend request rejected' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Export controller actions
module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
};
