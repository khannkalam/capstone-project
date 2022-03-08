
const express = require('express')
const company = require('../controllers/CompanyController')
const router = express.Router()


router.get('/getCompanies', company.findAll);

router.get('/getCompaniesByID/:id', company.findById);

router.post('/addCompanies', company.addCompany);

router.put('/updateCompany/:id', company.updateById);

router.delete('/deleteCompany/:id', company.removeById);


module.exports = router
