const { Router } = require('express');
const router = Router();
const controller = require('./features-controller');

/* POST generate thumbnail */
router.post('/thumbnail', controller.createThumbnail);

module.exports = router;
