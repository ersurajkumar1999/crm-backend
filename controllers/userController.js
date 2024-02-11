const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const {
    deleteUserById,
    updateUserByID,
    findUserById,
    totalUsers,
    getUsers
} = require("../services/userServices");

const getAllUsers = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;

    const skip = (page - 1) * pageSize;

    try {
        const totalItems = await totalUsers();
        const users = await getUsers(skip, pageSize);
        res.json({
            users,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            status: true,
            message: "get all users"
        });
    } catch (err) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const getUserById = async (req, res) => {
    try {
        if (!req.params.id) {
            return errorResponseMessage(res, "Id is required!", 401);
        }
        const user = await findUserById(req.params.id);
        return successResponseMessage(res, "User get successfully!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        if (!req.params.id) {
            return errorResponseMessage(res, "Id is required!", 401);
        }
        const user = await deleteUserById(req.params.id);
        return successResponseMessage(res, "User deleted successfully!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const updateUser = async (req, res) => {
    try {
        const { username } = req.body;
        if (!req.params.id) {
            return errorResponseMessage(res, "Id is required!", 401);
        }
        const userInfo = {
            username
        }
        const user = await updateUserByID(req.params.id, userInfo)
        return successResponseMessage(res, "User update successfully!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
};
