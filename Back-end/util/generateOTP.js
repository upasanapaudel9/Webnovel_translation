const nodemailer = require("nodemailer");
require("dotenv").config();
const OtpModel = require('../model/otpModel');
//................................................


const transporter = nodemailer.createTransport({
    host: process.env.HOST_STRING,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.MAIL_STRING,
        pass: process.env.MAIL_PASSWORD
    }
});

//................................................


const sendOtp = async (email) => {
    try {

        const deleteOtp = await OtpModel.deleteOne({ email: email });

        const generatedOtp = Math.floor(1000 + Math.random() * 9000);
        await OtpModel.create({
            email: email,
            otp: generatedOtp,
            createdAt: new Date()
        })

        //....................................................................................


        const mailOptions = {
            from: 'upasanapaudel9@gmail.com',
            to: email,
            subject: 'The CollabTranslate verification OTP',
            html: `
                <p>Hello,<br><br>
                We just need to verify your email address before you can access our Website.<br><br>
                Your OTP is: <strong>${generatedOtp}</strong><br><br>
                Thanks for visiting!<br><br>
                The CollabTranslate team
                </p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("email has been send:- ", info.response);
            }
        })

    } catch (error) {
        console.log("catch error on sendOtp - ", error.message);
    }
}

//....................................................................................

const changePasswordEmail = async (email, link) => {
   try {
        // Email content setup
        const mailOptions = {
            from: 'upasanapaudel9@gmail.com',
            to: email,
            subject: 'The CollabTranslate Change Password Link',
            html: `
                <p>Hello,<br><br>
                This email is to provide you with a link to change your password.<br><br>
                Click here to change your password: <a href="${link}">${link}</a><br><br>
                Thanks for visiting!<br><br>
                The CollabTranslate team
                </p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("email has been send:- ", info.response);
            }
        })

    } catch (error) {
        console.log("catch error on sendOtp - ", error.message);
    }
}


module.exports = { sendOtp, changePasswordEmail }