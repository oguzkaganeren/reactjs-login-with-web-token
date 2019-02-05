var express = require('express');
var authentication = require('./authentication');
/* Do not remove !!!!!!!   !!! !!*/
const passport = require('passport');
const passportService = require('../services/passport');
/*-------------------------------------------------- */
var router = express.Router();

//router.use('/albums', albums);

router.use('/', authentication);

module.exports = router;
