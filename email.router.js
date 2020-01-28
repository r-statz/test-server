const express = require('express');
const router = express.Router();
const ctrl = require('./email.controller.js');

router.post('/email', ctrl.sendEmail);

module.exports = router;