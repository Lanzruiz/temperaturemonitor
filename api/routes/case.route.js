var express = require('express')
var router = express.Router()

var CaseController = require('../controllers/case.controller');
var caseController = new CaseController();
router.post('/add', caseController.add);

// Export the Router
module.exports = router;
