const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { BadRequest } = require('../utils/errResponse.utils');
const { error } = require('console');
const { reject } = require('lodash');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: '465',
  secure: true,
  service: 'gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (userEmail, verificationCode) => {
  const template = path.join('src', 'template', 'emailTemplate.html');

  const emailTemplate = fs.readFileSync(template, 'utf8');
  const verificationUrl = `http://localhost:3045/v1/api/auth/verify-email?email=${userEmail}&code=${verificationCode}`; // URL xác thực thực tế
  const emailContent = emailTemplate.replace(
    '{{verificationUrl}}',
    verificationUrl
  );

  try {
    await transporter.sendMail({
      from: 'Dev Street <cuongdev@gmail.com>', // địa chỉ người gửi
      to: userEmail, // danh sách người nhận
      subject: 'Account Verification', // tiêu đề email
      html: emailContent, // nội dung email
    });
    console.log(`A verification email has just been sent for ${userEmail}`);
  } catch (err) {
    throw new Error('Failed to send verification email');
  }
};

const sendResetPasswordEmail = async (userEmail, resetToken) => {
  const template = path.join('src', 'template', 'resetPasswordTemplate.html');
  const emailTemplate = fs.readFileSync(template, 'utf8');
  const emailContent = emailTemplate.replace('{OTP_CODE}', resetToken);

  try {
    await transporter.sendMail({
      from: 'Dev Street <cuongdev@gmail.com>', // sender address
      to: userEmail, // list of receivers
      subject: 'Reset Your Password', // Subject line
      html: emailContent,
    });
    console.log(`A reset password email has just been sent for ${userEmail}`);
  } catch (error) {
    throw new Error('Failed to send verification email');
  }
};

module.exports = { sendVerificationEmail, sendResetPasswordEmail };
