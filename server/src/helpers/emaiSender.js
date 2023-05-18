const nodemailer = require('nodemailer')

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
  
  transporter
    .sendMail({
      from: 'Dev Street <cuongdev@gmail.com>', // sender address
      to: userEmail, // list of receivers
      subject: 'Account Verification', // Subject line
      html: `Thank you for registering an account. Please click the link below to verify your account:<br><br>
        <a href="http://localhost:3045/v1/api/auth/verify-email?email=${userEmail}&code=${verificationCode}">Verify account</a>`, // html body
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