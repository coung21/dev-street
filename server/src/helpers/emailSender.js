const nodemailer = require('nodemailer')
const fs = require('fs');
const path = require('path');




let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "465",
  secure: true,
  service: 'gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendVerificationEmail = (userEmail, verificationCode) => {

  const template = path.join('src', 'template', 'emailTemplate.html');

  const emailTemplate = fs.readFileSync(template, 'utf8');
  const verificationUrl = `http://localhost:3045/v1/api/auth/verify-email?email=${userEmail}&code=${verificationCode}`; // URL xác thực thực tế
  const emailContent = emailTemplate.replace(
    '{{verificationUrl}}',
    verificationUrl
  );
  
  transporter
    .sendMail({
      from: 'Dev Street <cuongdev@gmail.com>', // sender address
      to: userEmail, // list of receivers
      subject: 'Account Verification', // Subject line
      html: emailContent
    })
    .then(() => {
      console.log(`A verification email has just been sent for ${userEmail}`);
    })
    .catch((err) => {
      console.log('Cannot send email');
      console.log(err);
    });
}

module.exports = {sendVerificationEmail}