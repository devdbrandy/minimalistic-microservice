const { Router } = require('express');
const router = Router();
const Controller = require('./auth.controller');
const Validator = require('../../middlewares/validator');

/* POST authenticate user. */
router.post('/login', Validator.validate('login'), Controller.login);

module.exports = router;
