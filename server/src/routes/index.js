const router = require('express').Router()

router.get('v1/api', (req, res) => {
  res.status(200).json('hello')
})

module.exports = router