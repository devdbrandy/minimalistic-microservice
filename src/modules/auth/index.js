const { Router } = require('express');
const router = Router();
const controller = require('./auth.controller');

/* POST authenticate user. */
router.post('/login', controller.login);

module.exports = router;
