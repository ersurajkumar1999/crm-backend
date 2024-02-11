const postModel = require("../models/Post");

const createPost = async (post) => {
    return await postModel.create(post);
}
// const findPostById = async (userId) => {
//     return await postModel.findOne({ _id: userId });
// }
// const deleteUserById = async (userId) => {
//     return await postModel.deleteOne({ _id: userId });
// }
// const updateUserByID = async (userId, updatedUserData) => {
//     return await postModel.findOneAndUpdate({ _id: userId }, { $set: updatedUserData }, { new: true });
// }
const totalPosts = async () => {
    return await postModel.countDocuments();
}
const getAllPosts = async (skip, pageSize) => {
    return await postModel.find().populate('createdBY').sort({ createdAt: -1 })
        .skip(skip).limit(pageSize).exec();
}
module.exports = {
    createPost,
    // findPostById,
    // deleteUserById,
    // updateUserByID,
    totalPosts,
    getAllPosts,
}