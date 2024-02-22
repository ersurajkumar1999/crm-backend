const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const User = require("../models/User");
const { findUserById } = require("../services/userServices");

const searchUsers = async (req, res) => {
    const search = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: 'i' } },
                { email: { $regex: req.query.search, $options: 'i' } },
            ],
        }
        : {};

    const users = await User.find(search).find({ _id: { $ne: req.rootUserId } });
    return res.status(200).send(users);



    try {
        const user = await findUserById(req.user.id);
        return successResponseMessage(res, "Get Profile", user)
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
module.exports = { searchUsers }