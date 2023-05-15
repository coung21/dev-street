const randomStr = () => require('crypto').randomBytes(16).toString('hex');

console.log(randomStr())