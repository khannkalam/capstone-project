const express = require('express')
const user = require('../controllers/AdminController')
const router = express.Router()

const { authMiddleware } = require('../controllers/AdminController')

router.post('/register', user.register)

router.post('/login', user.login)

router.get('/profile', authMiddleware, function (req, res) {
  res.json({ 'access': true })
})

module.exports = router