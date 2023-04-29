const authService = require('../services/authService')

const userRegister = async (req, res) => {
  try {
    const {username, email, password} = req.body
    const result = await authService.register(username, email, password)
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
  }
}

const userLogin = async (req, res) => {
  try {
    const {username, password} = req.body
    const result = await authService.login(username, password)
    res.status(200).json(result)
  } catch (error) {
        console.log(error.message);
  }
}

module.exports = {
  userRegister,
  userLogin
}