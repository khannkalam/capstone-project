const Customer = require('../models/CustomerModel')
const db = require('../DB')
const jwt = require('jsonwebtoken')

exports.register = function(req, res) {
        const { username, email, password, passwordConfirmation, firstname, lastname, addressline1, addressline2, city, zipcode, state } = req.body
        if (!email || !password) {
            return res.status(422).json({ 'error': 'Please provide email or password' })
        }

        if (!firstname || !lastname || !addressline1 || !city || !zipcode || !state) {
            return res.status(422).json({ 'error': 'Please provide all data!' })
        }

        if (password != passwordConfirmation) {
            return res.status(422).json({ 'error': 'Password does not match' })
        }
        Customer.findOne({ email }, function(err, existingUser) {
            if (err) {
                return res.status(422).json({ 'error': err.message })
            }
            if (existingUser) {
                return res.status(422).json({ 'error': 'Customer already exists' })
            } else {
                const customer = new Customer({
                    username,
                    email,
                    password,
                    firstname,
                    lastname,
                    addressline1,
                    addressline2,
                    city,
                    zipcode,
                    state
                })

                customer.save(function(err) {
                    if (err) {
                        return res.status(422).json({
                            'error': 'Oops! Something went wrong'
                        })
                    }
                    return res.status(200).json({ 'registered': true })
                })
            }
        })
    }
    // exports.register = function(req, res) {
    //     const { username, email, password, passwordConfirmation } = req.body
    //     if (!email || !password) {
    //         return res.status(422).json({ 'error': 'Please provide email or password' })
    //     }

//     if (password != passwordConfirmation) {
//         return res.status(422).json({ 'error': 'Password does not match' })
//     }
//     Admin.findOne({ email }, function(err, existingUser) {
//         if (err) {
//             return res.status(422).json({ 'error': 'Oops! Something went Wrong' })
//         }
//         if (existingUser) {
//             return res.status(422).json({ 'error': 'User already exists' })
//         } else {
//             const admin = new Admin({
//                 username,
//                 email,
//                 password
//             })


//         }
//     })
// }

exports.login = function(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).json({ 'error': 'Please provide email or password' })
    }
    Customer.findOne({ email }, function(err, customer) {
        if (err) {
            return res.status(422).json({
                'error': 'Oops! Something went wrong'
            })
        }

        if (!customer) {
            return res.status(422).json({ 'error': 'Invalid user' })
        }

        if (customer.hasSamePassword(password)) {
            json_token = jwt.sign({
                    customerid: customer.id,
                    username: customer.username,
                    firstname: customer.firstname
                },
                db.secret, { expiresIn: '1h' })

            return res.json(json_token)
        } else {
            return res.status(422).json({ 'error': 'Wrong email or password' })
        }
    })
}

exports.authMiddleware = function(req, res, next) {
    const json_token = req.headers.authorization
    try {
        if (json_token) {
            const customer = parseToken(json_token)
            Admin.findById(customer.customerid, function(err, customer) {
                if (err) {
                    return res.status(422).json({
                        'error': 'Oops! Something went wrong'
                    })
                }
                if (customer) {
                    res.locals.customer = customer
                    next()
                } else {
                    return res.status(422).json({ 'error': 'Not authorized user' })
                }
            })
        } else {
            return res.status(422).json({ 'error': 'Not authorized user' })
        }
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], db.secret)
}