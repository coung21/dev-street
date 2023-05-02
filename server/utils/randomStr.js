const randomStr = () => require('crypto').randomBytes(16).toString('hex');

module.exports = randomStr