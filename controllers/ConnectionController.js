const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");

const {
    deleteUserById,
    updateUserByID,
    findUserById,
    totalUsers,
    getUsers
} = require("../services/userServices");

const userListForConnections = async (req, res) => {
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 2;

    const skip = (page - 1) * pageSize;

    try {
        const totalItems = await totalUsers();
        const users = await getUsers(skip, pageSize);
        res.json({
            data:users,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            status: true,
            message: "get all users"
        });
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
module.exports = { userListForConnections }