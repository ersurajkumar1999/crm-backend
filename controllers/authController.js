const validator = require('validator');
const jwt = require("jsonwebtoken");
const { errorResponseMessage, successResponseMessage } = require('../helper/responseMessage');
const { createUser, findUserByEmail, generateAccountNumber } = require('../services/userServices');
const { createProfile } = require('../services/profileServices');
const { comparePassword, hashedPassword } = require('../helper/PasswordManager');
const { sendMail } = require('../helper/emailServices');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (validator.isEmpty(email)) {
            return errorResponseMessage(res, "Email field is required");
        } else if (!validator.isEmail(email)) {
            return errorResponseMessage(res, "Invalid email address");
        }
        if (!password || password.length < 6) {
            return errorResponseMessage(res, "Password needs to be atleast 6 characters long.");
        }

        const checkUserExists = await findUserByEmail(email);
        if (!checkUserExists) {
            return errorResponseMessage(res, "User is not registered, Please signup first!", 401);
        }
        const checkPassword = await comparePassword(password, checkUserExists.password);
        if (!checkPassword) {
            return errorResponseMessage(res, "Incorrect Password", 401);
        }
        const token = jwt.sign(
            {
                email: checkUserExists.email,
                id: checkUserExists._id,
                userType: checkUserExists.userType
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );
        checkUserExists.token = "Bearer " + token;
        return successResponseMessage(res, "Login successfully!", checkUserExists);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }

}

const signupUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || firstName.length < 3) {
            return errorResponseMessage(res, "First Name must be at least 3 characters long");
        }
        if (!lastName || lastName.length < 3) {
            return errorResponseMessage(res, "Last Name must be at least 3 characters long");
        }
        if (validator.isEmpty(email)) {
            return errorResponseMessage(res, "Email field is required");
        } else if (!validator.isEmail(email)) {
            return errorResponseMessage(res, "Invalid email address");
        }
        if (!password || password.length < 6) {
            return errorResponseMessage(res, "Password needs to be atleast 6 characters long.");
        }
        let parts = email.split('@');
        let username = parts[0];
        const checkUserExists = await findUserByEmail(email);
        if (checkUserExists) {
            return errorResponseMessage(res, "User email already exists");
        }
        const pass = await hashedPassword(password);
        const profile = await createProfile({ firstName, lastName });
        const accountNumber = await generateAccountNumber();
        const userInfo = {
            // userType:"Admin",
            email,
            username,
            password: pass,
            profile: profile._id,
            accountNumber
        }
        const user = await createUser(userInfo);
        return successResponseMessage(res, "User created successfully!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (validator.isEmpty(email)) {
            return errorResponseMessage(res, "Email field is required");
        } else if (!validator.isEmail(email)) {
            return errorResponseMessage(res, "Invalid email address");
        }
        if (!password || password.length < 6) {
            return errorResponseMessage(res, "Password needs to be atleast 6 characters long.");
        }

        const checkUserExists = await findUserByEmail(email);
        if (!checkUserExists) {
            return errorResponseMessage(res, "User is not registered, Please signup first!", 401);
        }

        if (checkUserExists.userType !== "Admin") {
            return errorResponseMessage(res, "Invalid User Type!", 401);
        }
        const checkPassword = await comparePassword(password, checkUserExists.password);
        if (!checkPassword) {
            return errorResponseMessage(res, "Incorrect Password", 401);
        }
        const mailSend = await sendMail(res);
        const token = jwt.sign(
            {
                email: checkUserExists.email,
                id: checkUserExists._id,
                userType: checkUserExists.userType
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );
        checkUserExists.token = "Bearer " + token;
        return successResponseMessage(res, "Login successfully121!", checkUserExists);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }

}

module.exports = { loginUser, signupUser, adminLogin }