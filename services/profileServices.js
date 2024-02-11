const userProfile = require("../models/Profile")
const createProfile = async (profile) => {
    return await userProfile.create(profile);
}

module.exports = { createProfile }