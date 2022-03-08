const express = require('express')
const customer = require('../controllers/CustomerController')
const router = express.Router()

const { authMiddleware } = require('../controllers/CustomerController')

router.post('/register', customer.register)

router.post('/login', customer.login)

router.get('/profile', authMiddleware, function (req, res) {
  res.json({ 'access': true })
})

module.exports = router