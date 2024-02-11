const { errorResponseMessage, successResponseMessage } = require("./responseMessage");
const nodemailer = require('nodemailer');

// SMTP configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jake.hartmann91@ethereal.email',
        pass: 'cpjKwBExjRUZdYTsWx'
    }
});

const sendMail = async (res) => {

    // Email options
    const mailOptions = {
        from: 'spandev23@gmail.com', // Sender email address
        to: 'spandev23@gmail.com', // Recipient email address
        subject: 'Test Email', // Email subject
        text: 'Hello, this is a test email!', // Plain text body
        // You can also use html: '<p>Hello, this is a test email!</p>' for HTML content
    };

    try {
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error('Error sending email:', error);
            }
            console.log('Email sent:', info);
        });
        console.log("Email Send Successfully!==>")
        return true;
        // return successResponseMessage(res, "Email Send Successfully!", []);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

module.exports = { sendMail }